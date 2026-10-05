#!/usr/bin/env bun

// Release the npm packages (converter, iD field) and/or the app (tag; GitHub Actions deploys).
//
//   bun run release                          interactive
//   bun run release --package --minor --yes  no prompts (for agent sessions and CI-like use)
//
// Flags:
//   --package / --id-field / --app   what to release, in this order (asked when none is given)
//   --patch / --minor / --major
//   --yes                    no prompts; stops on a dirty working tree instead of asking
//   --push                   push main and the tag(s) at the end (asked when not --yes)
//   --otp=123456             npm one-time password for `npm publish` (npm asks when it is missing)
//   --dry-run                everything up to and including `npm publish --dry-run`, then undo

import { join } from 'path'
import * as p from '@clack/prompts'
import { $ } from 'bun'
import { releaseChangelog } from './release-changelog.ts'
import { releaseTagName } from './release-tag.ts'

type ReleaseType = 'patch' | 'minor' | 'major'
type ReleaseTarget = 'package' | 'id-field' | 'app'

/** The npm packages: directory and the prefix of the release commit */
const NPM_PACKAGES = {
  package: { dir: 'packages/traffic-sign-converter', commitPrefix: 'Package' },
  'id-field': { dir: 'packages/traffic-sign-id-field', commitPrefix: 'iD field' },
} as const
const APP_DIR = 'apps/traffic-sign-tool'
const APP_CHANGELOG = join(APP_DIR, 'CHANGELOG.md')
const APP_PACKAGE_JSON = join(APP_DIR, 'package.json')

// Parse CLI arguments
const args = process.argv.slice(2)
const flags = {
  package: args.includes('--package'),
  idField: args.includes('--id-field'),
  app: args.includes('--app'),
  patch: args.includes('--patch'),
  minor: args.includes('--minor'),
  major: args.includes('--major'),
  yes: args.includes('--yes'),
  push: args.includes('--push'),
  dryRun: args.includes('--dry-run'),
  otp: args.find((arg) => arg.startsWith('--otp='))?.slice('--otp='.length),
}

function fail(message: string): never {
  p.cancel(message)
  process.exit(1)
}

// Helper: Ask, or take the default answer with `--yes`
async function confirm(message: string, initialValue: boolean, valueWithYes: boolean) {
  if (flags.yes) return valueWithYes
  const answer = await p.confirm({ message, initialValue })
  return answer === true
}

async function readPackageJson(packageJsonPath: string) {
  const file = Bun.file(packageJsonPath)
  const content = await file.text()
  return JSON.parse(content) as { name: string; version: string }
}

// Helper: Changed tracked files (untracked files never end up in a release)
async function changedTrackedFiles() {
  const result = await $`git status --porcelain --untracked-files=no`.quiet()
  return result.stdout.toString().trim()
}

// Helper: Undo the version bump and changelog update of a release that did not happen
async function restoreFiles(files: string[]) {
  await $`git checkout -- ${files}`.quiet()
}

async function checkWorkingTree() {
  const branch = (await $`git branch --show-current`.quiet()).stdout.toString().trim()
  if (branch !== 'main') fail(`Releases are made from main, but this is "${branch}".`)

  await $`git fetch origin main`.quiet()
  const behind = (await $`git rev-list --count HEAD..origin/main`.quiet()).stdout.toString().trim()
  if (behind !== '0') {
    fail(`main is ${behind} commit(s) behind origin/main. Run \`git pull --rebase origin main\`.`)
  }

  const changed = await changedTrackedFiles()
  if (!changed) return
  p.log.warn(`Uncommitted changes:\n${changed}`)
  if (flags.yes) fail('Commit or stash these changes first.')
  if (!(await confirm('Continue anyway?', false, false))) fail('Release cancelled.')
}

async function checkNpmLogin() {
  try {
    const user = (await $`npm whoami`.quiet()).stdout.toString().trim()
    p.log.info(`npm user: ${user}`)
  } catch {
    fail('Not logged in to npm. Run `npm login` and try again.')
  }
}

// Helper: Write the next version to package.json.
// Not `npm version`: npm stops at the `workspace:*` dependencies of this monorepo.
async function bumpVersion(packageJsonPath: string, releaseType: ReleaseType) {
  const content = await Bun.file(packageJsonPath).text()
  const current = content.match(/^  "version": "(\d+)\.(\d+)\.(\d+)"/m)
  if (!current) fail(`No "version" like 1.2.3 in ${packageJsonPath}.`)

  const [major, minor, patch] = current.slice(1).map(Number) as [number, number, number]
  const version = {
    major: `${major + 1}.0.0`,
    minor: `${major}.${minor + 1}.0`,
    patch: `${major}.${minor}.${patch + 1}`,
  }[releaseType]
  await Bun.write(packageJsonPath, content.replace(current[0], `  "version": "${version}"`))
  return version
}

// Helper: Bump the version and move the "## Unreleased" entries below it
async function bumpVersionAndChangelog(
  packageJsonPath: string,
  changelogPath: string,
  releaseType: ReleaseType,
) {
  const version = await bumpVersion(packageJsonPath, releaseType)

  const changelog = await Bun.file(changelogPath).text()
  const released = releaseChangelog(changelog, version, new Date())
  if (!released) {
    await restoreFiles([packageJsonPath])
    fail(`"## Unreleased" in ${changelogPath} is empty. Add the changes and try again.`)
  }
  await Bun.write(changelogPath, released.changelog)

  p.log.info(`${changelogPath} — ${version}:`)
  console.log(released.entries)

  if (!(await confirm('Is the changelog complete?', true, true))) {
    await restoreFiles([packageJsonPath, changelogPath])
    fail('Release cancelled. Update the changelog and try again.')
  }
  return version
}

async function commitAndTag(packageName: string, message: string, files: string[]) {
  await $`git add ${files}`
  await $`git commit -m ${message}`.quiet()
  const { version } = await readPackageJson(files[0]!)
  const tag = releaseTagName(packageName, version)
  await $`git tag ${tag}`.quiet()
  p.log.info(`Committed "${message}", tagged ${tag}`)
  return tag
}

async function pushRelease(tags: string[]) {
  const pushCommand = `git push origin main ${tags.join(' ')}`
  if (!(await confirm('Push to main now?', false, flags.push))) {
    p.log.info(`Run \`${pushCommand}\` when ready.`)
    return false
  }
  await $`git push origin main ${tags}`
  p.log.info('✓ Pushed main and tag(s)')
  return true
}

// Package release flow
async function releasePackage(target: keyof typeof NPM_PACKAGES, releaseType: ReleaseType) {
  const { dir, commitPrefix } = NPM_PACKAGES[target]
  const packageJson = join(dir, 'package.json')
  const changelog = join(dir, 'CHANGELOG.md')
  const { name: packageName } = await readPackageJson(packageJson)
  p.intro(`Releasing Package: ${packageName}`)
  await checkNpmLogin()

  const files = [packageJson, changelog]
  const newVersion = await bumpVersionAndChangelog(packageJson, changelog, releaseType)

  try {
    p.log.step('Building package...')
    await $`bun run --filter ${packageName} build`

    p.log.step('Running checks...')
    await $`cd ${dir} && bun run check`

    p.log.step(flags.dryRun ? 'Publishing to npm (dry run)...' : 'Publishing to npm...')
    const publishArgs = [
      ...(flags.dryRun ? ['--dry-run'] : []),
      ...(flags.otp ? [`--otp=${flags.otp}`] : []),
    ]
    // Not through the Bun shell: without `--otp`, npm asks for the one-time password
    const publish = Bun.spawn(['npm', 'publish', ...publishArgs], {
      cwd: dir,
      stdio: ['inherit', 'inherit', 'inherit'],
    })
    if ((await publish.exited) !== 0) throw new Error('npm publish failed')
  } catch {
    // Nothing was released: leave no half-bumped version behind
    await restoreFiles(files)
    p.log.error(`Release of ${newVersion} failed, version and changelog were reset.`)
    p.log.info('For a failed publish: check `npm whoami`, and pass `--otp=<code>` with 2FA.')
    process.exit(1)
  }

  if (flags.dryRun) {
    await restoreFiles(files)
    p.outro(`✓ Dry run of ${newVersion} passed. Nothing was published or committed.`)
    return undefined
  }
  p.log.info(`✓ Published ${packageName}@${newVersion}`)

  return commitAndTag(packageName, `${commitPrefix}: release v${newVersion}`, files)
}

// App release flow
async function releaseApp(releaseType: ReleaseType) {
  const { name: packageName } = await readPackageJson(APP_PACKAGE_JSON)
  p.intro(`Releasing App: ${packageName}`)

  const files = [APP_PACKAGE_JSON, APP_CHANGELOG]
  const newVersion = await bumpVersionAndChangelog(APP_PACKAGE_JSON, APP_CHANGELOG, releaseType)

  if (flags.dryRun) {
    await restoreFiles(files)
    p.outro(`✓ Dry run of ${newVersion} passed. Nothing was committed.`)
    return undefined
  }

  return commitAndTag(packageName, 'App: release v' + newVersion, files)
}

// Main function
async function main() {
  // Determine release type
  let releaseType: ReleaseType = 'patch'
  if (flags.minor) releaseType = 'minor'
  else if (flags.major) releaseType = 'major'

  // Determine targets
  let targets: ReleaseTarget[] = [
    ...(flags.package ? (['package'] as const) : []),
    ...(flags.idField ? (['id-field'] as const) : []),
    ...(flags.app ? (['app'] as const) : []),
  ]
  if (!targets.length) {
    if (flags.yes) fail('Pass --package, --id-field and/or --app together with --yes.')
    const selected = await p.multiselect({
      message: 'What would you like to release?',
      options: [
        { value: 'package', label: 'Package: converter' },
        { value: 'id-field', label: 'Package: iD field' },
        { value: 'app', label: 'App' },
      ],
      required: true,
    })
    if (p.isCancel(selected)) fail('Release cancelled.')
    targets = (['package', 'id-field', 'app'] as const).filter((target) =>
      (selected as string[]).includes(target),
    )
  }

  // Confirm release type if not set via flag
  if (!flags.patch && !flags.minor && !flags.major) {
    if (flags.yes) fail('Pass --patch, --minor or --major together with --yes.')
    if (!(await confirm(`Release type: ${releaseType} (confirm?)`, true, true))) {
      fail('Release cancelled.')
    }
  }

  await checkWorkingTree()

  const tags: string[] = []

  for (const target of targets) {
    const tag =
      target === 'app' ? await releaseApp(releaseType) : await releasePackage(target, releaseType)
    if (tag) tags.push(tag)
  }

  if (!tags.length) return

  const pushed = await pushRelease(tags)
  if (pushed && targets.includes('app')) {
    p.log.info('GitHub Actions will deploy to trafficsigns.osm-verkehrswende.org')
  }
  p.outro(`✓ Released ${tags.join(', ')}`)
}

main().catch((error) => {
  p.log.error(error.message)
  console.error(error)
  process.exit(1)
})

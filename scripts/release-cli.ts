#!/usr/bin/env bun

// Release the converter package (npm) and/or the app (tag; GitHub Actions deploys).
//
//   bun run release                          interactive
//   bun run release --package --minor --yes  no prompts (for agent sessions and CI-like use)
//
// Flags:
//   --package / --app        what to release (both when neither or both are given)
//   --patch / --minor / --major
//   --yes                    no prompts; stops on a dirty working tree instead of asking
//   --push                   push main and the tag(s) at the end (asked when not --yes)
//   --otp=123456             npm one-time password for `npm publish`
//   --dry-run                everything up to and including `npm publish --dry-run`, then undo

import { join } from 'path'
import * as p from '@clack/prompts'
import { $ } from 'bun'
import { releaseChangelog } from './release-changelog.ts'
import { releaseTagName } from './release-tag.ts'

type ReleaseType = 'patch' | 'minor' | 'major'
type ReleaseTarget = 'package' | 'app' | 'both'

const PACKAGE_DIR = 'packages/traffic-sign-converter'
const APP_DIR = 'apps/traffic-sign-tool'
const PACKAGE_CHANGELOG = join(PACKAGE_DIR, 'CHANGELOG.md')
const APP_CHANGELOG = join(APP_DIR, 'CHANGELOG.md')
const PACKAGE_PACKAGE_JSON = join(PACKAGE_DIR, 'package.json')
const APP_PACKAGE_JSON = join(APP_DIR, 'package.json')

// Parse CLI arguments
const args = process.argv.slice(2)
const flags = {
  package: args.includes('--package'),
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

// Helper: Bump the version and move the "## Unreleased" entries below it
async function bumpVersionAndChangelog(
  dir: string,
  packageJsonPath: string,
  changelogPath: string,
  releaseType: ReleaseType,
) {
  await $`cd ${dir} && npm version ${releaseType} --no-git-tag-version`.quiet()
  const { version } = await readPackageJson(packageJsonPath)

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
async function releasePackage(releaseType: ReleaseType) {
  const { name: packageName } = await readPackageJson(PACKAGE_PACKAGE_JSON)
  p.intro(`Releasing Package: ${packageName}`)
  await checkNpmLogin()

  const files = [PACKAGE_PACKAGE_JSON, PACKAGE_CHANGELOG]
  const newVersion = await bumpVersionAndChangelog(
    PACKAGE_DIR,
    PACKAGE_PACKAGE_JSON,
    PACKAGE_CHANGELOG,
    releaseType,
  )

  try {
    p.log.step('Building package...')
    await $`bun run --filter ${packageName} build`

    p.log.step('Running checks...')
    await $`cd ${PACKAGE_DIR} && bun run check`

    p.log.step(flags.dryRun ? 'Publishing to npm (dry run)...' : 'Publishing to npm...')
    const publishArgs = [
      ...(flags.dryRun ? ['--dry-run'] : []),
      ...(flags.otp ? [`--otp=${flags.otp}`] : []),
    ]
    await $`cd ${PACKAGE_DIR} && npm publish ${publishArgs}`
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

  return commitAndTag(packageName, 'Package: release v' + newVersion, files)
}

// App release flow
async function releaseApp(releaseType: ReleaseType) {
  const { name: packageName } = await readPackageJson(APP_PACKAGE_JSON)
  p.intro(`Releasing App: ${packageName}`)

  const files = [APP_PACKAGE_JSON, APP_CHANGELOG]
  const newVersion = await bumpVersionAndChangelog(
    APP_DIR,
    APP_PACKAGE_JSON,
    APP_CHANGELOG,
    releaseType,
  )

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

  // Determine target
  let target: ReleaseTarget = 'both'
  if (flags.package && !flags.app) target = 'package'
  else if (flags.app && !flags.package) target = 'app'
  else if (!flags.package && !flags.app) {
    if (flags.yes) fail('Pass --package and/or --app together with --yes.')
    // Interactive selection
    const selected = await p.select({
      message: 'What would you like to release?',
      options: [
        { value: 'package', label: 'Package only' },
        { value: 'app', label: 'App only' },
        { value: 'both', label: 'Both package and app' },
      ],
    })
    if (p.isCancel(selected)) fail('Release cancelled.')
    target = selected as ReleaseTarget
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

  if (target === 'package' || target === 'both') {
    const tag = await releasePackage(releaseType)
    if (tag) tags.push(tag)
  }

  if (target === 'app' || target === 'both') {
    const tag = await releaseApp(releaseType)
    if (tag) tags.push(tag)
  }

  if (!tags.length) return

  const pushed = await pushRelease(tags)
  if (pushed && target !== 'package') {
    p.log.info('GitHub Actions will deploy to trafficsigns.osm-verkehrswende.org')
  }
  p.outro(`✓ Released ${tags.join(', ')}`)
}

main().catch((error) => {
  p.log.error(error.message)
  console.error(error)
  process.exit(1)
})

#!/usr/bin/env bun

import * as p from '@clack/prompts'
import { $ } from 'bun'
import { join } from 'path'

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
  skipChangelog: args.includes('--skip-changelog'),
}

// Helper: Get current date in format _YYYY-MM-DD_
function getCurrentDate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `_${year}-${month}-${day}_`
}

// Helper: Read and parse changelog to extract "## Unreleased" and next ## section
async function readChangelogSections(changelogPath: string) {
  const file = Bun.file(changelogPath)
  const content = await file.text()
  const lines = content.split('\n')

  let sections: string[] = []
  let currentSection: string[] = []
  let foundUnreleased = false
  let h2Count = 0

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (line.trim() === '## Unreleased') {
        foundUnreleased = true
        currentSection = [line]
        h2Count = 1
      } else if (foundUnreleased) {
        // Found second section after Unreleased
        if (h2Count === 1 && currentSection.length > 0) {
          sections.push(currentSection.join('\n'))
        }
        if (h2Count >= 2) break
        currentSection = [line]
        h2Count++
        if (h2Count === 2) {
          // We have both sections, continue until next ## or end
        }
      }
    } else if (foundUnreleased && h2Count > 0 && h2Count <= 2) {
      currentSection.push(line)
    }
  }

  if (currentSection.length > 0 && h2Count <= 2) {
    sections.push(currentSection.join('\n'))
  }

  return sections.join('\n\n')
}

// Helper: Open file in Cursor, or show path if it fails
async function openInCursor(filePath: string) {
  try {
    await $`cursor ${filePath}`.quiet()
  } catch {
    p.log.warn(`Could not open file automatically. Please open manually:`)
    p.log.info(filePath)
  }
}

// Helper: Prompt user to manually update changelog
async function promptChangelogUpdate(changelogPath: string, newVersion: string) {
  const date = getCurrentDate()

  p.log.warn('⚠️  Manual changelog update required:')
  p.log.info(`Please update the changelog with:`)
  p.log.info(`  - New section: ## ${newVersion}`)
  p.log.info(`  - Date: ${date}`)
  p.log.info(`  - Move content from "## Unreleased" to the new version section`)
  p.log.info(`  - Leave "## Unreleased" empty`)
  p.log.info(`\nChangelog location: ${changelogPath}`)

  await openInCursor(changelogPath)

  const ready = await p.confirm({
    message: 'I have updated the changelog',
    initialValue: false,
  })

  if (!ready) {
    p.cancel('Release cancelled. Please update the changelog and try again.')
    process.exit(1)
  }

  // Show what they wrote and confirm
  const changelogPreview = await readChangelogSections(changelogPath)
  p.log.info('Changelog preview:')
  console.log(changelogPath)
  console.log(changelogPreview)

  const looksGood = await p.confirm({
    message: 'Does this look correct?',
    initialValue: true,
  })

  if (!looksGood) {
    p.cancel('Please update the changelog and run the release again.')
    process.exit(1)
  }
}

// Helper: Get version from package.json
async function getPackageVersion(packageJsonPath: string) {
  const file = Bun.file(packageJsonPath)
  const content = await file.text()
  const json = JSON.parse(content)
  return json.version
}

// Helper: Check for uncommitted changes
async function hasUncommittedChanges() {
  try {
    const result = await $`git status --porcelain`.quiet()
    return result.stdout.toString().trim().length > 0
  } catch {
    return false
  }
}

// Package release flow
async function releasePackage(releaseType: ReleaseType, skipChangelogCheck: boolean) {
  p.intro('Releasing Package: @osm-traffic-signs/converter')

  // Check for uncommitted changes
  if (await hasUncommittedChanges()) {
    const shouldContinue = await p.confirm({
      message: 'You have uncommitted changes. Continue anyway?',
      initialValue: false,
    })
    if (!shouldContinue) {
      p.cancel('Release cancelled.')
      process.exit(1)
    }
  }

  // Changelog validation
  if (!skipChangelogCheck) {
    const changelogPreview = await readChangelogSections(PACKAGE_CHANGELOG)
    p.log.info('Changelog preview:')
    console.log(changelogPreview)

    const changelogComplete = await p.confirm({
      message: 'Is the changelog complete?',
      initialValue: true,
    })

    if (!changelogComplete) {
      p.log.warn('Please update the changelog and run the release again.')
      await openInCursor(PACKAGE_CHANGELOG)
      p.cancel('Release cancelled.')
      process.exit(1)
    }
  }

  // Run npm version first (this updates package.json)
  const spinner = p.spinner()
  spinner.start('Bumping version...')
  await $`cd ${PACKAGE_DIR} && npm version ${releaseType} --no-git-tag-version`.quiet()
  spinner.stop('✓ Version bumped')

  // Read the new version for changelog and commit messages
  const newVersion = await getPackageVersion(PACKAGE_PACKAGE_JSON)

  // Prompt user to update changelog
  await promptChangelogUpdate(PACKAGE_CHANGELOG, newVersion)

  // Build
  spinner.start('Building package...')
  await $`turbo build --force`
  spinner.stop('✓ Build complete')

  // Check
  spinner.start('Running checks...')
  await $`cd ${PACKAGE_DIR} && pnpm run check`
  spinner.stop('✓ Checks passed')

  // Publish
  spinner.start('Publishing to npm...')
  try {
    await $`cd ${PACKAGE_DIR} && npm publish`
    spinner.stop('✓ Published to npm')
  } catch (error) {
    spinner.stop('✗ Publish failed')
    p.log.error('Failed to publish to npm')
    p.log.info('Test…')
    p.log.info('  - `npm woami`')
    p.log.info('  - `npm login`')
    p.log.info(`  - \`cd ${PACKAGE_DIR} && npm publish\` manually`)
    p.log.info(`\nVersion ${newVersion} has already been bumped in package.json.`)
  }

  // Git commit
  spinner.start('Committing changes...')
  await $`git add ${PACKAGE_CHANGELOG} ${PACKAGE_PACKAGE_JSON}`
  await $`git commit -m "Package: release v${newVersion}"`.quiet()
  spinner.stop('✓ Changes committed')

  // Ask about push
  const shouldPush = await p.confirm({
    message: 'Push to main now?',
    initialValue: false,
  })

  if (shouldPush) {
    spinner.start('Pushing to main...')
    await $`git push origin main`
    spinner.stop('✓ Pushed to main')
  } else {
    p.log.info('Run `git push` manually when ready.')
  }

  p.outro(`✓ Package ${newVersion} released successfully!`)
}

// App release flow
async function releaseApp(
  releaseType: ReleaseType,
  skipChangelogCheck: boolean,
  packageJustReleased: boolean,
) {
  p.intro('Releasing App: osm-traffic-sign-tool')

  // Check for uncommitted changes
  if (await hasUncommittedChanges()) {
    const shouldContinue = await p.confirm({
      message: 'You have uncommitted changes. Continue anyway?',
      initialValue: false,
    })
    if (!shouldContinue) {
      p.cancel('Release cancelled.')
      process.exit(1)
    }
  }

  // Update lockfile if package was just released
  if (packageJustReleased) {
    const spinner = p.spinner()
    spinner.start('Updating lockfile...')
    await $`pnpm install`
    spinner.stop('✓ Lockfile updated')
  }

  // Changelog validation
  if (!skipChangelogCheck) {
    const changelogPreview = await readChangelogSections(APP_CHANGELOG)
    p.log.info('Changelog preview:')
    console.log(changelogPreview)

    const changelogComplete = await p.confirm({
      message: 'Is the changelog complete?',
      initialValue: true,
    })

    if (!changelogComplete) {
      p.log.warn('Please update the changelog and run the release again.')
      await openInCursor(APP_CHANGELOG)
      p.cancel('Release cancelled.')
      process.exit(1)
    }
  }

  // Update version using npm version
  const spinner = p.spinner()
  spinner.start('Updating version...')
  await $`cd ${APP_DIR} && npm version ${releaseType} --no-git-tag-version`.quiet()
  spinner.stop('✓ Version updated')

  // Read the new version for changelog and commit messages
  const newVersion = await getPackageVersion(APP_PACKAGE_JSON)

  // Prompt user to update changelog
  await promptChangelogUpdate(APP_CHANGELOG, newVersion)

  // Git commit
  spinner.start('Committing changes...')
  await $`git add ${APP_CHANGELOG} ${APP_PACKAGE_JSON}`
  await $`git commit -m "App: release v${newVersion}"`.quiet()
  spinner.stop('✓ Changes committed')

  // Ask about push
  const shouldPush = await p.confirm({
    message: 'Push to main now?',
    initialValue: false,
  })

  if (shouldPush) {
    spinner.start('Pushing to main...')
    await $`git push origin main`
    spinner.stop('✓ Pushed to main')
    p.log.info('GitHub Actions will deploy to trafficsigns.osm-verkehrswende.org')
  } else {
    p.log.info('Run `git push` manually when ready.')
  }

  p.outro(`✓ App ${newVersion} released successfully!`)
}

// Main function
async function main() {
  // Determine release type
  let releaseType: ReleaseType = 'patch'
  if (flags.minor) releaseType = 'minor'
  else if (flags.major) releaseType = 'major'
  // minor is default, no need to check flags.minor

  // Determine target
  let target: ReleaseTarget = 'both'
  if (flags.package && !flags.app) target = 'package'
  else if (flags.app && !flags.package) target = 'app'
  else if (!flags.package && !flags.app) {
    // Interactive selection
    const selected = await p.select({
      message: 'What would you like to release?',
      options: [
        { value: 'package', label: 'Package only' },
        { value: 'app', label: 'App only' },
        { value: 'both', label: 'Both package and app' },
      ],
    })
    target = selected as ReleaseTarget
  }

  // Confirm release type if not set via flag
  if (!flags.patch && !flags.minor && !flags.major) {
    const confirmType = await p.confirm({
      message: `Release type: ${releaseType} (confirm?)`,
      initialValue: true,
    })
    if (!confirmType) {
      p.cancel('Release cancelled.')
      process.exit(1)
    }
  }

  let packageJustReleased = false

  // Release package
  if (target === 'package' || target === 'both') {
    await releasePackage(releaseType, flags.skipChangelog)
    packageJustReleased = true
  }

  // Release app
  if (target === 'app' || target === 'both') {
    if (target === 'both') {
      // Ask if user wants to continue with app release
      const continueApp = await p.confirm({
        message: 'Continue with app release?',
        initialValue: true,
      })
      if (!continueApp) {
        p.outro('Package released. App release skipped.')
        process.exit(0)
      }
    }
    await releaseApp(releaseType, flags.skipChangelog, packageJustReleased)
  }
}

main().catch((error) => {
  p.log.error(error.message)
  console.error(error)
  process.exit(1)
})

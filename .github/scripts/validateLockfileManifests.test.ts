import { describe, expect, test } from 'vitest'
import {
  compareWorkspaceManifests,
  formatLockfileManifestMismatch,
  packageJsonPathToWorkspaceKey,
  parseBunLock,
  workspaceKeyToPackageJsonPath,
} from './validateLockfileManifests'

describe('parseBunLock', () => {
  test('parses bun.lock trailing commas', () => {
    const lockfile = parseBunLock(`{
      "workspaces": {
        "": {
          "devDependencies": {
            "vitest": "^4.1.9",
          },
        },
      },
    }`)

    expect(lockfile.workspaces[''].devDependencies).toEqual({ vitest: '^4.1.9' })
  })
})

describe('workspace path helpers', () => {
  test('maps workspace keys to package.json paths', () => {
    expect(workspaceKeyToPackageJsonPath('')).toBe('package.json')
    expect(workspaceKeyToPackageJsonPath('apps/traffic-sign-tool')).toBe(
      'apps/traffic-sign-tool/package.json',
    )
  })

  test('maps package.json paths to workspace keys', () => {
    expect(packageJsonPathToWorkspaceKey('package.json')).toBe('')
    expect(packageJsonPathToWorkspaceKey('packages/traffic-sign-converter/package.json')).toBe(
      'packages/traffic-sign-converter',
    )
  })
})

describe('compareWorkspaceManifests', () => {
  test('passes when dependency fields match', () => {
    const packageJson = {
      devDependencies: { oxfmt: '0.57.0', oxlint: '1.72.0' },
    }
    const lockWorkspace = {
      devDependencies: { oxfmt: '0.57.0', oxlint: '1.72.0' },
    }

    expect(compareWorkspaceManifests('', packageJson, lockWorkspace)).toEqual([])
  })

  test('detects phantom root dependencies from Dependabot lockfile drift', () => {
    const packageJson = {
      devDependencies: { oxfmt: '0.57.0' },
    }
    const lockWorkspace = {
      dependencies: { '@inlang/paraglide-js': '^2.20.2' },
      devDependencies: { oxfmt: '0.57.0' },
    }

    expect(compareWorkspaceManifests('', packageJson, lockWorkspace)).toEqual([
      {
        workspace: '.',
        field: 'dependencies',
        onlyInLockfile: ['@inlang/paraglide-js'],
        onlyInPackageJson: [],
      },
    ])
  })

  test('detects package.json deps missing from bun.lock', () => {
    const packageJson = {
      dependencies: { vite: '^8.1.2' },
    }
    const lockWorkspace = {
      dependencies: {},
    }

    expect(compareWorkspaceManifests('apps/traffic-sign-tool', packageJson, lockWorkspace)).toEqual(
      [
        {
          workspace: 'apps/traffic-sign-tool',
          field: 'dependencies',
          onlyInLockfile: [],
          onlyInPackageJson: ['vite'],
        },
      ],
    )
  })
})

describe('formatLockfileManifestMismatch', () => {
  test('formats mismatch details for CI logs', () => {
    const message = formatLockfileManifestMismatch({
      workspace: '.',
      field: 'dependencies',
      onlyInLockfile: ['@inlang/paraglide-js'],
      onlyInPackageJson: [],
    })

    expect(message).toContain('only in bun.lock: @inlang/paraglide-js')
  })
})

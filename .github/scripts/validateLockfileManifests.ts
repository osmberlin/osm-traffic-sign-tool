import { readdir } from 'node:fs/promises'
import path from 'node:path'

const DEPENDENCY_FIELDS = ['dependencies', 'devDependencies', 'optionalDependencies'] as const

type DependencyField = (typeof DEPENDENCY_FIELDS)[number]

type PackageManifest = Partial<Record<DependencyField, Record<string, string>>>

type BunLockWorkspace = PackageManifest & {
  name?: string
  version?: string
}

type BunLockfile = {
  workspaces: Record<string, BunLockWorkspace>
}

export type LockfileManifestMismatch = {
  workspace: string
  field: DependencyField
  onlyInLockfile: string[]
  onlyInPackageJson: string[]
}

export function parseBunLock(text: string): BunLockfile {
  return JSON.parse(text.replace(/,\s*([}\]])/g, '$1')) as BunLockfile
}

export function workspaceKeyToPackageJsonPath(workspaceKey: string): string {
  return workspaceKey === '' ? 'package.json' : path.join(workspaceKey, 'package.json')
}

export function packageJsonPathToWorkspaceKey(relativePath: string): string {
  return relativePath === 'package.json' ? '' : path.dirname(relativePath).replaceAll('\\', '/')
}

export function compareWorkspaceManifests(
  workspaceKey: string,
  packageJson: PackageManifest,
  lockWorkspace: BunLockWorkspace,
): LockfileManifestMismatch[] {
  const mismatches: LockfileManifestMismatch[] = []

  for (const field of DEPENDENCY_FIELDS) {
    const packageNames = new Set(Object.keys(packageJson[field] ?? {}))
    const lockfileNames = new Set(Object.keys(lockWorkspace[field] ?? {}))

    const onlyInLockfile = [...lockfileNames].filter((name) => !packageNames.has(name)).sort()
    const onlyInPackageJson = [...packageNames].filter((name) => !lockfileNames.has(name)).sort()

    if (onlyInLockfile.length > 0 || onlyInPackageJson.length > 0) {
      mismatches.push({ workspace: workspaceKey || '.', field, onlyInLockfile, onlyInPackageJson })
    }
  }

  return mismatches
}

async function listPackageJsonPaths(rootDir: string): Promise<string[]> {
  const paths = ['package.json']

  for (const workspaceDir of ['apps', 'packages']) {
    const entries = await readdir(path.join(rootDir, workspaceDir), { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) {
        paths.push(path.join(workspaceDir, entry.name, 'package.json'))
      }
    }
  }

  return paths.sort()
}

export async function collectLockfileManifestMismatches(
  rootDir: string,
): Promise<LockfileManifestMismatch[]> {
  const lockfile = parseBunLock(await Bun.file(path.join(rootDir, 'bun.lock')).text())
  const mismatches: LockfileManifestMismatch[] = []

  for (const relativePath of await listPackageJsonPaths(rootDir)) {
    const workspaceKey = packageJsonPathToWorkspaceKey(relativePath)
    const lockWorkspace = lockfile.workspaces[workspaceKey]

    if (!lockWorkspace) {
      mismatches.push({
        workspace: workspaceKey || '.',
        field: 'dependencies',
        onlyInLockfile: [],
        onlyInPackageJson: ['<workspace missing from bun.lock>'],
      })
      continue
    }

    const packageJson = (await Bun.file(path.join(rootDir, relativePath)).json()) as PackageManifest
    mismatches.push(...compareWorkspaceManifests(workspaceKey, packageJson, lockWorkspace))
  }

  return mismatches
}

export function formatLockfileManifestMismatch(mismatch: LockfileManifestMismatch): string {
  const lines = [`${mismatch.workspace} (${mismatch.field}):`]

  if (mismatch.onlyInLockfile.length > 0) {
    lines.push(`  only in bun.lock: ${mismatch.onlyInLockfile.join(', ')}`)
  }

  if (mismatch.onlyInPackageJson.length > 0) {
    lines.push(`  only in package.json: ${mismatch.onlyInPackageJson.join(', ')}`)
  }

  return lines.join('\n')
}

export async function validateLockfileManifests(rootDir = path.resolve(import.meta.dir, '../..')) {
  const mismatches = await collectLockfileManifestMismatches(rootDir)

  if (mismatches.length === 0) {
    return
  }

  console.error('bun.lock workspace manifests do not match package.json files:\n')
  for (const mismatch of mismatches) {
    console.error(formatLockfileManifestMismatch(mismatch))
  }

  console.error(
    '\nThis often happens when Dependabot updates package.json without regenerating bun.lock.',
  )
  console.error('Fix: run `bun install`, commit the updated bun.lock, and push.')

  process.exit(1)
}

if (import.meta.main) {
  await validateLockfileManifests()
}

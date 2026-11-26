#!/usr/bin/env bun
/**
 * Release the public packages of this repository from the terminal.
 *
 * Copy of https://github.com/osm-editor-kit/.github/blob/main/release/release.ts
 * Change it there and copy it to every repository, so all copies stay identical.
 * Nothing in here is specific to one repository: the packages come from the workspaces.
 *
 *   bun run release            version, check, commit, publish, tag, push
 *   bun run release --dry-run  show what would happen, changes nothing
 *
 * npm asks for 2FA, which needs a terminal. An agent starts this in a terminal tab.
 * Without an npm session it starts `npm login` first. npm's browser approval opens by itself.
 * A publish that stopped halfway is safe to re-run: versions on npm are skipped.
 */

import { spawnSync } from 'node:child_process'
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const ROOT = join(import.meta.dirname, '..')

type Manifest = {
  name?: string
  version?: string
  private?: boolean
  workspaces?: string[]
  scripts?: Record<string, string>
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}
type Package = { name: string; version: string; dir: string; manifest: Manifest }

const fail = (message: string): never => {
  console.error(`\n✗ ${message}`)
  process.exit(1)
}

/** Runs a command with visible output and stops the release when it fails. */
const run = (command: string, args: string[], cwd = ROOT) => {
  // Without hooks: the release has run `check`, and its version commit has no changeset left.
  const env = { ...process.env, HUSKY: '0' }
  const result = spawnSync(command, args, { cwd, stdio: 'inherit', env })
  if (result.status !== 0) fail(`Failed: ${command} ${args.join(' ')}`)
}

const read = (command: string, args: string[]) => {
  const result = spawnSync(command, args, { cwd: ROOT, encoding: 'utf8' })
  return { ok: result.status === 0, out: (result.stdout ?? '').trim() }
}

/**
 * Presses ENTER at npm's "Press ENTER to open in the browser", so the approval page opens at once
 * and does not expire while the terminal tab is out of sight. Everything else passes through, so a
 * one-time password can still be typed.
 */
const OPEN_APPROVAL = `set timeout -1
spawn -noecho {*}$argv
interact {
  -o -nobuffer "Press ENTER to open in the browser" { send -- "\\r" }
}
lassign [wait] pid spawnid os_error status
exit $status
`

/** npm with its browser approval opened at once (`expect` ships with macOS). */
const runNpm = (args: string[]) => {
  if (!process.stdin.isTTY || !read('which', ['expect']).ok) return run('npm', args)
  const dir = mkdtempSync(join(tmpdir(), 'release-expect-'))
  const script = join(dir, 'open-approval.exp')
  writeFileSync(script, OPEN_APPROVAL)
  try {
    run('expect', ['-f', script, 'npm', ...args])
  } finally {
    rmSync(dir, { recursive: true })
  }
}

const readManifest = (dir: string) =>
  JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')) as Manifest

const workspaceDirs = (root: Manifest) =>
  (root.workspaces ?? []).flatMap((pattern) => {
    if (!pattern.endsWith('/*')) return [join(ROOT, pattern)]
    const parent = join(ROOT, pattern.slice(0, -2))
    return readdirSync(parent).map((entry) => join(parent, entry))
  })

const publicPackages = () =>
  workspaceDirs(readManifest(ROOT)).flatMap((dir): Package[] => {
    if (!existsSync(join(dir, 'package.json'))) return []
    const manifest = readManifest(dir)
    if (manifest.private || !manifest.name || !manifest.version) return []
    return [{ name: manifest.name, version: manifest.version, dir, manifest }]
  })

/** Packages first that others in this repository depend on, so a new version resolves at once. */
const inDependencyOrder = (packages: Package[]) => {
  const sorted: Package[] = []
  const visit = (pkg: Package) => {
    if (sorted.includes(pkg)) return
    const needed = { ...pkg.manifest.dependencies, ...pkg.manifest.peerDependencies }
    for (const other of packages) {
      if (other !== pkg && needed[other.name]) visit(other)
    }
    sorted.push(pkg)
  }
  packages.forEach(visit)
  return sorted
}

const isOnNpm = ({ name, version }: Package) =>
  read('npm', ['view', `${name}@${version}`, 'version']).out === version

const pendingChangesets = () =>
  readdirSync(join(ROOT, '.changeset')).filter(
    (file) => file.endsWith('.md') && file !== 'README.md',
  )

const dryRun = process.argv.includes('--dry-run')

const branch = read('git', ['branch', '--show-current']).out
if (branch !== 'main') fail(`Release from main, this is ${branch || 'a detached HEAD'}.`)
if (read('git', ['status', '--porcelain']).out) fail('Commit or remove your changes first.')
run('git', ['fetch', '--quiet', 'origin', 'main'])
if (read('git', ['rev-list', '--count', 'HEAD..origin/main']).out !== '0') {
  fail('main is behind origin/main. Pull first.')
}
if (!dryRun && !process.stdin.isTTY) {
  fail('npm needs a terminal for 2FA. Start this in a terminal: bun run release')
}
if (!read('npm', ['whoami']).ok) {
  if (!process.stdin.isTTY) fail('Not logged in to npm. Run: npm login')
  console.log('Not logged in to npm. Starting npm login.')
  runNpm(['login'])
  if (!read('npm', ['whoami']).ok) fail('Still not logged in to npm.')
}

const pending = pendingChangesets()

if (dryRun) {
  console.log(`Pending changesets: ${pending.length ? pending.join(', ') : 'none'}`)
  if (pending.length > 0) run('bunx', ['changeset', 'status', '--verbose'])
  const waiting = publicPackages().filter((pkg) => !isOnNpm(pkg))
  for (const { name, version } of waiting) console.log(`Not on npm yet: ${name}@${version}`)
  process.exit(0)
}

if (pending.length > 0) {
  run('bunx', ['changeset', 'version'])
  run('bun', ['install'])
  run('bun', ['run', 'format'])
}

const toPublish = inDependencyOrder(publicPackages().filter((pkg) => !isOnNpm(pkg)))
if (toPublish.length === 0) {
  // Empty changesets bump nothing, but `changeset version` still removes their files.
  if (read('git', ['status', '--porcelain']).out) {
    run('git', ['add', '--all'])
    run('git', ['commit', '--quiet', '--message', 'Release: remove empty changesets'])
    run('git', ['push', '--quiet', 'origin', 'main'])
  }
  console.log('Nothing to release.')
  process.exit(0)
}
const names = toPublish.map(({ name, version }) => `${name}@${version}`)

run('bun', ['run', 'check'])
if (read('git', ['status', '--porcelain']).out) {
  run('git', ['add', '--all'])
  run('git', ['commit', '--quiet', '--message', `Release: ${names.join(', ')}`])
}

for (const pkg of toPublish) {
  console.log(`\nPublishing ${pkg.name}@${pkg.version}`)
  if (pkg.manifest.scripts?.build) run('bun', ['run', 'build'], pkg.dir)
  // `bun pm pack` writes the tarball with `workspace:*` replaced by the version of the workspace
  // package; `npm pack` and `npm publish` in the folder would send `workspace:*` to the registry.
  const packDir = mkdtempSync(join(tmpdir(), 'release-'))
  run('bun', ['pm', 'pack', '--destination', packDir], pkg.dir)
  const tarball = readdirSync(packDir).find((file) => file.endsWith('.tgz'))
  if (!tarball) fail(`bun pm pack wrote no tarball for ${pkg.name}.`)
  const packedManifest = read('tar', [
    '-xzOf',
    join(packDir, String(tarball)),
    'package/package.json',
  ]).out
  if (packedManifest.includes('workspace:'))
    fail(`The tarball of ${pkg.name} still has workspace: versions.`)
  runNpm(['publish', join(packDir, String(tarball)), '--access', 'public', '--tag', 'latest'])
  rmSync(packDir, { recursive: true })
}

for (const name of names) run('git', ['tag', name])
run('git', ['push', '--quiet', 'origin', 'main', ...names.map((name) => `refs/tags/${name}`)])

console.log(`\nReleased ${names.join(', ')}`)

import { rm } from 'node:fs/promises'
/**
 * Simulates the GitHub Pages deploy build on a clean checkout: wipe package dist/
 * folders, then build in monorepo order. Catches wrong build:packages ordering
 * (packages that import @osm-traffic-signs/converter need converter dist/ first).
 */
import path from 'node:path'
import { $ } from 'bun'

const root = import.meta.dir

const distDirs = [
  'packages/traffic-sign-converter/dist',
  'packages/internal_taginfo/dist',
  'packages/internal_svgs/dist',
  'packages/internal_wiki/dist',
  'apps/traffic-sign-tool/dist',
]

for (const relative of distDirs) {
  await rm(path.join(root, relative), { recursive: true, force: true })
}

await $`GITHUB_PAGES=true bun run build`.cwd(root)

import { cp, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { build } from 'vite'
import esmConfig from '../vite.esm.config.ts'
import iifeConfig from '../vite.iife.config.ts'

const dist = join(import.meta.dirname, '../dist')
await mkdir(dist, { recursive: true })

const postBuild = async () => {
  await cp(join(import.meta.dirname, '../src/id-field.css'), join(dist, 'id-field.css'))
  await import('./sync-to-id-worktree.ts')
}

const syncPlugin = () => ({
  name: 'sync-to-id-worktree',
  closeBundle: postBuild,
})

await Promise.all(
  [esmConfig, iifeConfig].map((config) =>
    build({
      ...config,
      plugins: [syncPlugin(), ...(config.plugins ?? [])],
      build: { ...config.build, watch: {} },
    }),
  ),
)

console.log('Watching @osm-traffic-signs/id-field (syncs to iD worktree on rebuild)')

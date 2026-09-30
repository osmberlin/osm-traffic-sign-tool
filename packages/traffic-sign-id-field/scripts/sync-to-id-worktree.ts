import { cp, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

const idWorktree =
  process.env.ID_WORKTREE ?? join(import.meta.dirname, '../../../../iD-traffic-sign-field')

const packageDist = join(import.meta.dirname, '../dist')
const targetDir = join(idWorktree, 'dist/traffic-sign-field')

await mkdir(targetDir, { recursive: true })

for (const file of ['id-field.js', 'id-field.esm.js', 'id-field.css']) {
  await cp(join(packageDist, file), join(targetDir, file), { force: true })
}

const mapFiles = ['id-field.js.map', 'id-field.esm.js.map']
for (const file of mapFiles) {
  try {
    await cp(join(packageDist, file), join(targetDir, file), { force: true })
  } catch {
    // source maps are optional
  }
}

console.log(`Synced package dist → ${targetDir}`)

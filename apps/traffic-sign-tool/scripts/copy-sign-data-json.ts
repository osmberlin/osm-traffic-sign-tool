import { cp, rm } from 'node:fs/promises'
import path from 'node:path'

const appRoot = path.resolve(import.meta.dir, '..')
const src = path.resolve(appRoot, '../../packages/traffic-sign-converter/dist/sign-data')
const dest = path.join(appRoot, 'public/sign-data')

if (!(await Bun.file(path.join(src, 'manifest.json')).exists())) {
  throw new Error(
    `Missing converter sign-data at ${src}. Run converter build first (bun run build:packages).`,
  )
}

await rm(dest, { recursive: true, force: true })
await cp(src, dest, { recursive: true })

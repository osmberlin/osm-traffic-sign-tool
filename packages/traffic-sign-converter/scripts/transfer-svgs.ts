import { cp } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourceDir = path.resolve(packageRoot, '../internal_svgs/src/data-svgs')
const destDir = path.join(packageRoot, 'src/data-svgs')

const relativeDest = path.relative(packageRoot, destDir)
if (relativeDest !== path.join('src', 'data-svgs')) {
  throw new Error(`Refusing to copy SVGs to unexpected destination: ${destDir}`)
}

if (!(await Bun.file(path.join(sourceDir, 'index.ts')).exists())) {
  throw new Error(`SVG source directory is missing or incomplete: ${sourceDir}`)
}

await cp(sourceDir, destDir, { recursive: true, force: true })

import path from 'node:path'
import colors from '@colors/colors'
import { $ } from 'bun'

const basePath = path.resolve(import.meta.dir)
let cdPath = basePath

cdPath = path.join(basePath, 'packages/traffic-sign-converter')
console.log(colors.bgBlue.white('\n\n1. Update the traffic sign data'), cdPath)
await $`cd ${cdPath} && bun run build`

cdPath = path.join(basePath, 'packages/internal_svgs')
console.log(colors.bgBlue.white('\n\n2. Download new signs (incremental mode)'), cdPath)
await $`cd ${cdPath} && bun run updateSvgs:incremental`
// updateSvgs:incremental runs download/optimize pipeline + formatting

console.log(colors.bgBlue.white('\n\n2b. Apply missing SVG flags to catalogue data'), cdPath)
await $`cd ${cdPath} && bun ./scripts/apply-missing-svg-flags.ts`

cdPath = path.join(basePath, 'packages/traffic-sign-converter')
console.log(
  colors.bgBlue.white('\n\n3. Build the traffic sign data (copy SVGs to converter dist)'),
  cdPath,
)
await $`cd ${cdPath} && bun run build`

import colors from '@colors/colors'
import { $ } from 'bun'
import path from 'node:path'

const basePath = path.resolve(import.meta.dir)
let cdPath = basePath

cdPath = path.join(basePath, 'packages/traffic-sign-converter')
console.log(colors.bgBlue.white('\n\n1. Update the traffic sign data'), cdPath)
await $`cd ${cdPath} && pnpm run build`

cdPath = path.join(basePath, 'packages/internal_svgs')
console.log(colors.bgBlue.white('\n\n2. Download new signs'), cdPath)
await $`cd ${cdPath} && pnpm run updateSvgs`

cdPath = path.join(basePath, 'packages/traffic-sign-converter')
console.log(colors.bgBlue.white('\n\n3. Build the traffic sign data with the new sign'), cdPath)
await $`cd ${cdPath} && pnpm run build`

cdPath = path.join(basePath, 'apps/traffic-sign-tool')
console.log(colors.bgBlue.white('\n\n4. Run the app'), cdPath)
await $`cd ${cdPath} && pnpm run dev`

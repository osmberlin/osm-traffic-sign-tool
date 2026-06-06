/**
 * Patch SVG <title> elements from catalogue descriptiveName values.
 * Run: bun script-patch-svg-titles.ts <CC>
 */
import path from 'node:path'
import { createSvgFilename, type SignType } from '@osm-traffic-signs/converter'

const countryPrefix = process.argv[2]
if (!countryPrefix) {
  console.error('Usage: bun script-patch-svg-titles.ts <CC>')
  process.exit(1)
}

const dataModulePath = path.join(
  import.meta.dir,
  '../traffic-sign-converter/src/data-definitions',
  countryPrefix,
  `trafficSignData${countryPrefix}.ts`,
)
const svgsDir = path.join(import.meta.dir, 'src/data-svgs', countryPrefix, 'svgs')

const { [`trafficSignData${countryPrefix}`]: signs } = (await import(dataModulePath)) as Record<
  string,
  SignType[]
>

let patched = 0
let missing = 0
let unchanged = 0

for (const sign of signs) {
  const fileName = createSvgFilename(countryPrefix as SignType['osmValuePart'] & string, sign)
  const filePath = path.join(svgsDir, fileName)
  if (!(await Bun.file(filePath).exists())) {
    missing++
    continue
  }

  const content = await Bun.file(filePath).text()
  const titleText = `Verkehrszeichen ${sign.osmValuePart} - ${sign.descriptiveName}`
  const updated = content.replace(
    /<title id="title">[^<]*<\/title>/,
    `<title id="title">${titleText}</title>`,
  )

  if (updated === content) {
    unchanged++
    continue
  }

  await Bun.write(filePath, updated)
  patched++
}

console.log(`Done: ${patched} patched, ${unchanged} unchanged, ${missing} missing SVG files`)

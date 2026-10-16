import { readdir } from 'node:fs/promises'
import path from 'node:path'
import type { CountryPrefixType } from '@osm-traffic-signs/converter'
import { writeSvgDimensionsFile } from '../src/utils/svgDimensions.js'

// Regenerate `data-svgs/<country>/dimensions.ts` from the SVGs on disk without downloading.
// Uses the keys of `loaders.ts` so both files list the same signs.
const dataSvgsDirectory = path.resolve(import.meta.dir, '../src/data-svgs')

const countryDirectories = (await readdir(dataSvgsDirectory, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)

for (const countryPrefix of countryDirectories as CountryPrefixType[]) {
  const countryDirectory = path.join(dataSvgsDirectory, countryPrefix)
  const loadersModule = await import(path.join(countryDirectory, 'loaders.ts'))
  const loaders: Record<string, unknown> = loadersModule[`SvgLoaders${countryPrefix}`]
  const items = Object.keys(loaders).map((importName) => ({
    importName,
    fileName: `${importName}.svg`,
  }))

  await writeSvgDimensionsFile(countryPrefix, countryDirectory, items)
  console.log('WRITE DIMENSIONS', countryPrefix, items.length)
}

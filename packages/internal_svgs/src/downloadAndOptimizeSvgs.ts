import {
  countryDefinitionMap,
  type CountryPrefixType,
  type SignType,
} from '@osm-traffic-signs/converter'
import fs, { unlinkSync } from 'node:fs'
import path from 'node:path'
import { cleanupDirectories } from './utils/cleanupDirectories.js'
import { downloadAndOptimizeSvg } from './utils/downloadAndOptimizeSvg.js'
import { prepareDirectoryCountry } from './utils/prepareDirectoryCountry.js'

async function downloadAllSvgs(countryPrefix: CountryPrefixType, data: SignType[]) {
  console.log('START', countryPrefix)

  // Create & cleanup
  const countryDirectory = prepareDirectoryCountry(countryPrefix)
  console.log('-- CLEANUP DIRECTORY', countryDirectory)
  cleanupDirectories(countryDirectory)

  // DOWNLOAD FILES
  console.log('-- DOWNLOAD FILES', data.length)
  const downloadResult = await Promise.all(
    data.map((sign) => downloadAndOptimizeSvg(countryPrefix, sign)),
  )

  // ERROR: RESET AND WRITE
  const errors = downloadResult.filter((r) => r.success === false)
  const errorsFile = path.join(__dirname, 'tmp', `downloadErrors_${countryPrefix}.json`)
  console.log('-- WRITE ERRORS', errors.length, errors.length ? errorsFile : undefined)
  if (fs.existsSync(errorsFile)) unlinkSync(errorsFile) // Delete file
  if (errors.length > 0) {
    Bun.write(errorsFile, JSON.stringify(errors, null, 2))
  }

  // TYPES: WRITE TYPES FILE – one export line per file
  const signs = downloadResult.filter((r) => r.success === true)
  const typesFile = path.join(countryDirectory, 'index.ts')
  console.log('-- WRITE TYPES', signs.length, typesFile)
  const exportStrings = Array.from(
    new Set(
      signs.filter(Boolean).map(({ importName, fileName }) => ({
        importName,
        fileName,
      })),
    ),
  ).filter(Boolean)

  const svgExportContent = exportStrings
    .sort((a, b) => a.importName.localeCompare(b.fileName))
    .map((item) => {
      const relativePath = path.join('./svgs', item.fileName)
      return `export { default as ${item.importName} } from './${relativePath}'`
    })
    .join('\n')

  Bun.write(typesFile, svgExportContent)

  console.log('DONE', countryPrefix)
}

for (const [country, data] of countryDefinitionMap.entries()) {
  await downloadAllSvgs(country, data).catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

// TYPES: Add barrel file
const barrelFile = path.join(__dirname, 'data-svgs', 'index.ts')
console.log('WRITE BARREL FILE', barrelFile)
const barrelContent = Array.from(countryDefinitionMap.entries())
  .map(([country]) => {
    return `export * as Svgs${country} from './${country}/index.js'`
  })
  .join('\n')
Bun.write(barrelFile, barrelContent)

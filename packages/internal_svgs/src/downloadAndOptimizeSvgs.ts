import { unlink } from 'node:fs/promises'
import path from 'node:path'
import {
  countryDefinitionMap,
  type CountryPrefixType,
  type SignType,
} from '@osm-traffic-signs/converter'
import { downloadAndOptimizeSvg } from './utils/downloadAndOptimizeSvg.js'
import { prepareDirectoryCountry } from './utils/prepareDirectoryCountry.js'

type ExportItem = {
  importName: string
  fileName: string
}

const sortExportItems = (a: ExportItem, b: ExportItem) => a.importName.localeCompare(b.importName)

const createSvgExportsContent = (items: ExportItem[]) =>
  items
    .sort(sortExportItems)
    .map(({ importName, fileName }) => {
      const relativePath = path.join('./svgs', fileName)
      return `export { default as ${importName} } from './${relativePath}'`
    })
    .join('\n')

const createLoaderExportsContent = (countryPrefix: CountryPrefixType, items: ExportItem[]) => {
  const loaderTypeName = `${countryPrefix}SvgLoaderMap`
  const sortedItems = items.sort(sortExportItems)

  return [
    `type SvgModule = typeof import('./svgs/${sortedItems[0]?.fileName ?? `${countryPrefix}_missing.svg`}')`,
    '',
    `export type ${loaderTypeName} = Record<string, () => Promise<SvgModule>>`,
    '',
    `export const SvgLoaders${countryPrefix}: ${loaderTypeName} = {`,
    ...sortedItems.map(
      ({ importName, fileName }) =>
        `  ${importName}: () => import('./svgs/${fileName.replaceAll('\\', '/')}'),`,
    ),
    '}',
    '',
  ].join('\n')
}

async function downloadAllSvgs(
  countryPrefix: CountryPrefixType,
  data: SignType[],
  mode: 'incremental' | 'full',
) {
  console.log('START', countryPrefix, `mode: ${mode}`)

  // Create directory
  const countryDirectory = prepareDirectoryCountry(countryPrefix)

  console.log('-- NON-DESTRUCTIVE MODE: Keeping existing SVG files')

  // ERROR FILE
  const errorsFile = path.join(__dirname, 'download-errors', `downloadErrors_${countryPrefix}.json`)

  // DOWNLOAD FILES: Filter out existing files in incremental mode
  let filesToDownload = data
  const skipExisting = mode === 'incremental'

  if (skipExisting) {
    const countryDirectory = prepareDirectoryCountry(countryPrefix)
    const svgsDirectory = path.join(countryDirectory, 'svgs')

    // Filter to only include files that don't exist yet
    const existingChecks = await Promise.all(
      data.map(async (sign) => {
        const { createSvgFilename } = await import('@osm-traffic-signs/converter')
        const fileName = createSvgFilename(countryPrefix, sign)
        const filePath = path.join(svgsDirectory, fileName)
        const exists = await Bun.file(filePath).exists()
        return { sign, exists }
      }),
    )

    filesToDownload = existingChecks.filter(({ exists }) => !exists).map(({ sign }) => sign)
    const skippedCount = data.length - filesToDownload.length

    if (skippedCount > 0) {
      console.log(`-- INCREMENTAL MODE: Skipping ${skippedCount} existing files`)
    }
  }

  console.log('-- DOWNLOAD FILES', filesToDownload.length)

  const downloadResult = []

  for (const [index, sign] of filesToDownload.entries()) {
    if ((index + 1) % 10 === 0 || index === 0 || index + 1 === filesToDownload.length) {
      console.log(`-- Processing ${index + 1}/${filesToDownload.length}`)
    }
    const result = await downloadAndOptimizeSvg(countryPrefix, sign, false)
    downloadResult.push(result)
  }

  // In incremental mode, also add skipped files to results for type generation
  if (skipExisting) {
    const { createSvgFilename, createSvgImportname } = await import('@osm-traffic-signs/converter')
    const skippedResults = data
      .filter((sign) => !filesToDownload.includes(sign))
      .map((sign) => ({
        success: true as const,
        fileName: createSvgFilename(countryPrefix, sign),
        importName: createSvgImportname(countryPrefix, sign),
        skipped: true as const,
      }))
    downloadResult.push(...skippedResults)
  }

  // ERROR: WRITE
  const errors = downloadResult.filter((r) => r.success === false)
  console.log('-- WRITE ERRORS', errors.length, errors.length ? errorsFile : undefined)
  if (errors.length > 0) {
    await Bun.write(errorsFile, JSON.stringify(errors, null, 2))
  } else if (await Bun.file(errorsFile).exists()) {
    await unlink(errorsFile)
    console.log('-- REMOVED OLD ERROR FILE', errorsFile)
  }

  // TYPES: WRITE TYPES FILE – one export line per file
  const signs = downloadResult.filter((r) => r.success === true)
  const typesFile = path.join(countryDirectory, 'index.ts')
  const loaderFile = path.join(countryDirectory, 'loaders.ts')
  console.log('-- WRITE TYPES', signs.length, typesFile)
  const exportItems = Array.from(
    new Set(
      signs.filter(Boolean).map(({ importName, fileName }) => ({
        importName,
        fileName,
      })),
    ),
  ).filter(Boolean)

  const svgExportContent = createSvgExportsContent(exportItems)
  await Bun.write(typesFile, svgExportContent)

  console.log('-- WRITE LOADERS', signs.length, loaderFile)
  const loaderContent = createLoaderExportsContent(countryPrefix, exportItems)
  await Bun.write(loaderFile, loaderContent)

  console.log('DONE', countryPrefix)
}

// Read mode from environment variable or command-line arg
const modeArg = process.argv[2] || process.env.DOWNLOAD_MODE || 'full'
const mode = modeArg === 'incremental' ? 'incremental' : 'full'

for (const [country, data] of countryDefinitionMap.entries()) {
  await downloadAllSvgs(country, data, mode).catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

// TYPES: Add barrel file
const barrelFile = path.join(__dirname, 'data-svgs', 'index.ts')
console.log('WRITE BARREL FILE', barrelFile)
const barrelContent = Array.from(countryDefinitionMap.entries())
  .map(([country]) => {
    return [
      `export * as Svgs${country} from './${country}/index.js'`,
      `export { SvgLoaders${country} } from './${country}/loaders.js'`,
    ].join('\n')
  })
  .join('\n')
await Bun.write(barrelFile, barrelContent)

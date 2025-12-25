import {
  countryDefinitionMap,
  type CountryPrefixType,
  type SignType,
} from '@osm-traffic-signs/converter'
import { unlink } from 'node:fs/promises'
import path from 'node:path'
import { cleanupDirectories } from './utils/cleanupDirectories.js'
import { downloadAndOptimizeSvg } from './utils/downloadAndOptimizeSvg.js'
import { prepareDirectoryCountry } from './utils/prepareDirectoryCountry.js'

async function downloadAllSvgs(
  countryPrefix: CountryPrefixType,
  data: SignType[],
  mode: 'incremental' | 'full',
) {
  console.log('START', countryPrefix, `mode: ${mode}`)

  // Create directory
  const countryDirectory = prepareDirectoryCountry(countryPrefix)

  // Only cleanup in full mode
  if (mode === 'full') {
    console.log('-- CLEANUP DIRECTORY', countryDirectory)
    cleanupDirectories(countryDirectory)
  } else {
    console.log('-- INCREMENTAL MODE: Skipping directory cleanup')
  }

  // ERROR FILE: CLEANUP (only in full mode)
  const errorsFile = path.join(__dirname, 'download-errors', `downloadErrors_${countryPrefix}.json`)
  if (mode === 'full' && (await Bun.file(errorsFile).exists())) {
    await unlink(errorsFile)
    console.log('-- REMOVED OLD ERROR FILE', errorsFile)
  }

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

  // Rate limiting: process in batches to avoid overwhelming the API
  const BATCH_SIZE = 10
  const DELAY_BETWEEN_BATCHES_MS = 1000
  const downloadResult = []

  for (let i = 0; i < filesToDownload.length; i += BATCH_SIZE) {
    const batch = filesToDownload.slice(i, i + BATCH_SIZE)
    console.log(
      `-- Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(filesToDownload.length / BATCH_SIZE)} (${batch.length} items)`,
    )

    const batchResults = await Promise.all(
      batch.map((sign) => downloadAndOptimizeSvg(countryPrefix, sign, false)),
    )
    downloadResult.push(...batchResults)

    // Delay between batches (except for the last one)
    if (i + BATCH_SIZE < filesToDownload.length) {
      await Bun.sleep(DELAY_BETWEEN_BATCHES_MS)
    }
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

  await Bun.write(typesFile, svgExportContent)

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
    return `export * as Svgs${country} from './${country}/index.js'`
  })
  .join('\n')
await Bun.write(barrelFile, barrelContent)

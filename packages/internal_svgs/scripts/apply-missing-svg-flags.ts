import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { countries, type CountryPrefixType } from '@osm-traffic-signs/converter'

type DownloadErrorEntry = {
  success: false
  error: {
    message?: string
    reason?: 'wiki_file_missing'
    detail?: string
  }
  sign?: { osmValuePart: string }
}

const packageRoot = path.resolve(import.meta.dir, '..')
const converterDataRoot = path.resolve(
  packageRoot,
  '../traffic-sign-converter/src/data-definitions',
)
const errorsDir = path.join(packageRoot, 'src/download-errors')

const isWikiFileMissingError = (entry: DownloadErrorEntry): boolean => {
  if (entry.error.reason === 'wiki_file_missing') return true
  if (entry.error.message === 'Wiki file does not exist') return true
  return (
    entry.error.message === 'Could not extract imageinfo from API response' &&
    (entry.error.detail?.includes('"missing": ""') ?? false)
  )
}

const findCatalogueFile = async (
  countryPrefix: CountryPrefixType,
  osmValuePart: string,
): Promise<string | undefined> => {
  const dataDir = path.join(converterDataRoot, countryPrefix, 'data')
  const files = await readdir(dataDir)
  for (const fileName of files) {
    if (!fileName.endsWith('.ts')) continue
    const filePath = path.join(dataDir, fileName)
    const content = await Bun.file(filePath).text()
    if (content.includes(`osmValuePart: '${osmValuePart}'`)) {
      return filePath
    }
  }

  return undefined
}

const patchSignImageMissing = (content: string, osmValuePart: string): string | null => {
  const signIndex = content.indexOf(`osmValuePart: '${osmValuePart}'`)
  if (signIndex === -1) return null

  const nextSignIndex = content.indexOf(`osmValuePart:`, signIndex + 1)
  const signBlockEnd = nextSignIndex === -1 ? content.length : nextSignIndex
  const signBlock = content.slice(signIndex, signBlockEnd)

  if (/image:\s*'missing'/.test(signBlock)) {
    return null
  }

  const imageIndex = content.indexOf('image: {', signIndex)
  if (imageIndex === -1 || imageIndex >= signBlockEnd) return null

  const imageBlockEnd = content.indexOf('\n    },', imageIndex)
  if (imageBlockEnd === -1 || imageBlockEnd >= signBlockEnd) return null

  const replacement = "image: 'missing',"
  return (
    content.slice(0, imageIndex) + replacement + content.slice(imageBlockEnd + '\n    },'.length)
  )
}

const applyFlagsForCountry = async (countryPrefix: CountryPrefixType) => {
  const errorsFile = path.join(errorsDir, `downloadErrors_${countryPrefix}.json`)
  if (!(await Bun.file(errorsFile).exists())) {
    return []
  }

  const errors = (await Bun.file(errorsFile).json()) as DownloadErrorEntry[]
  const osmValueParts = [
    ...new Set(
      errors
        .filter(isWikiFileMissingError)
        .map((entry) => entry.sign?.osmValuePart)
        .filter((value): value is string => Boolean(value)),
    ),
  ]

  const flagged: string[] = []

  for (const osmValuePart of osmValueParts) {
    const filePath = await findCatalogueFile(countryPrefix, osmValuePart)
    if (!filePath) {
      console.warn(`-- SKIP ${countryPrefix}:${osmValuePart} (catalogue file not found)`)
      continue
    }

    const content = await Bun.file(filePath).text()
    const patched = patchSignImageMissing(content, osmValuePart)
    if (!patched) {
      console.log(`-- OK ${countryPrefix}:${osmValuePart} (already flagged or unchanged)`)
      continue
    }

    await Bun.write(filePath, patched)
    flagged.push(osmValuePart)
    console.log(`-- FLAGGED ${countryPrefix}:${osmValuePart} in ${path.basename(filePath)}`)
  }

  return flagged
}

console.log('Applying missing SVG flags from download errors…')

for (const countryPrefix of countries) {
  const flagged = await applyFlagsForCountry(countryPrefix)
  if (flagged.length > 0) {
    console.log(`${countryPrefix}: flagged ${flagged.join(', ')}`)
  }
}

console.log('Done.')

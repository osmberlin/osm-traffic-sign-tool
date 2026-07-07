/**
 * Build the translation registry: resolve every Panoramax detection class (from the YAML
 * source of truth) against this tool's catalogue (`@osm-traffic-signs/converter`) and its
 * bundled SVGs (`@internal/svgs` files on disk).
 *
 * Pure classification (`classifyEntry`) is separated from the data wiring (`buildRegistry`) so
 * the status logic can be unit-tested without the converter data or the filesystem.
 */
import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  countryDefinitions,
  createSvgImportname,
  splitSignIdSignValue,
} from '@osm-traffic-signs/converter'
import {
  type CountryRegistry,
  type RegistryCountry,
  registryCountries,
  type RegistryStatus,
  registryStatuses,
  type SpriteRegistryEntry,
} from '../src/registry/types.ts'

const HERE = dirname(fileURLToPath(import.meta.url))
const SVGS_BASE = resolve(HERE, '../../internal_svgs/src/data-svgs')
const YAML_PATH = resolve(HERE, '../src/registry/panoramax-classes.yaml')

type YamlEntry = { yolo: string } & Partial<Record<RegistryCountry, string>>

/** Parse the YAML source of truth into rows. */
export async function parseClasses(): Promise<YamlEntry[]> {
  const text = await Bun.file(YAML_PATH).text()
  return Bun.YAML.parse(text) as YamlEntry[]
}

/** internal_svgs path for a given country + filename stem. */
export function svgPath(country: RegistryCountry, svgName: string): string {
  return join(SVGS_BASE, country, 'svgs', `${svgName}.svg`)
}

export type ClassifyInput = {
  yolo: string
  country: RegistryCountry
  /** Bare per-country code from the YAML, e.g. `274-30`, `C113`, `B14[30]`. */
  code: string
  hasCatalogue: boolean
  /** Does the derived signId exist in the country catalogue? */
  signIdInCatalogue: boolean
  /** Does the bundled SVG file exist? */
  svgExists: boolean
}

/** Pure status classification — no data/filesystem access, unit-testable. */
export function classifyEntry(input: ClassifyInput): SpriteRegistryEntry {
  const { yolo, country, code, hasCatalogue, signIdInCatalogue, svgExists } = input
  const osmValue = `${country}:${code}`
  // spriteKey mirrors the Panoramax viewer: osmValue minus the `CC:` prefix (keeps any [value]).
  const spriteKey = code
  const signId = splitSignIdSignValue(code).signId
  const svgName = hasCatalogue ? createSvgImportname(country as never, signId) : null

  let status: RegistryStatus
  if (!hasCatalogue) status = 'country-not-in-tool'
  else if (!signIdInCatalogue) status = 'signId-not-in-tool'
  else if (!svgExists) status = 'svg-missing'
  else status = 'ok'

  return {
    yolo,
    country,
    osmValue,
    spriteKey: status === 'ok' ? spriteKey : null,
    signId,
    svgName: status === 'country-not-in-tool' ? null : svgName,
    status,
  }
}

const emptyCounts = (): Record<RegistryStatus, number> =>
  Object.fromEntries(registryStatuses.map((s) => [s, 0])) as Record<RegistryStatus, number>

/** Set of catalogue signIds for a country (empty when the country has no catalogue). */
function catalogueSignIds(country: RegistryCountry): Set<string> {
  const defs = (countryDefinitions as Record<string, { signId: string }[]>)[country]
  return new Set((defs ?? []).map((sign) => sign.signId))
}

export async function buildRegistry(): Promise<{
  byCountry: CountryRegistry[]
  all: SpriteRegistryEntry[]
}> {
  const rows = await parseClasses()
  const byCountry: CountryRegistry[] = []
  const all: SpriteRegistryEntry[] = []

  for (const country of registryCountries) {
    const hasCatalogue = country in countryDefinitions
    const signIds = catalogueSignIds(country)
    const counts = emptyCounts()
    const entries: SpriteRegistryEntry[] = []

    for (const row of rows) {
      const code = row[country]
      if (code === undefined) continue
      const signId = splitSignIdSignValue(code).signId
      const signIdInCatalogue = signIds.has(signId)
      const svgName = hasCatalogue ? createSvgImportname(country as never, signId) : null
      const svgExists = svgName ? existsSync(svgPath(country, svgName)) : false
      const entry = classifyEntry({
        yolo: row.yolo,
        country,
        code,
        hasCatalogue,
        signIdInCatalogue,
        svgExists,
      })
      counts[entry.status]++
      entries.push(entry)
      all.push(entry)
    }

    entries.sort((a, b) => a.osmValue.localeCompare(b.osmValue))
    byCountry.push({ country, hasCatalogue, counts, entries })
  }

  return { byCountry, all }
}

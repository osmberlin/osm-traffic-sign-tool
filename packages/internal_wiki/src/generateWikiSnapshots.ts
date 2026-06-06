import type { CountryPrefixType } from '@osm-traffic-signs/converter'
import * as cheerio from 'cheerio'
import { countryWikiConfigs, WIKI_BASE, wikiSnapshotCountryPrefixes } from './countryWikiConfigs.js'
import {
  dedupeWikiSigns,
  parseBelgiumTable,
  parseDeRowIdTable,
  parseUniversalTable,
  toWikiSign,
} from './parseWiki/parseWikiTables.js'
import type { WikiSign } from './wikiSignTypes.js'
import { wikiSnapshotPath } from './wikiSnapshotPaths.js'

const fetchPage = async (slug: string) => {
  const url = `${WIKI_BASE}${slug}`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`)
  return response.text()
}

export const parseWikiHtml = (
  html: string,
  countryPrefix: string,
  parseMode: 'belgium' | 'universal' | 'de-row-id',
): WikiSign[] => {
  const $ = cheerio.load(html)
  const rows =
    parseMode === 'de-row-id'
      ? parseDeRowIdTable($)
      : parseMode === 'belgium'
        ? parseBelgiumTable($)
        : parseUniversalTable($, countryPrefix)

  return dedupeWikiSigns(
    rows
      .map((row) => toWikiSign(countryPrefix, row))
      .filter((sign): sign is WikiSign => sign !== null),
  )
}

export const generateWikiSnapshotForCountry = async (
  countryPrefix: string,
): Promise<WikiSign[]> => {
  const config = countryWikiConfigs[countryPrefix]
  if (!config) {
    throw new Error(`No wiki config for ${countryPrefix}`)
  }

  const allSigns: WikiSign[] = []
  for (const page of config.pages) {
    const parseMode = page.parseMode ?? 'universal'
    console.log(`[${countryPrefix}] Fetching ${page.slug}...`)
    let html = await fetchPage(page.slug)
    const signs = parseWikiHtml(html, config.prefix, parseMode)

    console.log(`  ${signs.length} signs`)
    allSigns.push(...signs)
  }

  return dedupeWikiSigns(allSigns)
}

export const writeWikiSnapshot = async (countryPrefix: string, signs: WikiSign[]) => {
  const outputPath = wikiSnapshotPath(countryPrefix as CountryPrefixType)
  await Bun.write(outputPath, JSON.stringify(signs, null, 2))
  console.log(`Wrote ${signs.length} signs to ${outputPath}`)
}

const main = async () => {
  const countryArg = process.argv[2] ?? 'ALL'
  const targets =
    countryArg === 'ALL'
      ? wikiSnapshotCountryPrefixes
      : countryArg.split(',').map((value) => value.trim())

  for (const countryPrefix of targets) {
    if (!countryWikiConfigs[countryPrefix]) {
      console.error(`No config for ${countryPrefix}`)
      process.exit(1)
    }
    const signs = await generateWikiSnapshotForCountry(countryPrefix)
    await writeWikiSnapshot(countryPrefix, signs)
  }
}

if (import.meta.main) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

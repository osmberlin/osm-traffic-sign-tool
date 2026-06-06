/**
 * Fetches OSM Wiki traffic sign tables and emits SignType[] TypeScript modules.
 * Run: bun script-import-wiki-catalogue.ts <CC|ALL>
 */
import path from 'node:path'
import * as cheerio from 'cheerio'

type WikiPageConfig = {
  slug: string
  exportName: string
  fileName: string
  defaultCategory: string
  /** belgium = Sign|Image|Description|Tags columns; universal = auto-detect */
  parseMode?: 'belgium' | 'universal'
}

type CountryWikiConfig = {
  prefix: string
  overviewUrl: string
  catalogueName: string
  catalogueLocale: string
  defaultCommentLang: string
  hashPrefixMain: string
  hashPrefixModifier: string
  pages: WikiPageConfig[]
}

const countryConfigs: Record<string, CountryWikiConfig> = {
  BE: {
    prefix: 'BE',
    overviewUrl: 'https://wiki.openstreetmap.org/wiki/Road_signs_in_Belgium',
    catalogueName: 'Belgian traffic signs',
    catalogueLocale: 'en',
    defaultCommentLang: 'en',
    hashPrefixMain: '',
    hashPrefixModifier: 'M',
    pages: [
      {
        slug: 'Road_signs_in_Belgium/A_Warning_signs',
        exportName: '_warning',
        fileName: 'warning.ts',
        defaultCategory: 'hazard_sign',
        parseMode: 'belgium',
      },
      {
        slug: 'Road_signs_in_Belgium/B_Priority_signs',
        exportName: '_priority',
        fileName: 'priority.ts',
        defaultCategory: 'traffic_sign',
        parseMode: 'belgium',
      },
      {
        slug: 'Road_signs_in_Belgium/C_Prohibitory_signs',
        exportName: '_prohibitory',
        fileName: 'prohibitory.ts',
        defaultCategory: 'traffic_sign',
        parseMode: 'belgium',
      },
      {
        slug: 'Road_signs_in_Belgium/D_Mandatory_signs',
        exportName: '_mandatory',
        fileName: 'mandatory.ts',
        defaultCategory: 'traffic_sign',
        parseMode: 'belgium',
      },
      {
        slug: 'Road_signs_in_Belgium/E_Parking_signs',
        exportName: '_parking',
        fileName: 'parking.ts',
        defaultCategory: 'traffic_sign',
        parseMode: 'belgium',
      },
      {
        slug: 'Road_signs_in_Belgium/F_Direction_and_information_signs',
        exportName: '_direction',
        fileName: 'direction.ts',
        defaultCategory: 'signpost',
        parseMode: 'belgium',
      },
      {
        slug: 'Road_signs_in_Belgium/M_Extra_signs',
        exportName: '_extra',
        fileName: 'extra.ts',
        defaultCategory: 'exception_modifier',
        parseMode: 'belgium',
      },
    ],
  },
  PL: {
    prefix: 'PL',
    overviewUrl: 'https://wiki.openstreetmap.org/wiki/Pl:Znaki_drogowe_w_Polsce',
    catalogueName: 'Polish traffic signs',
    catalogueLocale: 'pl',
    defaultCommentLang: 'pl',
    hashPrefixMain: '',
    hashPrefixModifier: 'T',
    pages: [
      {
        slug: 'Pl:Znaki_drogowe_w_Polsce',
        exportName: '_all',
        fileName: 'all.ts',
        defaultCategory: 'traffic_sign',
        parseMode: 'universal',
      },
    ],
  },
  AU: {
    prefix: 'AU',
    overviewUrl: 'https://wiki.openstreetmap.org/wiki/Australian_Tagging_Guidelines/Road_Signage',
    catalogueName: 'Australian traffic signs',
    catalogueLocale: 'en',
    defaultCommentLang: 'en',
    hashPrefixMain: '',
    hashPrefixModifier: '',
    pages: [
      {
        slug: 'Australian_Tagging_Guidelines/Road_Signage',
        exportName: '_all',
        fileName: 'all.ts',
        defaultCategory: 'traffic_sign',
        parseMode: 'universal',
      },
    ],
  },
  AT: {
    prefix: 'AT',
    overviewUrl: 'https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_%C3%96sterreich',
    catalogueName: 'Austrian traffic signs',
    catalogueLocale: 'de',
    defaultCommentLang: 'de',
    hashPrefixMain: '',
    hashPrefixModifier: '',
    pages: [
      {
        slug: 'DE:Verkehrszeichen_in_%C3%96sterreich',
        exportName: '_all',
        fileName: 'all.ts',
        defaultCategory: 'traffic_sign',
        parseMode: 'universal',
      },
    ],
  },
  FR: {
    prefix: 'FR',
    overviewUrl: 'https://wiki.openstreetmap.org/wiki/FR:Signalisation_routi%C3%A8re_en_France',
    catalogueName: 'French traffic signs',
    catalogueLocale: 'fr',
    defaultCommentLang: 'fr',
    hashPrefixMain: '',
    hashPrefixModifier: 'M',
    pages: [
      {
        slug: 'FR:Signalisation_routi%C3%A8re_en_France',
        exportName: '_all',
        fileName: 'all.ts',
        defaultCategory: 'traffic_sign',
        parseMode: 'universal',
      },
    ],
  },
  BR: {
    prefix: 'BR',
    overviewUrl: 'https://wiki.openstreetmap.org/wiki/Pt:Placas_de_sinaliza%C3%A7%C3%A3o_no_Brasil',
    catalogueName: 'Brazilian traffic signs',
    catalogueLocale: 'pt',
    defaultCommentLang: 'pt',
    hashPrefixMain: '',
    hashPrefixModifier: '',
    pages: [
      {
        slug: 'Pt:Placas_de_sinaliza%C3%A7%C3%A3o_no_Brasil',
        exportName: '_all',
        fileName: 'all.ts',
        defaultCategory: 'traffic_sign',
        parseMode: 'universal',
      },
    ],
  },
  CA: {
    prefix: 'CA',
    overviewUrl: 'https://wiki.openstreetmap.org/wiki/Canada/Road_signs',
    catalogueName: 'Canadian traffic signs',
    catalogueLocale: 'en',
    defaultCommentLang: 'en',
    hashPrefixMain: '',
    hashPrefixModifier: '',
    pages: [
      {
        slug: 'Canada/Road_signs/Ontario',
        exportName: '_ontario',
        fileName: 'ontario.ts',
        defaultCategory: 'traffic_sign',
        parseMode: 'universal',
      },
    ],
  },
}

const WIKI_BASE = 'https://wiki.openstreetmap.org/wiki/'

type ParsedSign = {
  signId: string
  name: string
  imageUrl?: string
  tagsText: string
  isNa: boolean
}

const parseWikiTags = (tagsText: string): { key: string; value: string }[] => {
  if (!tagsText || /^(n\/a|na|–|-|\*|= \*)$/i.test(tagsText.trim())) return []
  const tags: { key: string; value: string }[] = []
  const normalized = tagsText.replace(/\s+/g, ' ')
  const tagPatterns = [
    ...normalized.matchAll(/([a-z0-9:_-]+)\s*=\s*([^`\s,;]+(?:\[[^\]]+\])?)/gi),
    ...normalized.matchAll(/([a-z0-9:_-]+)\s+([a-z0-9:_*-]+)\s*`=`/gi),
  ]
  for (const match of tagPatterns) {
    const key = match[1]!
    const value = match[2]!.replace(/`/g, '')
    if (key === 'traffic_sign' || value === '*' || value === '=*') continue
    if (!tags.some((t) => t.key === key && t.value === value)) {
      tags.push({ key, value })
    }
  }
  return tags
}

const extractTrafficSignId = (rowText: string, prefix: string): string | null => {
  const explicit =
    rowText.match(new RegExp(`traffic_sign\\s*=\\s*${prefix}:([^\\s,;]+)`, 'i')) ??
    rowText.match(new RegExp(`traffic_sign\\s*=\\s*([A-Z]{2}(?:-[A-Z]{2})?):([^\\s,;]+)`, 'i'))
  if (explicit) {
    const id = explicit[2] ?? explicit[1]
    return id.replace(/`/g, '').trim()
  }
  const codeMatch = rowText.match(
    /\b([A-Z]-\d+[a-z]?|[A-Z]\d+[a-z]?|[A-Z]{1,2}\d+[a-z.-]*|\d+[a-z](?:\.\d+)?(?:-\d+[a-z]?)?)\b/,
  )
  if (codeMatch) return codeMatch[1]!
  const numbered = rowText.match(/^(\d+[a-z]?(?:\.\d+)?(?:-\d+)?)\s*:/)
  if (numbered) return numbered[1]!
  return null
}

const inferCategory = (
  signId: string,
  tags: { key: string; value: string }[],
  defaultCategory: string,
) => {
  if (/^[AW]\d/i.test(signId) || signId.startsWith('A-')) return 'hazard_sign'
  if (signId.startsWith('A') && /^A\d/.test(signId)) return 'hazard_sign'
  if (signId.startsWith('M') || signId.startsWith('T-')) return 'exception_modifier'
  if (tags.some((t) => t.key === 'maxspeed')) return 'speed'
  if (tags.some((t) => t.key.startsWith('hazard'))) return 'hazard_sign'
  return defaultCategory
}

const inferKind = (signId: string, category: string) => {
  if (
    category === 'exception_modifier' ||
    category === 'condition_modifier' ||
    category === 'direction_modifier'
  ) {
    if (signId.startsWith('T-')) return 'condition_modifier'
    return 'exception_modifier'
  }
  return 'traffic_sign'
}

const inferGeometries = (tags: { key: string; value: string }[]) => {
  if (
    tags.some(
      (t) =>
        t.key === 'highway' &&
        ['stop', 'give_way', 'traffic_signals', 'crossing'].includes(t.value),
    )
  ) {
    return ['node']
  }
  if (tags.some((t) => t.key === 'railway' && t.value === 'level_crossing')) return ['node']
  if (tags.length === 0) return ['node']
  return ['way']
}

const buildRecommendations = (tags: { key: string; value: string }[], isNa: boolean) => {
  if (isNa || tags.length === 0) {
    return `tagRecommendationsByGeometry: 'none',\n    taggingSuggestionsQa: 'none',`
  }
  const geometries = inferGeometries(tags)
  const accessKeys = new Set([
    'vehicle',
    'motor_vehicle',
    'motorcar',
    'hgv',
    'bicycle',
    'motorcycle',
    'mofa',
    'horse',
    'bus',
    'foot',
    'hand_cart',
  ])
  const accessTags = tags.filter((t) => accessKeys.has(t.key))
  const uniqueTags = tags.filter((t) => !accessKeys.has(t.key) && t.key !== 'highway')
  const highwayValues = tags.filter((t) => t.key === 'highway').map((t) => t.value)

  const lines = [`geometries: ${JSON.stringify(geometries)},`]
  if (highwayValues.length) lines.push(`highwayValues: ${JSON.stringify(highwayValues)},`)
  if (accessTags.length) lines.push(`accessTags: ${JSON.stringify(accessTags)},`)
  if (uniqueTags.length) lines.push(`uniqueTags: ${JSON.stringify(uniqueTags)},`)

  return `tagRecommendationsByGeometry: [\n      { ${lines.join(' ')} },\n    ],`
}

const escapeString = (value: string) => value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

const fetchPage = async (slug: string) => {
  const url = `${WIKI_BASE}${slug}`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`)
  return response.text()
}

const parseBelgiumTable = ($: cheerio.CheerioAPI): ParsedSign[] => {
  const signs: ParsedSign[] = []
  $('table.wikitable tbody tr').each((_, row) => {
    const cells = $(row).find('td')
    if (cells.length < 3) return
    const signId = $(cells[0]).text().trim()
    if (!signId || signId.toLowerCase() === 'sign') return
    const imgHref = $(cells[1]).find('a').first().attr('href')
    const imageUrl = imgHref?.startsWith('http')
      ? imgHref
      : imgHref
        ? `https://wiki.openstreetmap.org${imgHref}`
        : undefined
    const tagsText = $(cells[3] ?? cells[2])
      .text()
      .trim()
    const name =
      $(cells[2] ?? cells[1])
        .text()
        .trim() || signId
    const isNa = /^(n\/a|na)$/i.test(tagsText)
    signs.push({ signId, name, imageUrl, tagsText, isNa })
  })
  return signs
}

const wikiSignCodeOnly = (text: string) => /^[A-Z]{1,2}\d[\w.+-]*$/i.test(text.trim())

const cleanWikiSignName = (rawName: string): string => {
  let name = rawName.replace(/\s+/g, ' ').trim()
  name = name.replace(/^\|\s*/, '')
  name = name.replace(/^Remarques\s*:\s*/i, '')
  const cutPatterns = [
    /\s+Siehe:.*/i,
    /\s+Notiz:.*/i,
    /\s+Anmerkungen:.*/i,
    /\s+Hinweis:.*/i,
    /\s+Ab hier\b.*/i,
    /\s+Wikipedia:.*/i,
    /\s+Höchstgeschwindigkeit:.*/i,
    /\s+Voir aussi.*/i,
    /\s+Note\s*:.*/i,
    /\s+Même remarque.*/i,
    /\s+\|\s*rowspan.*/i,
    /\s+\d+px.*/i,
    /\s+\*.*/,
  ]
  for (const pattern of cutPatterns) {
    name = name.replace(pattern, '')
  }
  return name.trim()
}

const looksLikeWikiInstructionName = (name: string): boolean => {
  const trimmed = cleanWikiSignName(name)
  return trimmed.length > 120 || /on utilise un attibut|voir la page|ajouter un\b/i.test(trimmed)
}

const isWikiTaggingCell = (text: string): boolean => {
  const trimmed = text.trim()
  return (
    /^Als\s/i.test(trimmed) ||
    /^Sur un (node|way|le)\b/i.test(trimmed) ||
    /^Sur une\b/i.test(trimmed) ||
    /^Ajouter un\b/i.test(trimmed) ||
    /^Remarques\s*:\s*$/i.test(trimmed) ||
    /^\d+px$/i.test(trimmed) ||
    wikiSignCodeOnly(trimmed) ||
    looksLikeWikiInstructionName(trimmed) ||
    trimmed.includes('traffic_sign=') ||
    trimmed.includes('traffic_sign =')
  )
}

const looksLikeWikiSignNameCell = (text: string): boolean => {
  const trimmed = text.trim().replace(/^\|\s*/, '')
  if (!trimmed || isWikiTaggingCell(trimmed) || /^fixme:/i.test(trimmed)) return false
  if (
    /^(?:\d+[a-z]?(?:[./][a-z]+)*(?:\[[^\]]*\])?|\d+\.\d+[a-z]?(?:\[[^\]]*\])?|[A-Za-z]{1,3}_[\w.]+|[a-z])(?:\s+groß)?:\s/.test(
      trimmed,
    )
  ) {
    return true
  }
  return /^[A-Z]{1,2}\d[\w.+-]*\s*:\s/.test(trimmed)
}

const finalizeWikiSignName = (rawName: string, signId: string): string => {
  if (looksLikeWikiInstructionName(rawName)) return signId
  const cleaned = cleanWikiSignName(rawName).slice(0, 200)
  if (!cleaned || /^(Remarques|Remarque|\?)$/i.test(cleaned)) return signId
  return cleaned
}

const wikiSignNameQuality = (name: string, signId: string): number => {
  const finalized = finalizeWikiSignName(name, signId)
  if (finalized === signId) return 0
  if (looksLikeWikiInstructionName(finalized)) return 1
  if (finalized.length > 80) return 2
  return 3
}

const extractNameFromCell = ($: cheerio.CheerioAPI, cell: cheerio.Element): string => {
  const $cell = $(cell)
  const bold = $cell.find('b').first().text().replace(/\s+/g, ' ').trim()
  return cleanWikiSignName((bold || $cell.text()).replace(/\s+/g, ' ').trim())
}

const pickWikiRowName = (
  $: cheerio.CheerioAPI,
  cells: cheerio.Cheerio<cheerio.Element>,
  rowTexts: string[],
  signId: string,
): string => {
  const nameCellIndex = [...rowTexts]
    .map((text, index) => ({ text, index }))
    .reverse()
    .find(({ text }) => looksLikeWikiSignNameCell(text))?.index

  if (nameCellIndex !== undefined) {
    const cell = cells.get(nameCellIndex)
    if (cell) return finalizeWikiSignName(extractNameFromCell($, cell), signId)
  }

  const fallbackCandidates = rowTexts.filter(
    (text) =>
      text.length > 3 &&
      text !== signId &&
      !isWikiTaggingCell(text) &&
      !text.includes('traffic_sign'),
  )
  const fallback = fallbackCandidates[fallbackCandidates.length - 1] ?? signId

  return finalizeWikiSignName(fallback, signId)
}

const pickWikiRowTagsText = (rowTexts: string[]): string => {
  const taggingCell = rowTexts.find((text) => isWikiTaggingCell(text))
  return taggingCell ?? rowTexts[rowTexts.length - 1] ?? ''
}

const parseUniversalTable = ($: cheerio.CheerioAPI, prefix: string): ParsedSign[] => {
  const signMap = new Map<string, ParsedSign>()
  $('table.wikitable tbody tr').each((_, row) => {
    const cells = $(row).find('td')
    if (cells.length < 2) return
    const rowTexts = cells.map((_, cell) => $(cell).text().replace(/\s+/g, ' ').trim()).get()
    const rowText = rowTexts.join(' ')
    if (!rowText || /^(sign|znak|placa|image|bild)/i.test(rowTexts[0] ?? '')) return

    const signId = extractTrafficSignId(rowText, prefix)
    if (!signId || signId.length > 40 || /^(image|sign|panneau)$/i.test(signId)) return

    const imgHref = $(cells[0]).find('a').attr('href') ?? $(cells[1]).find('a').attr('href')
    const imageUrl = imgHref?.startsWith('http')
      ? imgHref
      : imgHref
        ? `https://wiki.openstreetmap.org${imgHref}`
        : undefined
    const tagsText = pickWikiRowTagsText(rowTexts)
    const name = pickWikiRowName($, cells, rowTexts, signId)
    const isNa = /^(n\/a|na|n\/a\.?)$/i.test(tagsText) || /N\/A/i.test(tagsText)

    const entry: ParsedSign = { signId, name, imageUrl, tagsText, isNa }
    const existing = signMap.get(signId)
    if (
      !existing ||
      wikiSignNameQuality(name, signId) > wikiSignNameQuality(existing.name, signId)
    ) {
      signMap.set(signId, entry)
    }
  })
  return [...signMap.values()]
}

const emitSignObject = (sign: ParsedSign, defaultCategory: string, overviewUrl: string) => {
  const tags = parseWikiTags(sign.tagsText)
  const category = inferCategory(sign.signId, tags, defaultCategory)
  const kind = inferKind(sign.signId, category)
  const imageBlock = sign.imageUrl
    ? `image: {\n      kind: 'remote',\n      sourceUrl: '${escapeString(sign.imageUrl)}',\n      licence: 'Public Domain',\n    },`
    : `image: {\n      kind: 'remote',\n      sourceUrl: '${escapeString(overviewUrl)}',\n      licence: 'Public Domain',\n    },`

  return `  {
    osmValuePart: '${escapeString(sign.signId)}',
    signId: '${escapeString(sign.signId)}',
    name: '${escapeString(sign.signId)}',
    descriptiveName: '${escapeString(sign.name)}',
    description: null,
    kind: '${kind}',
    ${buildRecommendations(tags, sign.isNa)}
    catalogue: { signCategory: '${category}' },
    ${imageBlock}
  }`
}

const emitCatalogueMeta = (config: CountryWikiConfig) => {
  return `import { createBetaCatalogueMeta } from '../catalogueMetaHelpers.js'

export const catalogueMeta${config.prefix} = createBetaCatalogueMeta({
  countryPrefix: '${config.prefix}',
  catalogueName: '${config.catalogueName}',
  catalogueLocale: '${config.catalogueLocale}',
  defaultCommentLang: '${config.defaultCommentLang}',
  osmWikiOverviewUrl: '${config.overviewUrl}',
  referenceLinks: {
    osmWikiTableUrl: '${config.overviewUrl}#{signId}',
    hashPrefixes: {
      main: '${config.hashPrefixMain}',
      modifier: '${config.hashPrefixModifier}',
    },
    wikipediaTextFragmentLabels: {
      main: '',
      modifier: '',
    },
  },
})
`
}

const importCountry = async (config: CountryWikiConfig) => {
  const outDir = path.join(
    import.meta.dir,
    '../traffic-sign-converter/src/data-definitions',
    config.prefix,
    'data',
  )
  await Bun.write(path.join(outDir, '.gitkeep'), '')

  const metaPath = path.join(
    import.meta.dir,
    '../traffic-sign-converter/src/data-definitions',
    config.prefix,
    `catalogueMeta${config.prefix}.ts`,
  )
  await Bun.write(metaPath, emitCatalogueMeta(config))

  const exports: string[] = []
  let total = 0

  for (const page of config.pages) {
    console.log(`[${config.prefix}] Fetching ${page.slug}...`)
    const html = await fetchPage(page.slug)
    const $ = cheerio.load(html)
    const signs =
      page.parseMode === 'belgium' ? parseBelgiumTable($) : parseUniversalTable($, config.prefix)
    total += signs.length
    const content = `import type { SignType } from '../../TrafficSignDataTypes.js'\n\nexport const ${page.exportName}: SignType[] = [\n${signs.map((s) => emitSignObject(s, page.defaultCategory, config.overviewUrl)).join(',\n')}\n]\n`
    await Bun.write(path.join(outDir, page.fileName), content)
    exports.push(
      `import { ${page.exportName} } from './data/${page.fileName.replace('.ts', '.js')}'`,
    )
    console.log(`  ${signs.length} signs -> ${page.fileName}`)
  }

  const aggregatorPath = path.join(
    import.meta.dir,
    '../traffic-sign-converter/src/data-definitions',
    config.prefix,
    `trafficSignData${config.prefix}.ts`,
  )
  const aggregator = `${exports.join('\n')}\nimport type { SignType } from '../TrafficSignDataTypes.js'\n\nexport const trafficSignData${config.prefix}: SignType[] = [\n${config.pages.map((p) => `  ...${p.exportName},`).join('\n')}\n]\n`
  await Bun.write(aggregatorPath, aggregator)
  console.log(`[${config.prefix}] Total ${total} signs`)
  return total
}

const main = async () => {
  const countryArg = process.argv[2] ?? 'ALL'
  const targets =
    countryArg === 'ALL' ? Object.keys(countryConfigs) : countryArg.split(',').map((s) => s.trim())

  let grandTotal = 0
  for (const key of targets) {
    const config = countryConfigs[key]
    if (!config) {
      console.error(`No config for ${key}`)
      process.exit(1)
    }
    grandTotal += await importCountry(config)
  }
  console.log(`Grand total: ${grandTotal} signs across ${targets.length} countries`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

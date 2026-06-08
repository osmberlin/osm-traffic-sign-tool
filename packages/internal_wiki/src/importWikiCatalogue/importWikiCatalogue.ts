/**
 * Fetches OSM Wiki traffic sign tables and emits SignType[] TypeScript modules.
 * Run: bun ./src/importWikiCatalogue/importWikiCatalogue.ts <CC|ALL>
 */
import path from 'node:path'
import * as cheerio from 'cheerio'
import { catalogueWikiConfigs, type CatalogueCountryConfig } from '../catalogueWikiConfigs.js'
import { fetchWikiPage } from '../fetchWikiPage.js'
import {
  parseBelgiumTable,
  parseUniversalTable,
  parseWikiTags,
  type ParsedWikiRow,
} from '../parseWiki/parseWikiTables.js'

const converterDataDefinitionsDir = path.join(
  import.meta.dir,
  '../../../traffic-sign-converter/src/data-definitions',
)

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

const emitSignObject = (sign: ParsedWikiRow, defaultCategory: string, overviewUrl: string) => {
  const tags = parseWikiTags(sign.tagsText)
  const category = inferCategory(sign.signId, tags, defaultCategory)
  const kind = inferKind(sign.signId, category)
  const imageBlock = sign.imageUrl
    ? `image: {\n      kind: 'remote',\n      sourceUrl: '${escapeString(sign.imageUrl)}',\n      licence: 'Public Domain',\n    },`
    : `image: {\n      kind: 'remote',\n      sourceUrl: '${escapeString(overviewUrl)}',\n      licence: 'Public Domain',\n    },`

  const descriptiveNameLine =
    sign.name !== sign.signId ? `    descriptiveName: '${escapeString(sign.name)}',\n` : ''

  return `  {
    osmValuePart: '${escapeString(sign.signId)}',
    signId: '${escapeString(sign.signId)}',
    name: '${escapeString(sign.signId)}',
${descriptiveNameLine}    description: null,
    kind: '${kind}',
    ${buildRecommendations(tags, sign.isNa)}
    catalogue: { signCategory: '${category}' },
    ${imageBlock}
  }`
}

const emitCatalogueMeta = (config: CatalogueCountryConfig) => {
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

const importCountry = async (config: CatalogueCountryConfig) => {
  const outDir = path.join(converterDataDefinitionsDir, config.prefix, 'data')
  await Bun.write(path.join(outDir, '.gitkeep'), '')

  const metaPath = path.join(
    converterDataDefinitionsDir,
    config.prefix,
    `catalogueMeta${config.prefix}.ts`,
  )
  await Bun.write(metaPath, emitCatalogueMeta(config))

  const exports: string[] = []
  let total = 0

  for (const page of config.pages) {
    console.log(`[${config.prefix}] Fetching ${page.slug}...`)
    const html = await fetchWikiPage(page.slug)
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
    converterDataDefinitionsDir,
    config.prefix,
    `trafficSignData${config.prefix}.ts`,
  )
  const aggregator = `${exports.join('\n')}\nimport type { SignType } from '../TrafficSignDataTypes.js'\n\nexport const trafficSignData${config.prefix}: SignType[] = [\n${config.pages.map((p) => `  ...${p.exportName},`).join('\n')}\n]\n`
  await Bun.write(aggregatorPath, aggregator)
  console.log(`[${config.prefix}] Total ${total} signs`)
  return total
}

const emitSymbolCatalogueFile = async (
  config: CatalogueCountryConfig,
  signs: ParsedWikiRow[],
  filter: (signId: string) => boolean,
  exportName: string,
  fileName: string,
) => {
  const filtered = signs.filter((sign) => filter(sign.signId))
  const outDir = path.join(converterDataDefinitionsDir, config.prefix, 'data')
  const content = `import type { SignType } from '../../TrafficSignDataTypes.js'\n\nexport const ${exportName}: SignType[] = [\n${filtered
    .map((sign) => emitSignObject(sign, 'signpost', config.overviewUrl))
    .join(',\n')}\n]\n`
  await Bun.write(path.join(outDir, fileName), content)
  console.log(`  ${filtered.length} signs -> ${fileName}`)
  return filtered.length
}

const importFrSymbolsOnly = async (config: CatalogueCountryConfig) => {
  const page = config.pages[0]
  if (!page) throw new Error(`No wiki pages configured for ${config.prefix}`)
  console.log(`[${config.prefix}] Fetching ${page.slug} (symbols only)...`)
  const html = await fetchWikiPage(page.slug)
  const $ = cheerio.load(html)
  const signs = parseUniversalTable($, config.prefix)
  let total = 0
  total += await emitSymbolCatalogueFile(
    config,
    signs,
    (signId) => /^(SI|SC)/.test(signId),
    '_symbols_si_sc',
    'symbols_si_sc.ts',
  )
  total += await emitSymbolCatalogueFile(
    config,
    signs,
    (signId) => /^SU/.test(signId),
    '_symbols_su',
    'symbols_su.ts',
  )
  console.log(`[${config.prefix}] Total ${total} symbol signs`)
  return total
}

const main = async () => {
  const countryArg = process.argv[2] ?? 'ALL'
  const symbolsOnly = process.argv.includes('--symbols-only')
  const targets =
    countryArg === 'ALL'
      ? Object.keys(catalogueWikiConfigs)
      : countryArg.split(',').map((s) => s.trim())

  let grandTotal = 0
  for (const key of targets) {
    const config = catalogueWikiConfigs[key]
    if (!config) {
      console.error(`No config for ${key}`)
      process.exit(1)
    }
    if (symbolsOnly) {
      if (key !== 'FR') {
        console.error('--symbols-only is only supported for FR')
        process.exit(1)
      }
      grandTotal += await importFrSymbolsOnly(config)
      continue
    }
    grandTotal += await importCountry(config)
  }
  console.log(`Grand total: ${grandTotal} signs across ${targets.length} countries`)
}

if (import.meta.main) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

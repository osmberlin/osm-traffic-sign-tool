/**
 * Import missing French traffic signs from the PanierAvide signs.csv database.
 * Run: bun script-import-fr-panieravide-csv.ts
 */
import path from 'node:path'

const CSV_URL =
  'https://gitlab.com/PanierAvide/traffic-signs-database/-/raw/main/FR/signs.csv?ref_type=heads'

const FR_DATA_DIR = path.join(
  import.meta.dir,
  'packages/traffic-sign-converter/src/data-definitions/FR/data',
)
const FR_AGGREGATOR = path.join(
  import.meta.dir,
  'packages/traffic-sign-converter/src/data-definitions/FR/trafficSignDataFR.ts',
)

type CsvRow = { code: string; label: string; wikicommonsName: string; wikicommonsSvg: string }

const escapeString = (value: string) => value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

const wikiFileUrl = (wikicommonsName: string) => {
  const fileName = wikicommonsName.trim().replace(/ /g, '_')
  return `https://wiki.openstreetmap.org/wiki/File:${fileName}`
}

const parseCsv = (text: string): CsvRow[] => {
  const rows: CsvRow[] = []
  for (const line of text.trim().split('\n').slice(1)) {
    const parts = line.split(',')
    rows.push({
      code: parts[0] ?? '',
      label: parts[1] ?? '',
      wikicommonsName: parts[2] ?? '',
      wikicommonsSvg: parts[3] ?? '',
    })
  }
  return rows.filter((row) => row.code)
}

const readRegisteredCodes = async () => {
  const registered = new Set<string>()
  const glob = new Bun.Glob('*.ts')
  for await (const file of glob.scan(FR_DATA_DIR)) {
    const content = await Bun.file(path.join(FR_DATA_DIR, file)).text()
    for (const match of content.matchAll(/osmValuePart: '([^']+)'/g)) {
      registered.add(match[1])
    }
  }
  return registered
}

const inferTargetFile = (code: string): string => {
  if (/^AB/.test(code)) return 'priority_ab.ts'
  if (/^AK/.test(code)) return 'danger_ak.ts'
  if (/^A/.test(code)) return 'danger_a.ts'
  if (/^B/.test(code)) return 'prescription_b.ts'
  if (/^CE/.test(code)) return 'indication_ce.ts'
  if (/^C/.test(code)) return 'indication_c.ts'
  if (/^M/.test(code)) return 'panels_m.ts'
  if (/^SR/.test(code)) return 'safety_sr.ts'
  if (/^J/.test(code)) return 'beacons_j.ts'
  if (/^K/.test(code)) return 'temporary_k.ts'
  return 'other.ts'
}

const inferKind = (code: string): 'traffic_sign' | 'exception_modifier' | 'condition_modifier' => {
  if (/^M|^KM/.test(code)) return 'exception_modifier'
  if (/^SU/.test(code)) return 'condition_modifier'
  return 'traffic_sign'
}

const inferCategory = (code: string): string => {
  if (/^M|^KM/.test(code)) return 'exception_modifier'
  if (/^SU/.test(code)) return 'condition_modifier'
  if (/^A|^AK/.test(code)) return 'hazard_sign'
  if (/^B14|^B30|^B33|^B25|^B43|^C4a|^C4b/.test(code)) return 'speed'
  if (/^SI|^SC/.test(code)) return 'signpost'
  if (/^J|^K/.test(code)) return 'object_sign'
  return 'traffic_sign'
}

const extractBracketValue = (code: string) => {
  const match = code.match(/\[(\d+)\]/)
  return match?.[1]
}

const extractBaseSignId = (code: string) => {
  const bracketIndex = code.indexOf('[')
  return bracketIndex === -1 ? code : code.slice(0, bracketIndex)
}

const emitImageBlock = (row: CsvRow) => {
  if (!row.wikicommonsName.trim()) return `image: 'missing',`
  return `image: {
      kind: 'remote',
      sourceUrl: '${escapeString(wikiFileUrl(row.wikicommonsName))}',
      licence: 'Public Domain',
    },`
}

const emitSignObject = (row: CsvRow) => {
  const { code, label } = row
  const kind = inferKind(code)
  const category = inferCategory(code)
  const bracketValue = extractBracketValue(code)
  const signId = extractBaseSignId(code)
  const isSpeed = category === 'speed' && bracketValue

  const descriptiveNameLine =
    label && label !== code ? `    descriptiveName: '${escapeString(label)}',\n` : ''

  const tagRecommendations = isSpeed
    ? `tagRecommendationsByGeometry: sharedMaxspeedRecommendation('${bracketValue}'),`
    : `tagRecommendationsByGeometry: [{ geometries: ['way'] }],`

  const valuePromptLine = isSpeed
    ? `\n    valuePrompt: { prompt: 'Valeur', defaultValue: '${bracketValue}', format: 'integer' },`
    : ''

  const needsSharedImport = isSpeed

  return {
    needsSharedImport,
    text: `  {
    osmValuePart: '${escapeString(code)}',
    signId: '${escapeString(signId)}',
    name: '${escapeString(code)}',
${descriptiveNameLine}    description: null,
    kind: '${kind}',
    ${tagRecommendations}${valuePromptLine}
    catalogue: { signCategory: '${category}' },
    ${emitImageBlock(row)}
  }`,
  }
}

const ensureSharedImport = (content: string) => {
  const importLine =
    "import { sharedMaxspeedRecommendation } from '../../sharedRecommendationPresets.js'"
  if (content.includes('sharedMaxspeedRecommendation')) return content
  return content.replace(/^(import type \{ SignType \}[^\n]+\n)/, `$1${importLine}\n`)
}

const appendToFile = async (fileName: string, entries: string[], needsSharedImport: boolean) => {
  const filePath = path.join(FR_DATA_DIR, fileName)
  let content: string
  if (await Bun.file(filePath).exists()) {
    content = await Bun.file(filePath).text()
    if (needsSharedImport) content = ensureSharedImport(content)
    const closingBrace = content.lastIndexOf('\n  },\n]')
    if (closingBrace !== -1) {
      content = content.replace(/\n]\n$/, `,\n${entries.join(',\n')}\n]\n`)
    } else {
      content = content.replace(/\n]\n$/, `\n${entries.join(',\n')}\n]\n`)
    }
  } else {
    const imports = needsSharedImport
      ? `import { sharedMaxspeedRecommendation } from '../../sharedRecommendationPresets.js'\nimport type { SignType } from '../../TrafficSignDataTypes.js'`
      : `import type { SignType } from '../../TrafficSignDataTypes.js'`
    const exportName = `_${fileName.replace('.ts', '')}`
    content = `${imports}\n\nexport const ${exportName}: SignType[] = [\n${entries.join(',\n')}\n]\n`
  }
  await Bun.write(filePath, content)
  console.log(`  ${entries.length} signs -> ${fileName}`)
}

const updateAggregator = async (newFiles: string[]) => {
  let content = await Bun.file(FR_AGGREGATOR).text()
  for (const fileName of newFiles) {
    const exportName = `_${fileName.replace('.ts', '')}`
    const importLine = `import { ${exportName} } from './data/${fileName.replace('.ts', '.js')}'`
    if (content.includes(importLine)) continue
    const lastImport = content.lastIndexOf("} from './data/")
    const insertAt = content.indexOf('\n', lastImport) + 1
    content = content.slice(0, insertAt) + importLine + '\n' + content.slice(insertAt)
    const spreadLine = `  ...${exportName},`
    const lastSpread = content.lastIndexOf('  ...')
    const spreadInsertAt = content.indexOf('\n', lastSpread) + 1
    content = content.slice(0, spreadInsertAt) + spreadLine + '\n' + content.slice(spreadInsertAt)
  }
  await Bun.write(FR_AGGREGATOR, content)
}

const main = async () => {
  console.log('Fetching CSV...')
  const response = await fetch(CSV_URL)
  if (!response.ok) throw new Error(`Failed to fetch CSV: ${response.status}`)
  const csvText = await response.text()
  const rows = parseCsv(csvText)
  const registered = await readRegisteredCodes()

  const missing = rows.filter((row) => !registered.has(row.code))
  console.log(
    `CSV: ${rows.length} signs, registered: ${registered.size}, missing: ${missing.length}`,
  )
  if (missing.length === 0) {
    console.log('Nothing to import.')
    return
  }

  const byFile = new Map<string, { text: string; needsSharedImport: boolean }[]>()
  for (const row of missing) {
    const fileName = inferTargetFile(row.code)
    const emitted = emitSignObject(row)
    if (!byFile.has(fileName)) byFile.set(fileName, [])
    byFile.get(fileName)!.push(emitted)
  }

  const newFiles: string[] = []
  for (const [fileName, entries] of [...byFile.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const filePath = path.join(FR_DATA_DIR, fileName)
    if (!(await Bun.file(filePath).exists())) newFiles.push(fileName)
    await appendToFile(
      fileName,
      entries.map((e) => e.text),
      entries.some((e) => e.needsSharedImport),
    )
  }

  if (newFiles.length) await updateAggregator(newFiles)
  console.log(`Imported ${missing.length} signs (${newFiles.length} new files)`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

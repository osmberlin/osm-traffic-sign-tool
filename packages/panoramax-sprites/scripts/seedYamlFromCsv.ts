/**
 * One-off seed: convert the original Panoramax classes CSV into the YAML source of
 * truth (`src/registry/panoramax-classes.yaml`). After seeding, the YAML is the
 * hand-editable source of truth and this script is only needed to re-import a fresh CSV.
 *
 * The country is taken from the CSV *column*, so any per-cell prefix (`DE:`, or the
 * `Fr:` typo in the source) is stripped — we store the bare code.
 *
 * Run: `bun run seed:yaml`
 */
import { join } from 'node:path'

const HERE = import.meta.dir
const CSV_PATH = join(HERE, 'panoramax-classes.source.csv')
const YAML_PATH = join(HERE, '..', 'src', 'registry', 'panoramax-classes.yaml')

const COUNTRIES = ['DE', 'FR', 'NL', 'CH', 'BE'] as const

/** Minimal RFC-4180-ish parser: handles the single quoted field in the source (`"DE:314,1044-10"`). */
function parseCsvLine(line: string): string[] {
  const out: string[] = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
      continue
    }
    if (ch === ',' && !inQuotes) {
      out.push(cur)
      cur = ''
      continue
    }
    cur += ch
  }
  out.push(cur)
  return out
}

/** Strip a leading 2-letter country prefix (`DE:`, `Fr:`) — the column already tells us the country. */
function stripCountryPrefix(cell: string): string {
  return cell.replace(/^[A-Za-z]{2}:/, '').trim()
}

const csv = (await Bun.file(CSV_PATH).text()).trim().split('\n')
const header = parseCsvLine(csv[0]!).map((h) => h.trim())
// header: YOLO,DE,FR,NL,CH,BE
const colIndex = Object.fromEntries(COUNTRIES.map((c) => [c, header.indexOf(c)])) as Record<
  (typeof COUNTRIES)[number],
  number
>

type Entry = { yolo: string } & Partial<Record<(typeof COUNTRIES)[number], string>>
const entries: Entry[] = []

for (let i = 1; i < csv.length; i++) {
  const line = csv[i]
  if (!line || !line.trim()) continue
  const cells = parseCsvLine(line)
  const yolo = cells[0]?.trim()
  if (!yolo) continue
  const entry: Entry = { yolo }
  for (const country of COUNTRIES) {
    const raw = cells[colIndex[country]]?.trim() ?? ''
    if (!raw) continue
    entry[country] = stripCountryPrefix(raw)
  }
  entries.push(entry)
}

const banner = `# Panoramax traffic-sign detection classes — SOURCE OF TRUTH (hand-editable).
#
# One entry per detection class (YOLO/semantic key) with the bare per-country sign codes.
# The country is the object key; the value is the sign id WITHOUT the country prefix
# (e.g. \`DE: "222-10"\` reconstructs the OSM value \`DE:222-10\`).
# All values are quoted strings so codes with \`:\`, \`,\` or numeric-looking ids
# (e.g. \`CH: "2.35"\`, \`DE: "314,1044-10"\`) stay intact.
#
# Seeded from ./scripts/panoramax-classes.source.csv via \`bun run seed:yaml\`.
# After seeding, edit THIS file (not the CSV). Then run \`bun run generate\`.
`

/** Double-quote every scalar so YAML never re-interprets a code (colons, commas, numbers). */
const q = (s: string) => `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`

const toBlockYaml = (rows: Entry[]) =>
  rows
    .map((row) => {
      const lines = [`- yolo: ${q(row.yolo)}`]
      for (const country of COUNTRIES) {
        const value = row[country]
        if (value !== undefined) lines.push(`  ${country}: ${q(value)}`)
      }
      return lines.join('\n')
    })
    .join('\n')

const yaml = `${banner}\n${toBlockYaml(entries)}\n`
await Bun.write(YAML_PATH, yaml)

// Sanity: round-trip must reproduce the same entries (guards the comma/colon cases).
const roundTrip = Bun.YAML.parse(yaml) as Entry[]
if (roundTrip.length !== entries.length) {
  throw new Error(`Round-trip length mismatch: ${roundTrip.length} !== ${entries.length}`)
}
const disabled = roundTrip.find((e) => e.yolo === 'parking:disabled')
if (disabled?.DE !== '314,1044-10') {
  throw new Error(`Round-trip failed for comma value, got DE=${JSON.stringify(disabled?.DE)}`)
}
console.log(`Wrote ${entries.length} entries to ${YAML_PATH} (round-trip OK)`)

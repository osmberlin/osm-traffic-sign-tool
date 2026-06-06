import { glob } from 'node:fs/promises'
/**
 * Patch descriptiveName in split catalogue files from a wiki snapshot.
 * Run: bun script-patch-catalogue-names.ts <CC>
 */
import path from 'node:path'

const countryPrefix = process.argv[2]
if (!countryPrefix) {
  console.error('Usage: bun script-patch-catalogue-names.ts <CC>')
  process.exit(1)
}

const snapshotPath = path.join(
  import.meta.dir,
  '../internal_wiki/src/data',
  `trafficSignsWiki_${countryPrefix}.json`,
)
const dataDir = path.join(
  import.meta.dir,
  '../traffic-sign-converter/src/data-definitions',
  countryPrefix,
  'data',
)

type WikiSign = { sign: string; name: string }

const snapshot: WikiSign[] = JSON.parse(await Bun.file(snapshotPath).text())
const nameByOsmValuePart = new Map(
  snapshot.map((entry) => [entry.sign.replace(`${countryPrefix}:`, ''), entry.name]),
)

const escapeString = (value: string) => value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

let patched = 0
let unchanged = 0

const descriptiveNamePattern =
  /osmValuePart: '([^']+)'([\s\S]*?descriptiveName:\s*)(?:'(?:\\'|[^'])*'|\n\s*'(?:\\'|[^'])*')/g

for await (const filePath of glob('*.ts', { cwd: dataDir })) {
  const absolutePath = path.join(dataDir, filePath)
  let content = await Bun.file(absolutePath).text()
  const original = content

  content = content.replace(
    descriptiveNamePattern,
    (match, osmValuePart: string, prefix: string) => {
      const newName = nameByOsmValuePart.get(osmValuePart)
      if (!newName) return match
      return `osmValuePart: '${osmValuePart}'${prefix}'${escapeString(newName)}'`
    },
  )

  if (content !== original) {
    await Bun.write(absolutePath, content)
    patched++
    console.log(`Patched ${filePath}`)
  } else {
    unchanged++
  }
}

console.log(`Done: ${patched} files patched, ${unchanged} unchanged`)

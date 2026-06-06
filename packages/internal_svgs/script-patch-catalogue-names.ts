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
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const descriptiveNameValue =
  "(?:'(?:\\\\'|[^'])*'|\"[^\"]*\"|\\n\\s*'(?:\\\\'|[^'])*'|\\n\\s*\"[^\"]*\")"

let patchedFiles = 0
let unchangedFiles = 0
let patchedNames = 0

for await (const filePath of glob('*.ts', { cwd: dataDir })) {
  const absolutePath = path.join(dataDir, filePath)
  let content = await Bun.file(absolutePath).text()
  const original = content
  let filePatchedNames = 0

  const signBlockPattern = /\n  \{[\s\S]*?\n  \},?/g
  content = content.replace(signBlockPattern, (block) => {
    const idMatch = block.match(/osmValuePart: '([^']+)'/)
    if (!idMatch) return block
    const newName = nameByOsmValuePart.get(idMatch[1]!)
    if (!newName) return block

    const descriptiveNameMatches = block.match(/descriptiveName:/g)
    if (!descriptiveNameMatches) return block

    let updated = block.replace(
      /descriptiveName:\s*(?:'(?:\\'|[^'])*'|"[^"]*"|\n\s*'(?:\\'|[^'])*'|\n\s*"[^"]*")/,
      `descriptiveName: '${escapeString(newName)}'`,
    )
    updated = updated.replace(/\n\s*descriptiveName:\s*[^\n]+/g, '')
    if (updated === block) return block
    filePatchedNames++
    return updated
  })

  if (content !== original) {
    await Bun.write(absolutePath, content)
    patchedFiles++
    patchedNames += filePatchedNames
    console.log(`Patched ${filePath} (${filePatchedNames} names)`)
  } else {
    unchangedFiles++
  }
}

console.log(
  `Done: ${patchedFiles} files patched (${patchedNames} names), ${unchangedFiles} unchanged`,
)

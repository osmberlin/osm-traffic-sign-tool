/**
 * Remove descriptiveName when it duplicates signId or name (DE catalogue convention:
 * name = sign code label, descriptiveName = human-readable text only when distinct).
 *
 * Run: bun script-strip-redundant-descriptive-names.ts [CC...]
 * Without args, processes all country data directories plus DE/trafficSignDataDE.ts.
 */
import { glob } from 'node:fs/promises'
import path from 'node:path'

const countryArgs = process.argv.slice(2)

const parseSingleQuotedField = (block: string, field: string): string | null => {
  const inline = block.match(new RegExp(`${field}:\\s*'((?:\\\\'|[^'])*)'`))
  if (inline) return inline[1]!.replace(/\\'/g, "'")
  const multiline = block.match(new RegExp(`${field}:\\s*\\n\\s*'((?:\\\\'|[^'])*)'`))
  if (multiline) return multiline[1]!.replace(/\\'/g, "'")
  return null
}

const stripRedundantInFile = async (absolutePath: string) => {
  let content = await Bun.file(absolutePath).text()
  const original = content
  let stripped = 0

  const signBlockPattern = /\n  \{[\s\S]*?\n  \},?/g
  content = content.replace(signBlockPattern, (block) => {
    if (!block.includes('descriptiveName:')) return block

    const signId = parseSingleQuotedField(block, 'signId')
    const name = parseSingleQuotedField(block, 'name')
    const descriptiveName = parseSingleQuotedField(block, 'descriptiveName')
    if (!descriptiveName) return block

    if (descriptiveName !== signId && descriptiveName !== name) return block

    stripped++
    return block
      .replace(/\n\s*descriptiveName:\s*'(?:\\'|[^'])*',?/, '')
      .replace(/\n\s*descriptiveName:\s*\n\s*'(?:\\'|[^'])*',?/, '')
  })

  if (content !== original) {
    await Bun.write(absolutePath, content)
    console.log(`Stripped ${stripped} in ${path.basename(absolutePath)}`)
  }

  return stripped
}

const dataDefinitionsDir = path.join(
  import.meta.dir,
  '../traffic-sign-converter/src/data-definitions',
)

let total = 0

if (countryArgs.length === 0) {
  countryArgs.push('DE', 'FR', 'AT', 'AU', 'CA', 'BE', 'PL', 'BR')
}

for (const country of countryArgs) {
  const dataDir = path.join(dataDefinitionsDir, country, 'data')
  const aggregator = path.join(dataDefinitionsDir, country, `trafficSignData${country}.ts`)

  if (await Bun.file(aggregator).exists()) {
    total += await stripRedundantInFile(aggregator)
  }

  try {
    for await (const filePath of glob('*.ts', { cwd: dataDir })) {
      total += await stripRedundantInFile(path.join(dataDir, filePath))
    }
  } catch {
    // country has no split data dir
  }
}

console.log(`Done: stripped ${total} redundant descriptiveName fields`)

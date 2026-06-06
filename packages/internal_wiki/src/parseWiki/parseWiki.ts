/**
 * @deprecated Use `bun run wiki:generate DE` instead.
 * Legacy one-off parser kept for manual download + parse workflow.
 */
import path from 'node:path'
import * as cheerio from 'cheerio'
import { wikiSnapshotPath } from '../wikiSnapshotPaths.js'
import { dedupeWikiSigns, parseDeRowIdTable, toWikiSign } from './parseWikiTables.js'

const html = await Bun.file(
  path.join(import.meta.dirname, '../downloadWiki/tmp/wikipage.html'),
).text()
const $ = cheerio.load(html)

const rows = parseDeRowIdTable($)
const deduplicated = dedupeWikiSigns(
  rows
    .map((row) => toWikiSign('DE', row))
    .filter((sign): sign is NonNullable<typeof sign> => sign !== null),
)

console.log('Deduplicated objects:', deduplicated.length)

const outputPath = wikiSnapshotPath('DE', path.join(import.meta.dirname, '..'))
await Bun.write(outputPath, JSON.stringify(deduplicated, null, 2))

console.log('Parsed object saved to', outputPath)

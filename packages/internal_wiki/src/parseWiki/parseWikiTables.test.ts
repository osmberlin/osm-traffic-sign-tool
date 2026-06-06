import * as cheerio from 'cheerio'
import { describe, expect, test } from 'vitest'
import { extractDeTrafficSignValue, parseDeRowIdTable, toWikiSign } from './parseWikiTables.js'

const liveStyleRowHtml = `
<table>
  <tr id="Zeichen_103-10">
    <td><center><code>traffic_sign=DE:103-10</code></center></td>
    <td><ul><li>hazard=curve</li></ul></td>
    <td><big><b>Kurve links</b></big></td>
  </tr>
</table>`

const legacyRowHtml = `
<table>
  <tr id="Zeichen_103-10">
    <td><center><tt>traffic_sign=DE:103-10</tt></center></td>
    <td><ul><li>hazard=curve</li></ul></td>
    <td><big>Kurve links</big></td>
  </tr>
</table>`

describe('parseDeRowIdTable', () => {
  test('extracts sign value from modern <code> markup', () => {
    const $ = cheerio.load(liveStyleRowHtml)
    const row = $('tr').first()
    expect(extractDeTrafficSignValue(row)).toBe('DE:103-10')
  })

  test('extracts sign value from legacy <tt> markup', () => {
    const $ = cheerio.load(legacyRowHtml)
    const row = $('tr').first()
    expect(extractDeTrafficSignValue(row)).toBe('DE:103-10')
  })

  test('parses a live-style row into a wiki sign', () => {
    const $ = cheerio.load(liveStyleRowHtml)
    const [row] = parseDeRowIdTable($)
    expect(row?.signId).toBe('DE:103-10')
    expect(toWikiSign('DE', row!)).toMatchObject({
      sign: 'DE:103-10',
      name: 'Kurve links',
      osmTags: ['hazard=curve'],
    })
  })
})

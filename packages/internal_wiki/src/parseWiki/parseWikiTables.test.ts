import * as cheerio from 'cheerio'
import { describe, expect, test } from 'vitest'
import {
  cleanWikiSignName,
  extractDeTrafficSignValue,
  parseDeRowIdTable,
  parseUniversalTable,
  toWikiSign,
} from './parseWikiTables.js'

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

const atFahrradstrasseRowHtml = `
<table class="wikitable">
  <tbody>
    <tr>
      <td><a href="/wiki/File:Hinweiszeichen_26.svg"><img src="/thumb/Hinweiszeichen_26.svg"></a></td>
      <td>Als Linie mit traffic_sign=AT:53.26 highway=* bicycle_road=yes</td>
      <td><b>26: Fahrradstraße</b><p>Siehe: DE:Key:bicycle_road</p></td>
    </tr>
  </tbody>
</table>`

const atPannenbuchtRowHtml = `
<table class="wikitable">
  <tbody>
    <tr>
      <td><a href="/wiki/File:Hinweiszeichen_1c.svg"><img src="/thumb/Hinweiszeichen_1c.svg"></a></td>
      <td>Als Punkt/Linie/Fläche mit highway=emergency_bay</td>
      <td>1c: Pannenbucht</td>
    </tr>
  </tbody>
</table>`

describe('cleanWikiSignName', () => {
  test('removes Siehe references', () => {
    expect(cleanWikiSignName('26: Fahrradstraße Siehe: DE:Key:bicycle_road')).toBe(
      '26: Fahrradstraße',
    )
  })

  test('removes Notiz and Hinweis suffixes', () => {
    expect(cleanWikiSignName('14: Hupverbot Notiz: horn=no hat nur drei Verwendungen')).toBe(
      '14: Hupverbot',
    )
    expect(
      cleanWikiSignName(
        '16: Radweg Hinweis: Dieses Zeichen zeigt an, dass Lenker benützen dürfen.',
      ),
    ).toBe('16: Radweg')
  })
})

describe('parseUniversalTable', () => {
  test('uses the sign name column for AT wiki rows', () => {
    const $ = cheerio.load(atFahrradstrasseRowHtml)
    const [row] = parseUniversalTable($, 'AT')
    expect(row?.name).toBe('26: Fahrradstraße')
  })

  test('does not use tagging instructions as the sign name', () => {
    const $ = cheerio.load(atPannenbuchtRowHtml)
    const [row] = parseUniversalTable($, 'AT')
    expect(row?.name).toBe('1c: Pannenbucht')
  })
})

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

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

const frM4bRowHtml = `
<table class="wikitable">
  <tbody>
    <tr>
      <td><a href="/wiki/File:France_road_sign_M4b.svg"><img src="/thumb/50px-France_road_sign_M4b.svg"></a></td>
      <td>M4b</td>
      <td>bus=*</td>
      <td>| Véhicules de transport en commun</td>
    </tr>
  </tbody>
</table>`

const frA1aRowHtml = `
<table class="wikitable">
  <tbody>
    <tr>
      <td><a href="/wiki/File:France_road_sign_A1a.svg"><img src="/thumb/France_road_sign_A1a.svg"></a></td>
      <td>traffic_sign=FR:A1a hazard=turn</td>
      <td>Remarques : Annonce de virage</td>
    </tr>
  </tbody>
</table>`

const frC1aRowHtml = `
<table class="wikitable">
  <tbody>
    <tr>
      <td><a href="/wiki/File:France_road_sign_C1a.svg"><img src="/thumb/France_road_sign_C1a.svg"></a></td>
      <td>Sur un node ou une aire fermée par un way (ou plusieurs inclus dans une relation) avec : *</td>
      <td>C1a</td>
    </tr>
  </tbody>
</table>`

const frSi1bRowHtml = `
<table class="wikitable">
  <tbody>
    <tr>
      <td>SI1b</td>
      <td>Direction interdite aux véhicules de transport de marchandises dont le poids total autorisé en charge ou le poids total roulant autorisé excède le nombre indiqué</td>
      <td>destination:access:maxweightrating:goods=5.5</td>
    </tr>
  </tbody>
</table>`

const frSc1bRowHtml = `
<table class="wikitable">
  <tbody>
    <tr>
      <td>SC1b</td>
      <td>Direction conseillée aux véhicules de transport de marchandises dont le poids total autorisé en charge ou le poids total roulant autorisé excède le nombre indiqué</td>
      <td>destination:access:goods:conditional=designated @ (weightrating > 5.5)</td>
    </tr>
  </tbody>
</table>`

const plA1RowHtml = `
<table class="wikitable">
  <tbody>
    <tr>
      <td><a href="/wiki/File:PL_road_sign_A-1.svg"><img src="/thumb/PL_road_sign_A-1.svg"></a></td>
      <td>Na linii na odcinku drogi obejmującym niebezpieczny zakręt:hazard=curve</td>
      <td>A-1: niebezpieczny zakręt w prawo</td>
    </tr>
  </tbody>
</table>`

const frSu1RowHtml = `
<table class="wikitable">
  <tbody>
    <tr>
      <td><a href="/wiki/File:France_road_sign_SU1.svg"><img src="/thumb/50px-France_road_sign_SU1.svg"></a></td>
      <td>50px</td>
      <td>traffic_sign=FR:SU1</td>
      <td>Symbole de déviation</td>
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

  test('strips French Remarques prefix and Voir aussi suffixes', () => {
    expect(cleanWikiSignName('Remarques : Annonce de virage')).toBe('Annonce de virage')
    expect(
      cleanWikiSignName(
        "Remarques : Chaussée rétrécie d'un côté. Voir aussi les panneaux B15 et C18",
      ),
    ).toBe("Chaussée rétrécie d'un côté.")
    expect(
      cleanWikiSignName('| Véhicules de marchandises | rowspan = 3 | Même remarque que M4a'),
    ).toBe('Véhicules de marchandises')
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

  test('uses the French M-panel name column', () => {
    const $ = cheerio.load(frM4bRowHtml)
    const [row] = parseUniversalTable($, 'FR')
    expect(row?.name).toBe('Véhicules de transport en commun')
  })

  test('strips Remarques prefix from French danger sign names', () => {
    const $ = cheerio.load(frA1aRowHtml)
    const [row] = parseUniversalTable($, 'FR')
    expect(row?.name).toBe('Annonce de virage')
  })

  test('falls back to sign id when French wiki row has no name cell', () => {
    const $ = cheerio.load(frC1aRowHtml)
    const [row] = parseUniversalTable($, 'FR')
    expect(row?.name).toBe('C1a')
  })

  test('does not use image dimension text as the sign name', () => {
    const $ = cheerio.load(frSu1RowHtml)
    const [row] = parseUniversalTable($, 'FR')
    expect(row?.name).toBe('Symbole de déviation')
  })

  test('uses the Polish sign name column instead of tagging text', () => {
    const $ = cheerio.load(plA1RowHtml)
    const [row] = parseUniversalTable($, 'PL')
    expect(row?.name).toBe('A-1: niebezpieczny zakręt w prawo')
  })

  test('uses long French SI sign names instead of destination tags', () => {
    const $ = cheerio.load(frSi1bRowHtml)
    const [row] = parseUniversalTable($, 'FR')
    expect(row?.name).toBe(
      'Direction interdite aux véhicules de transport de marchandises dont le poids total autorisé en charge ou le poids total roulant autorisé excède le nombre indiqué',
    )
    expect(row?.tagsText).toBe('destination:access:maxweightrating:goods=5.5')
  })

  test('picks destination modelling tags for French SI rows', () => {
    const $ = cheerio.load(`
<table class="wikitable"><tbody><tr>
  <td>SI3</td>
  <td>Direction interdite aux véhicules de transport en commun de personnes</td>
  <td>destination:access:bus=no</td>
</tr></tbody></table>`)
    const [row] = parseUniversalTable($, 'FR')
    expect(row?.name).toBe('Direction interdite aux véhicules de transport en commun de personnes')
    expect(row?.tagsText).toBe('destination:access:bus=no')
  })

  test('uses French SC sign names instead of conditional destination tags', () => {
    const $ = cheerio.load(frSc1bRowHtml)
    const [row] = parseUniversalTable($, 'FR')
    expect(row?.name).toBe(
      'Direction conseillée aux véhicules de transport de marchandises dont le poids total autorisé en charge ou le poids total roulant autorisé excède le nombre indiqué',
    )
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

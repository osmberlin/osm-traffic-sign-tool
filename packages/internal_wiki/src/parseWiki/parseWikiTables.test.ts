import * as cheerio from 'cheerio'
import { describe, expect, test } from 'vitest'
import {
  cleanWikiSignName,
  extractDeTrafficSignValue,
  extractTrafficSignId,
  normalizeWikiTagValue,
  parseDeRowIdTable,
  parseUniversalTable,
  parseWikiTags,
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

const auR1RowHtml = `
<table class="wikitable">
  <tbody>
    <tr>
      <td><a href="/wiki/File:Australia_road_sign_R1-1.svg"><img src="/thumb/Australia_road_sign_R1-1.svg"></a></td>
      <td>R1-1 Stop highway = stop</td>
      <td>R1-1: Stop</td>
    </tr>
    <tr>
      <td><a href="/wiki/File:Australia_road_sign_R2-2-L.svg"><img src="/thumb/Australia_road_sign_R2-2-L.svg"></a></td>
      <td>R2-2-L One Way highway = oneway</td>
      <td>R2-2-L: One Way</td>
    </tr>
  </tbody>
</table>`

describe('parseWikiTags', () => {
  describe('wiki Tag template 3= and || prefixes (AU R5-1)', () => {
    test('parses conditional maxstay values with spaces from rendered AU:R5-1 cell', () => {
      expect(parseWikiTags('maxstay:conditional=1 hour @ (Sa 09:00-12:00)')).toEqual([
        { key: 'maxstay:conditional', value: '1 hour @ (Sa 09:00-12:00)' },
      ])
    })

    test('strips 3= prefix from wikitext and rendered equals format', () => {
      expect(parseWikiTags('{{Tag|maxstay:conditional|3=1 hour @ (Sa 09:00-12:00)}}')).toEqual([
        { key: 'maxstay:conditional', value: '1 hour @ (Sa 09:00-12:00)' },
      ])
      expect(parseWikiTags('maxstay:conditional=3=1 hour @ (Sa 09:00-12:00)')).toEqual([
        { key: 'maxstay:conditional', value: '1 hour @ (Sa 09:00-12:00)' },
      ])
    })

    test('strips || prefix from wikitext and rendered equals format', () => {
      expect(parseWikiTags('{{Tag|maxspeed:conditional||40 @ (09:00-18:00)}}')).toEqual([
        { key: 'maxspeed:conditional', value: '40 @ (09:00-18:00)' },
      ])
      expect(parseWikiTags('maxspeed:conditional=||40 @ (09:00-18:00)')).toEqual([
        { key: 'maxspeed:conditional', value: '40 @ (09:00-18:00)' },
      ])
    })

    test('parses FR destination tags using || no-link prefix', () => {
      expect(parseWikiTags('{{Tag|destination:access:goods||no}}')).toEqual([
        { key: 'destination:access:goods', value: 'no' },
      ])
      expect(parseWikiTags('{{Tag|destination:access:maxweightrating:goods||5.5}}')).toEqual([
        { key: 'destination:access:maxweightrating:goods', value: '5.5' },
      ])
    })
  })

  describe('comma-separated tags in one segment (DE 1024-17)', () => {
    test('parses motor_vehicle and agricultural tags from DE wiki combination text', () => {
      expect(parseWikiTags('motor_vehicle=no, agricultural=yes')).toEqual([
        { key: 'motor_vehicle', value: 'no' },
        { key: 'agricultural', value: 'yes' },
      ])
    })

    test('parses vehicle and agricultural tags separated by comma', () => {
      expect(parseWikiTags('vehicle=no, agricultural=yes')).toEqual([
        { key: 'vehicle', value: 'no' },
        { key: 'agricultural', value: 'yes' },
      ])
    })

    test('parses semicolon-separated hazard alternatives', () => {
      expect(parseWikiTags('hazard=curve; hazard=turn')).toEqual([
        { key: 'hazard', value: 'curve' },
        { key: 'hazard', value: 'turn' },
      ])
    })
  })

  describe('German oder-separated alternatives (AT priority signs)', () => {
    test('parses priority=forward oder priority=backward as separate tags', () => {
      expect(parseWikiTags('priority=forward oder priority=backward')).toEqual([
        { key: 'priority', value: 'forward' },
        { key: 'priority', value: 'backward' },
      ])
    })

    test('parses oder between plus-separated tag groups', () => {
      expect(parseWikiTags('maxspeed=30 + source:maxspeed=sign oder + maxspeed:type=sign')).toEqual(
        [
          { key: 'maxspeed', value: '30' },
          { key: 'source:maxspeed', value: 'sign' },
          { key: 'maxspeed:type', value: 'sign' },
        ],
      )
    })

    test('strips trailing und before the next key=value alternative', () => {
      expect(
        parseWikiTags(
          'maxspeed=130 und source:maxspeed=AT:motorway oder source:maxspeed=AT:trunk',
        ),
      ).toEqual([
        { key: 'maxspeed', value: '130' },
        { key: 'source:maxspeed', value: 'AT:motorway' },
        { key: 'source:maxspeed', value: 'AT:trunk' },
      ])
    })
  })

  describe('space-separated tags in one segment (FR A1a)', () => {
    test('parses hazard tag alongside skipped traffic_sign from rendered FR:A1a cell', () => {
      expect(parseWikiTags('traffic_sign=FR:A1a hazard=turn')).toEqual([
        { key: 'hazard', value: 'turn' },
      ])
    })

    test('parses multiple AU R4-246 speed tags separated by plus', () => {
      expect(parseWikiTags('maxspeed:hgv=40 + maxspeed:bus=40')).toEqual([
        { key: 'maxspeed:hgv', value: '40' },
        { key: 'maxspeed:bus', value: '40' },
      ])
    })

    test('parses AU R5-20 parking tags from rendered wiki cell', () => {
      expect(parseWikiTags('parking:side:access=no + parking:side:bus=designated')).toEqual([
        { key: 'parking:side:access', value: 'no' },
        { key: 'parking:side:bus', value: 'designated' },
      ])
    })
  })

  describe('equals inside conditionals (AU R6-17)', () => {
    test('parses AU R6-17 axle-group conditional from rendered wiki cell text', () => {
      expect(
        parseWikiTags(
          'bridge=yes + maxweight:conditional=X @ (axles=1); X @ (axles=2); X @ (axles=3)',
        ),
      ).toEqual([
        { key: 'bridge', value: 'yes' },
        {
          key: 'maxweight:conditional',
          value: 'X @ (axles=1); X @ (axles=2); X @ (axles=3)',
        },
      ])
    })

    test('parses AU R6-17 axle-group conditional from wiki Tag templates', () => {
      expect(
        parseWikiTags(
          '{{Tag|bridge|yes}} + {{Tag|maxweight:conditional|3=X @ (axles=1); X @ (axles=2); X @ (axles=3)}}',
        ),
      ).toEqual(
        expect.arrayContaining([
          { key: 'bridge', value: 'yes' },
          {
            key: 'maxweight:conditional',
            value: 'X @ (axles=1); X @ (axles=2); X @ (axles=3)',
          },
        ]),
      )
      expect(
        parseWikiTags(
          '{{Tag|bridge|yes}} + {{Tag|maxweight:conditional|3=X @ (axles=1); X @ (axles=2); X @ (axles=3)}}',
        ),
      ).toHaveLength(2)
    })

    test('parses FR SC1b destination conditional with comparison operator', () => {
      expect(
        parseWikiTags('destination:access:goods:conditional=designated @ (weightrating > 5.5)'),
      ).toEqual([
        {
          key: 'destination:access:goods:conditional',
          value: 'designated @ (weightrating > 5.5)',
        },
      ])
    })

    test('parses AU R9-1-1 restriction conditional from rendered wiki cell', () => {
      expect(
        parseWikiTags('restriction:conditional=restriction-value @ (Mo-Fr 07:00-09:30)'),
      ).toEqual([
        {
          key: 'restriction:conditional',
          value: 'restriction-value @ (Mo-Fr 07:00-09:30)',
        },
      ])
    })
  })

  describe('plain tags alongside wiki Tag templates', () => {
    test('parses AU R4-V105 school zone tags from rendered wiki cell text', () => {
      expect(
        parseWikiTags(
          'maxspeed:conditional=40 @ (Mo-Fr 08:00-09:30,14:30-16:00; PH off; SH off) + hazard=school_zone',
        ),
      ).toEqual([
        {
          key: 'maxspeed:conditional',
          value: '40 @ (Mo-Fr 08:00-09:30,14:30-16:00; PH off; SH off)',
        },
        { key: 'hazard', value: 'school_zone' },
      ])
    })

    test('parses AU R4-V105 school zone tags from wiki Tag templates', () => {
      expect(
        parseWikiTags(
          '{{Tag|maxspeed:conditional|3=40 @ (Mo-Fr 08:00-09:30,14:30-16:00; PH off; SH off)}} + {{Tag|hazard|school_zone}}',
        ),
      ).toEqual([
        {
          key: 'maxspeed:conditional',
          value: '40 @ (Mo-Fr 08:00-09:30,14:30-16:00; PH off; SH off)',
        },
        { key: 'hazard', value: 'school_zone' },
      ])
    })

    test('parses plain tags in the same segment as wiki Tag templates', () => {
      expect(parseWikiTags('{{Tag|bridge|yes}} maxspeed=10')).toEqual([
        { key: 'bridge', value: 'yes' },
        { key: 'maxspeed', value: '10' },
      ])
    })

    test('parses AU W5-V129 hazard and bridge tags from rendered wiki cell', () => {
      expect(parseWikiTags('hazard:conditional=slippery @ icy + bridge=yes')).toEqual([
        { key: 'hazard:conditional', value: 'slippery @ icy' },
        { key: 'bridge', value: 'yes' },
      ])
    })
  })
})

describe('normalizeWikiTagValue', () => {
  test('removes wiki no-link prefixes', () => {
    expect(normalizeWikiTagValue('3=yes')).toBe('yes')
    expect(normalizeWikiTagValue('||designated @ (Mo-Fr 06:00-10:00)')).toBe(
      'designated @ (Mo-Fr 06:00-10:00)',
    )
  })
})

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
    expect(toWikiSign('PL', row!)?.osmTags).toEqual(['hazard=curve'])
  })

  test('parses Polish geometry cell tags after the description colon', () => {
    const $ = cheerio.load(`
<table class="wikitable"><tbody><tr>
  <td><a href="/wiki/File:PL_road_sign_A-3.svg"><img src="/thumb/PL_road_sign_A-3.svg"></a></td>
  <td>Na linii na odcinku drogi obejmującym niebezpieczne zakręty:hazard=curves + curves=serpentine</td>
  <td>A-3: dwa niebezpieczne zakręty, pierwszy w prawo</td>
</tr></tbody></table>`)
    const [row] = parseUniversalTable($, 'PL')
    expect(toWikiSign('PL', row!)?.osmTags).toEqual(['hazard=curves', 'curves=serpentine'])
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

  test('parses space-separated FR A1a hazard tag from rendered wiki row', () => {
    const $ = cheerio.load(frA1aRowHtml)
    const [row] = parseUniversalTable($, 'FR')
    expect(toWikiSign('FR', row!)?.osmTags).toEqual(['hazard=turn'])
  })

  test('parses AU regulatory rows with full sign variant ids', () => {
    const $ = cheerio.load(auR1RowHtml)
    const rows = parseUniversalTable($, 'AU')

    expect(rows.map((row) => row.signId)).toEqual(['R1-1', 'R2-2-L'])
    expect(toWikiSign('AU', rows[0]!)).toMatchObject({
      sign: 'AU:R1-1',
    })
  })
})

describe('extractTrafficSignId', () => {
  test('extracts full AU variant codes from regulatory wiki row text', () => {
    expect(extractTrafficSignId('R1-1 Stop highway = stop', 'AU')).toBe('R1-1')
    expect(extractTrafficSignId('R2-2-L One Way highway = oneway', 'AU')).toBe('R2-2-L')
    expect(extractTrafficSignId('W6-1 Kangaroo hazard = animal_crossing', 'AU')).toBe('W6-1')
    expect(extractTrafficSignId('GE2-3 End road work', 'AU')).toBe('GE2-3')
    expect(extractTrafficSignId('TC9866 QLD animal crossing', 'AU')).toBe('TC9866')
  })

  test('prefers explicit traffic_sign values over abbreviated row text', () => {
    expect(extractTrafficSignId('traffic_sign=AU:G4-1 reassurance sign', 'AU')).toBe('G4-1')
    expect(extractTrafficSignId('Als Linie mit traffic_sign=AT:53.26 highway=*', 'AT')).toBe(
      '53.26',
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

  test('normalizes raw deOsmTags list items with trailing oder', () => {
    const sign = toWikiSign('AT', {
      signId: 'AT:8a',
      name: '8a: Autobahn',
      tagsText: '',
      isNa: false,
      deOsmTags: [
        'highway=motorway',
        'maxspeed=130 und',
        'source:maxspeed=AT:motorway oder',
        'maxspeed:type=AT:motorway',
      ],
    })

    expect(sign?.osmTags).toEqual([
      'highway=motorway',
      'maxspeed=130',
      'source:maxspeed=AT:motorway',
      'maxspeed:type=AT:motorway',
    ])
  })
})

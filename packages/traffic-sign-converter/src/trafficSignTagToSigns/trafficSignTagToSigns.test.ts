import { describe, expect, test } from 'vitest'
import {
  countryDefinitions,
  type CountryPrefixType,
} from '../data-definitions/countryDefinitions.js'
import { signsToTags } from '../signsToTags/signsToTags.js'
import { trafficSignTagToSigns } from './trafficSignTagToSigns.js'

const joinOsmValueParts = (signs: ReturnType<typeof trafficSignTagToSigns>) => {
  return signs.map((s) => s.osmValuePart).join('|')
}

const joinSignValueParts = (signs: ReturnType<typeof trafficSignTagToSigns>) => {
  return signs.map((s) => s.signValue).join('|')
}

describe('trafficSignTagToSigns()', () => {
  const countryPrefix: CountryPrefixType = 'DE'

  describe('handle tag key `*traffic_sign*`, handle country prefix', () => {
    test('handle full tag', () => {
      const input = 'traffic_sign=DE:237'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toMatch('237')
    })
    test('handle directional tag, 2 signs', () => {
      const input = 'sidewalk:right:traffic_sign:forward=DE:239,1022-10'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toMatch('239|1022-10')
    })
    test('do not handle other countries', () => {
      const input = 'sidewalk:right:traffic_sign:forward=AT:100'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toMatch('')
    })
  })

  test('sets `recognized` and the deprecated `recodgnizedSign`', () => {
    const [known, unknown] = trafficSignTagToSigns('DE:205;foo', countryPrefix)
    expect(known).toMatchObject({ recognized: true, recodgnizedSign: true })
    expect(unknown).toMatchObject({ recognized: false, recodgnizedSign: false })
  })

  describe('handle alternative keys`', () => {
    test('start sign 244', () => {
      const input = 'traffic_sign=DE:244'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toMatch('244.1')
      expect(result.map((s) => s.matchdByAlternativeKey).join('|')).toMatch('244')
      expect(joinSignValueParts(result)).toMatch('')
    })
    test('speed value 60km/h', () => {
      const input = 'traffic_sign=DE:274[60]'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toMatch('274-60')
      expect(result.map((s) => s.matchdByAlternativeKey).join('|')).toMatch('274[60]')
    })
    test('speed value 100km/h', () => {
      const input = 'traffic_sign=DE:274[100]'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toMatch('274-100')
      expect(result.map((s) => s.matchdByAlternativeKey).join('|')).toMatch('274[100]')
    })
    test('speed value 50km/h', () => {
      const input = 'traffic_sign=DE:274[50]'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toMatch('274-50')
      expect(result.map((s) => s.matchdByAlternativeKey).join('|')).toMatch('274[50]')
    })
    test('redirect 241 to 241-30', () => {
      const input = 'traffic_sign=DE:241'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toMatch('241-30')
      expect(result.map((s) => s.matchdByAlternativeKey).join('|')).toMatch('241')
    })
    test('redirect 242 to 242.1', () => {
      const input = 'traffic_sign=DE:242'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toMatch('242.1')
      expect(result.map((s) => s.matchdByAlternativeKey).join('|')).toMatch('242')
    })
    test('redirect 325 to 325.1', () => {
      const input = 'traffic_sign=DE:325'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toMatch('325.1')
      expect(result.map((s) => s.matchdByAlternativeKey).join('|')).toMatch('325')
    })

    // Bracket or dash notation per https://github.com/osmberlin/osm-traffic-sign-tool/issues/60#issuecomment-2563086843
    test.each([
      ['274.1[20]', '274.1-20'],
      ['274.2[20]', '274.2-20'],
      ['278[50]', '278-50'],
      ['275[30]', '275-30'],
      ['279[80]', '279-80'],
      ['394', '394-50'],
      ['262-7.5', '262[7.5]'],
      ['263-11.5', '263[11.5]'],
      ['264-2.2', '264[2.2]'],
      ['265-1.4', '265[1.4]'],
      ['265-5.5', '265[5.5]'],
      ['265-3.15', '265[3.15]'],
      ['266-12', '266[12]'],
      ['262-11', '262[11]'],
    ])('redirect %s to %s with the same tags', (alternativeKey, osmValuePart) => {
      const result = trafficSignTagToSigns(`DE:${alternativeKey}`, countryPrefix)
      expect(joinOsmValueParts(result)).toBe(osmValuePart)
      expect(result[0]?.matchdByAlternativeKey).toBe(alternativeKey)

      const canonical = trafficSignTagToSigns(`DE:${osmValuePart}`, countryPrefix)
      expect(signsToTags(result, countryPrefix, 'way')).toEqual(
        signsToTags(canonical, countryPrefix, 'way'),
      )
    })

    test('274.1[40] stays a Tempo 40 zone (274.1-40 is the double-sided Tempo 30 sign)', () => {
      const result = trafficSignTagToSigns('DE:274.1[40]', countryPrefix)
      expect(joinOsmValueParts(result)).toBe('274.1[40]')
      expect(signsToTags(result, countryPrefix, 'way').get('maxspeed')).toBe('40')
    })

    test('dash values of other signs are not redirected to brackets', () => {
      // 274 has a generic `274[47]` but uses the dash notation, and no `redirectDashValues`
      expect(joinOsmValueParts(trafficSignTagToSigns('DE:274-65', countryPrefix))).toBe('274-65')
      expect(joinOsmValueParts(trafficSignTagToSigns('DE:263-8', countryPrefix))).toBe('263[8]')
    })

    test('every DE redirect is unique and leads to a recognized sign', () => {
      const froms = countryDefinitions.DE.flatMap((sign) => sign.redirects ?? []).map(
        ({ from }) => from,
      )
      expect(froms.length).toBe(new Set(froms).size)
      for (const from of froms) {
        const [sign] = trafficSignTagToSigns(from, countryPrefix)
        expect(sign?.recognized, from).toBe(true)
        expect(sign?.matchdByAlternativeKey, from).toBe(from)
      }
    })
  })

  describe('handle signs with default value`', () => {
    // See also tests above for start sign, speed value
    test('time value', () => {
      const input = 'traffic_sign=DE:1040-31[08-11,16-18]'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toMatch('1040-31')
      expect(joinSignValueParts(result)).toMatch('08-11,16-18')
    })
  })

  describe('handle custom signValue|s`', () => {
    test('time value', () => {
      const input = 'traffic_sign=DE:1042-35[Mo,Tue 13-14]'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toMatch('1042-35')
      expect(joinSignValueParts(result)).toMatch('Mo,Tue 13-14')
    })
  })

  describe('preserve order`', () => {
    test('signs: no motor vehicle expect tractor but only 4t', () => {
      const input = 'traffic_sign=DE:260,1026-36;262[4]'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toMatch('260|1026-36|262[4]')
      expect(joinSignValueParts(result)).toMatch('4')
    })
  })

  describe('handle unkown signs`', () => {
    test('signs: no motor vehicle expect tractor but only 4t', () => {
      const input = 'traffic_sign=FOO;DE:260,BAR,1026-36;BAZ;262[4];FOO2'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toMatch('FOO|260|BAR|1026-36|BAZ|262[4]|FOO2')
      expect(joinSignValueParts(result)).toMatch('FOO||BAR||BAZ|4|FOO2')
      // TODO: Understand why this is green as well…
      // expect(joinSignValueParts(result)).toMatch('4')
    })
  })

  describe('special cases…', () => {
    test('traffic_sign=no', () => {
      const input = 'traffic_sign=no'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toMatch('none')
      expect(joinSignValueParts(result)).toMatch('none')
    })
  })

  describe('newly supported DE signs', () => {
    test('recognizes DE:350.1', () => {
      const result = trafficSignTagToSigns('traffic_sign=DE:350.1', countryPrefix)
      expect(result[0]?.recognized).toBe(true)
      expect(result[0]?.osmValuePart).toBe('350.1')
    })

    test('recognizes DE:350.2', () => {
      const result = trafficSignTagToSigns('traffic_sign=DE:350.2', countryPrefix)
      expect(result[0]?.recognized).toBe(true)
      expect(result[0]?.osmValuePart).toBe('350.2')
    })

    test('recognizes DE:274.1-20', () => {
      const result = trafficSignTagToSigns('traffic_sign=DE:274.1-20', countryPrefix)
      expect(result[0]?.recognized).toBe(true)
      expect(result[0]?.osmValuePart).toBe('274.1-20')
    })

    test('keeps DE:1020-10 unrecognized', () => {
      const result = trafficSignTagToSigns('traffic_sign=DE:1020-10', countryPrefix)
      expect(result[0]?.recognized).toBe(false)
      expect(result[0]?.svgName).toBe(null)
    })
  })

  describe('free-text signs', () => {
    test('parse free-text sign with quotes', () => {
      const input = 'traffic_sign=DE:244.1,"Kfz-Verkehr frei"'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toContain('"Kfz-Verkehr frei"')
      expect(result.some((s) => s.descriptiveName === 'Kfz-Verkehr frei')).toBe(true)
    })

    test('redirect variant "Kraftfahrzeuge-frei" to canonical form', () => {
      const input = 'traffic_sign=DE:244.1,Kraftfahrzeuge-frei'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toContain('"Kfz-Verkehr frei"')
      expect(result.some((s) => s.matchdByAlternativeKey === 'Kraftfahrzeuge-frei')).toBe(true)
    })

    test('redirect variant without quotes to canonical form with quotes', () => {
      const input = 'traffic_sign=DE:244.1,KFZ frei'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toContain('"Kfz-Verkehr frei"')
      expect(result.some((s) => s.matchdByAlternativeKey === 'KFZ frei')).toBe(true)
    })

    test('redirect is case-insensitive', () => {
      const input = 'traffic_sign=DE:244.1,kraftfahrzeuge-frei'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toContain('"Kfz-Verkehr frei"')
      expect(result.some((s) => s.matchdByAlternativeKey === 'kraftfahrzeuge-frei')).toBe(true)
    })

    test('redirect with different case variations', () => {
      const input = 'traffic_sign=DE:244.1,kfz FREI'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toContain('"Kfz-Verkehr frei"')
      expect(result.some((s) => s.matchdByAlternativeKey === 'kfz FREI')).toBe(true)
    })
  })
})

describe('trafficSignTagToSigns() FR bracket speed signs', () => {
  const countryPrefix: CountryPrefixType = 'FR'

  test('recognizes exact B14[50] variant', () => {
    const result = trafficSignTagToSigns('B14[50]', countryPrefix)
    expect(result[0]?.recognized).toBe(true)
    expect(result[0]?.osmValuePart).toBe('B14[50]')
  })

  test('recognizes imported B14[30] variant', () => {
    const result = trafficSignTagToSigns('B14[30]', countryPrefix)
    expect(result[0]?.recognized).toBe(true)
    expect(result[0]?.osmValuePart).toBe('B14[30]')
  })

  test('recognizes generic B14 placeholder', () => {
    const result = trafficSignTagToSigns('B14', countryPrefix)
    expect(result[0]?.recognized).toBe(true)
    expect(result[0]?.osmValuePart).toBe('B14')
  })
})

describe('trafficSignTagToSigns() FR value prompt panels', () => {
  const countryPrefix: CountryPrefixType = 'FR'

  test('M2 keeps a custom distance and the default SVG', () => {
    const result = trafficSignTagToSigns('M2[7]', countryPrefix)
    expect(result[0]?.recognized).toBe(true)
    expect(result[0]?.osmValuePart).toBe('M2[7]')
    expect(result[0]?.svgName).toBe('FR_M2__50__')
  })

  test('M9z keeps a custom free text and the default SVG', () => {
    const result = trafficSignTagToSigns('A14,M9z[Accotements dangereux]', countryPrefix)
    expect(result[1]?.recognized).toBe(true)
    expect(result[1]?.osmValuePart).toBe('M9z[Accotements dangereux]')
    expect(result[1]?.svgName).toBe('FR_M9z__Rappel__')
  })

  test('bare ids resolve to the default value', () => {
    const result = trafficSignTagToSigns('A14,M9z,M2', countryPrefix)
    expect(result.map((s) => s.osmValuePart)).toEqual(['A14', 'M9z[Rappel]', 'M2[50]'])
  })

  test('B17, B19 and B29 keep a custom inscription and the default SVG', () => {
    const result = trafficSignTagToSigns(
      'B17[50 m],B19[Baignade interdite],B29[Allumez vos feux]',
      countryPrefix,
    )
    expect(result.map((s) => [s.recognized, s.osmValuePart, s.svgName])).toEqual([
      [true, 'B17[50 m]', 'FR_B17__70_m__'],
      [true, 'B19[Baignade interdite]', 'FR_B19__Interdit_aux_motocyclistes__'],
      [true, 'B29[Allumez vos feux]', 'FR_B29__Allumez_vos_feux__'],
    ])
  })

  test('bare B17, B19 and B29 resolve to the default inscription', () => {
    const result = trafficSignTagToSigns('B17,B19,B29', countryPrefix)
    expect(result.map((s) => s.osmValuePart)).toEqual([
      'B17[70 m]',
      'B19[Interdit aux motocyclistes]',
      'B29[Allumez vos feux]',
    ])
  })

  test('A16 keeps a custom gradient and tags it as incline', () => {
    const signs = trafficSignTagToSigns('A16[14%]', countryPrefix)
    expect(signs[0]?.recognized).toBe(true)
    expect(signs[0]?.svgName).toBe('FR_A16__10___')
    expect(signsToTags(signs, countryPrefix, 'way').get('incline')).toBe('-14%')
  })

  test('ID idiograms join their destination symbols', () => {
    const signs = trafficSignTagToSigns('ID25,ID26a,ID25', countryPrefix)
    expect(signs.every((sign) => sign.recognized)).toBe(true)
    // Hotel and restaurant on one destination, as in the wiki example
    expect(signsToTags(signs, countryPrefix, 'way').get('destination:symbol')).toBe('lodging,food')
  })

  test('E location signs are recognized', () => {
    const signs = trafficSignTagToSigns('E32,E44', countryPrefix)
    expect(signs.map((sign) => [sign.recognized, sign.descriptiveName])).toEqual([
      [true, "Signalisation d'un cours d'eau"],
      [true, 'Cartouche réseau communal (voie communale ou chemin rural)'],
    ])
  })

  test('M9z free text does not imply a hazard tag', () => {
    const signs = trafficSignTagToSigns('M9z[Accotements dangereux]', countryPrefix)
    const tags = signsToTags(signs, countryPrefix, 'way')
    expect(tags.has('hazard')).toBe(false)
  })
})

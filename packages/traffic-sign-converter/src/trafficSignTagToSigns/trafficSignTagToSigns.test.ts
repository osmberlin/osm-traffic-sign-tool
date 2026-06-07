import { describe, expect, test } from 'vitest'
import type { CountryPrefixType } from '../data-definitions/countryDefinitions.js'
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

  describe('parking mapping signs', () => {
    const parkingSignIds = [
      '290',
      '314.1',
      '1024-20',
      '1040-32',
      '1040-33',
      '1044-10',
      '1044-11',
      '1044-30',
      '1050-32',
      '1051-33',
      '1053-31',
      '1053-31-1053-31',
      '1010-59',
      '1010-67',
    ] as const

    test.each(parkingSignIds)('recognizes DE:%s', (signId) => {
      const result = trafficSignTagToSigns(`traffic_sign=DE:${signId}`, countryPrefix)
      expect(result[0]?.recodgnizedSign).toBe(true)
    })

    test('redirects DE:314-1 to DE:314.1', () => {
      const result = trafficSignTagToSigns('traffic_sign=DE:314-1', countryPrefix)
      expect(result[0]?.recodgnizedSign).toBe(true)
      expect(result[0]?.osmValuePart).toBe('314.1')
      expect(result[0]?.matchdByAlternativeKey).toBe('314-1')
    })

    test('recognizes bracket value for DE:1040-32', () => {
      const result = trafficSignTagToSigns('traffic_sign=DE:1040-32[2 h]', countryPrefix)
      expect(result[0]?.recodgnizedSign).toBe(true)
      expect(result[0]?.osmValuePart).toMatch('1040-32')
      expect(result[0]?.signValue).toBe('2 h')
    })
  })

  describe('newly supported DE signs', () => {
    test('recognizes DE:350.1', () => {
      const result = trafficSignTagToSigns('traffic_sign=DE:350.1', countryPrefix)
      expect(result[0]?.recodgnizedSign).toBe(true)
      expect(result[0]?.osmValuePart).toBe('350.1')
    })

    test('recognizes DE:350.2', () => {
      const result = trafficSignTagToSigns('traffic_sign=DE:350.2', countryPrefix)
      expect(result[0]?.recodgnizedSign).toBe(true)
      expect(result[0]?.osmValuePart).toBe('350.2')
    })

    test('recognizes DE:274.1-20', () => {
      const result = trafficSignTagToSigns('traffic_sign=DE:274.1-20', countryPrefix)
      expect(result[0]?.recodgnizedSign).toBe(true)
      expect(result[0]?.osmValuePart).toBe('274.1-20')
    })

    test('keeps DE:1020-10 unrecognized', () => {
      const result = trafficSignTagToSigns('traffic_sign=DE:1020-10', countryPrefix)
      expect(result[0]?.recodgnizedSign).toBe(false)
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

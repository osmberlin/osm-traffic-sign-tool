import { describe, expect, test } from 'vitest'
import type { CountryPrefixesType } from '../data/countryPrefixes.js'
import { trafficSignTagToSigns } from './trafficSignTagToSigns.js'

const joinOsmValueParts = (signs: ReturnType<typeof trafficSignTagToSigns>) => {
  return signs.map((s) => s.osmValuePart).join('|')
}

describe('trafficSignTagToSigns()', () => {
  const countryPrefix: CountryPrefixesType = 'DE'

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
      expect(result.map((s) => s.signValue).join('|')).toMatch('')
    })
    test('speed value 60km/h', () => {
      const input = 'traffic_sign=DE:274-60'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toMatch('274[60]')
      expect(result.map((s) => s.matchdByAlternativeKey).join('|')).toMatch('274-60')
      expect(result.map((s) => s.signValue).join('|')).toMatch('60')
    })
    test.todo('speed value 100km/h', () => {
      const input = 'traffic_sign=DE:274-100'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toMatch('274[100]')
      expect(result.map((s) => s.matchdByAlternativeKey).join('|')).toMatch('274-100')
      expect(result.map((s) => s.signValue).join('|')).toMatch('100')
    })
  })

  describe('handle signs with default value`', () => {
    // See also tests above for start sign, speed value
    test('time value', () => {
      const input = 'traffic_sign=DE:1040-31[08-11,16-18]'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toMatch('1040-31')
      expect(result.map((s) => s.signValue).join('|')).toMatch('08-11,16-18')
    })
  })

  describe('handle custom signValue|s`', () => {
    test('time value', () => {
      const input = 'traffic_sign=DE:1042-35[Mo,Tue 13-14]'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toMatch('1042-35')
      expect(result.map((s) => s.signValue).join('|')).toMatch('Mo,Tue 13-14')
    })
  })

  describe('preserve order`', () => {
    test('signs: no motor vehicle expect tractor but only 4t', () => {
      const input = 'traffic_sign=DE:260,1026-36;262[4]'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toMatch('260|1026-36|262[4]')
      expect(result.map((s) => s.signValue).join('|')).toMatch('4')
    })
  })

  describe('handle unkown signs`', () => {
    test('signs: no motor vehicle expect tractor but only 4t', () => {
      const input = 'traffic_sign=FOO;DE:260,BAR,1026-36;BAZ;262[4];FOO2'
      const result = trafficSignTagToSigns(input, countryPrefix)
      expect(joinOsmValueParts(result)).toMatch('UNKOWN|260|UNKOWN|1026-36|UNKOWN|262[4]|UNKOWN')
      expect(result.map((s) => s.signValue).join('|')).toMatch('FOO||BAR||BAZ|4|FOO2')
      // TODO: Understand why this is green as well…
      // expect(result.map((s) => s.signValue).join('|')).toMatch('4')
    })
  })
})

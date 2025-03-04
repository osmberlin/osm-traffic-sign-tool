import { describe, expect, test } from 'vitest'
import type { CountryPrefixType } from '../data-definitions/countryDefinitions.js'
import type { SignStateType } from '../data-definitions/TrafficSignDataTypes.js'
import { signsToTrafficSignTagValue } from './signsToTrafficSignTagValue.js'

describe('signsToTrafficSignTag()', () => {
  const countryPrefixes = 'DE' satisfies CountryPrefixType

  test('no countryPrefixes => empty string', () => {
    const input = [{ osmValuePart: '333', kind: 'traffic_sign' }] as SignStateType[]
    const result = signsToTrafficSignTagValue(input, undefined)

    expect(result).toMatch('')
  })

  test('one key, primary category', () => {
    const input = [{ osmValuePart: '333', kind: 'traffic_sign' }] as SignStateType[]
    const result = signsToTrafficSignTagValue(input, countryPrefixes)

    expect(result).toMatch('DE:333')
  })

  test('one key, secondary category', () => {
    const input = [{ osmValuePart: '10-10', kind: 'condition_modifier' }] as SignStateType[]
    const result = signsToTrafficSignTagValue(input, countryPrefixes)

    expect(result).toMatch('DE:10-10')
  })

  test('two keys, both primary category', () => {
    const input = [
      { osmValuePart: '333', kind: 'traffic_sign' },
      { osmValuePart: '444', kind: 'traffic_sign' },
    ] as SignStateType[]
    const result = signsToTrafficSignTagValue(input, countryPrefixes)

    expect(result).toMatch('DE:333;444')
  })

  test('two keys, both secondary category', () => {
    const input = [
      { osmValuePart: '10-10', kind: 'condition_modifier' },
      { osmValuePart: '12-12', kind: 'exception_modifier' },
    ] as SignStateType[]
    const result = signsToTrafficSignTagValue(input, countryPrefixes)

    expect(result).toMatch('DE:10-10,12-12')
  })

  test('mixed case', () => {
    const input = [
      { osmValuePart: '333', kind: 'traffic_sign' },
      { osmValuePart: '10-10', kind: 'condition_modifier' },
      { osmValuePart: '12-12', kind: 'exception_modifier' },
      { osmValuePart: '444', kind: 'traffic_sign' },
      { osmValuePart: '555', kind: 'traffic_sign' },
      { osmValuePart: '13-13', kind: 'exception_modifier' },
    ] as SignStateType[]
    const result = signsToTrafficSignTagValue(input, countryPrefixes)

    expect(result).toMatch('DE:333,10-10,12-12;444;555,13-13')
  })

  describe('handle named values', () => {
    test('named value + sign', () => {
      const input = [
        { osmValuePart: 'city_limit', kind: 'traffic_sign' },
        { osmValuePart: '333', kind: 'traffic_sign' },
      ] as SignStateType[]
      const result = signsToTrafficSignTagValue(input, countryPrefixes)

      expect(result).toMatch('city_limit;DE:333')
    })

    test('sign + named value', () => {
      const input = [
        { osmValuePart: '333', kind: 'traffic_sign' },
        { osmValuePart: 'city_limit', kind: 'traffic_sign' },
      ] as SignStateType[]
      const result = signsToTrafficSignTagValue(input, countryPrefixes)

      expect(result).toMatch('DE:333;city_limit')
    })

    test('modifier sign + named value', () => {
      const input = [
        { osmValuePart: '1010-10', kind: 'exception_modifier' },
        { osmValuePart: 'city_limit', kind: 'traffic_sign' },
      ] as SignStateType[]
      const result = signsToTrafficSignTagValue(input, countryPrefixes)

      expect(result).toMatch('DE:1010-10;city_limit')
    })

    test('named value + modifier sign', () => {
      const input = [
        { osmValuePart: 'city_limit', kind: 'traffic_sign' },
        { osmValuePart: '1010-10', kind: 'exception_modifier' },
      ] as SignStateType[]
      const result = signsToTrafficSignTagValue(input, countryPrefixes)

      expect(result).toMatch('city_limit;DE:1010-10')
    })
  })
})

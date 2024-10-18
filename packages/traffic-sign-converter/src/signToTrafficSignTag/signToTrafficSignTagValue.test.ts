import { describe, expect, test } from 'vitest'
import type { CountryPrefixesType } from '../data/countryPrefixes.js'
import type { TrafficSignState } from '../data/types.js'
import { signToTrafficSignTagValue } from './signToTrafficSignTagValue.js'

describe('signToTrafficSignTag()', () => {
  const countryPrefixes = 'DE' satisfies CountryPrefixesType

  test('no countryPrefixes => empty string', () => {
    const input = [{ osmValuePart: '333', category: 'traffic_sign' }] as TrafficSignState[]
    const result = signToTrafficSignTagValue(input, undefined)

    expect(result).toMatch('')
  })

  test('one key, primary category', () => {
    const input = [{ osmValuePart: '333', category: 'traffic_sign' }] as TrafficSignState[]
    const result = signToTrafficSignTagValue(input, countryPrefixes)

    expect(result).toMatch('DE:333')
  })

  test('one key, secondary category', () => {
    const input = [{ osmValuePart: '10-10', category: 'modifier_sign' }] as TrafficSignState[]
    const result = signToTrafficSignTagValue(input, countryPrefixes)

    expect(result).toMatch('DE:10-10')
  })

  test('two keys, both primary category', () => {
    const input = [
      { osmValuePart: '333', category: 'traffic_sign' },
      { osmValuePart: '444', category: 'traffic_sign' },
    ] as TrafficSignState[]
    const result = signToTrafficSignTagValue(input, countryPrefixes)

    expect(result).toMatch('DE:333;444')
  })

  test('two keys, both secondary category', () => {
    const input = [
      { osmValuePart: '10-10', category: 'modifier_sign' },
      { osmValuePart: '12-12', category: 'modifier_sign_restriction' },
    ] as TrafficSignState[]
    const result = signToTrafficSignTagValue(input, countryPrefixes)

    expect(result).toMatch('DE:10-10,12-12')
  })

  test('mixed case', () => {
    const input = [
      { osmValuePart: '333', category: 'traffic_sign' },
      { osmValuePart: '10-10', category: 'modifier_sign' },
      { osmValuePart: '12-12', category: 'modifier_sign_restriction' },
      { osmValuePart: '444', category: 'traffic_sign' },
      { osmValuePart: '555', category: 'traffic_sign' },
      { osmValuePart: '13-13', category: 'modifier_sign_restriction' },
    ] as TrafficSignState[]
    const result = signToTrafficSignTagValue(input, countryPrefixes)

    expect(result).toMatch('DE:333,10-10,12-12;444;555,13-13')
  })
})

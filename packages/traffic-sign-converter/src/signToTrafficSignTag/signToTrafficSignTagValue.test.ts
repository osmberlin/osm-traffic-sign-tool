import { describe, expect, test } from 'vitest'
import type { CountryPrefixType } from '../data/countryPrefixes.js'
import type { SignStateType } from '../data/TrafficSignDataTypes.js'
import { signToTrafficSignTagValue } from './signToTrafficSignTagValue.js'

describe('signToTrafficSignTag()', () => {
  const countryPrefixes = 'DE' satisfies CountryPrefixType

  test('no countryPrefixes => empty string', () => {
    const input = [{ osmValuePart: '333', kind: 'traffic_sign' }] as SignStateType[]
    const result = signToTrafficSignTagValue(input, undefined)

    expect(result).toMatch('')
  })

  test('one key, primary category', () => {
    const input = [{ osmValuePart: '333', kind: 'traffic_sign' }] as SignStateType[]
    const result = signToTrafficSignTagValue(input, countryPrefixes)

    expect(result).toMatch('DE:333')
  })

  test('one key, secondary category', () => {
    const input = [{ osmValuePart: '10-10', kind: 'modifier_sign' }] as SignStateType[]
    const result = signToTrafficSignTagValue(input, countryPrefixes)

    expect(result).toMatch('DE:10-10')
  })

  test('two keys, both primary category', () => {
    const input = [
      { osmValuePart: '333', kind: 'traffic_sign' },
      { osmValuePart: '444', kind: 'traffic_sign' },
    ] as SignStateType[]
    const result = signToTrafficSignTagValue(input, countryPrefixes)

    expect(result).toMatch('DE:333;444')
  })

  test('two keys, both secondary category', () => {
    const input = [
      { osmValuePart: '10-10', kind: 'modifier_sign' },
      { osmValuePart: '12-12', kind: 'modifier_sign_restriction' },
    ] as SignStateType[]
    const result = signToTrafficSignTagValue(input, countryPrefixes)

    expect(result).toMatch('DE:10-10,12-12')
  })

  test('mixed case', () => {
    const input = [
      { osmValuePart: '333', kind: 'traffic_sign' },
      { osmValuePart: '10-10', kind: 'modifier_sign' },
      { osmValuePart: '12-12', kind: 'modifier_sign_restriction' },
      { osmValuePart: '444', kind: 'traffic_sign' },
      { osmValuePart: '555', kind: 'traffic_sign' },
      { osmValuePart: '13-13', kind: 'modifier_sign_restriction' },
    ] as SignStateType[]
    const result = signToTrafficSignTagValue(input, countryPrefixes)

    expect(result).toMatch('DE:333,10-10,12-12;444;555,13-13')
  })
})

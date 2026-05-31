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

  describe('free-text signs', () => {
    test('serialize free-text sign with quotes', () => {
      const input = [
        { osmValuePart: '244.1', kind: 'traffic_sign' },
        { osmValuePart: '"Kfz-Verkehr frei"', kind: 'exception_modifier' },
      ] as SignStateType[]
      const result = signsToTrafficSignTagValue(input, countryPrefixes)

      expect(result).toMatch('DE:244.1,"Kfz-Verkehr frei"')
    })
  })

  describe('time restriction plate format normalization', () => {
    test('normalizes 1040-30 hours to H-H in traffic_sign output', () => {
      const input = [
        { osmValuePart: '274-80', signId: '274-80', kind: 'traffic_sign', recodgnizedSign: true },
        {
          osmValuePart: '1040-30[06:00-18:00]',
          signId: '1040-30',
          signValue: '06:00-18:00',
          valuePrompt: { format: 'time_restriction' },
          kind: 'condition_modifier',
          recodgnizedSign: true,
        },
      ] as SignStateType[]
      const result = signsToTrafficSignTagValue(input, countryPrefixes)

      expect(result).toBe('DE:274-80,1040-30[6-18]')
    })

    test('normalizes 1040-30 minute values to H:MM-H:MM in traffic_sign output', () => {
      const input = [
        {
          osmValuePart: '1040-30[06:30-18:15]',
          signId: '1040-30',
          signValue: '06:30-18:15',
          valuePrompt: { format: 'time_restriction' },
          kind: 'condition_modifier',
          recodgnizedSign: true,
        },
      ] as SignStateType[]
      const result = signsToTrafficSignTagValue(input, countryPrefixes)

      expect(result).toBe('DE:1040-30[6:30-18:15]')
    })

    test('normalizes opening_hours prompt values in traffic_sign output', () => {
      const input = [
        {
          osmValuePart: '1042-31[Mo-Sa 08:00-11:00,16:00-18:00]',
          signId: '1042-31',
          signValue: 'Mo-Sa 08:00-11:00,16:00-18:00',
          valuePrompt: { format: 'opening_hours' },
          kind: 'condition_modifier',
          recodgnizedSign: true,
        },
      ] as SignStateType[]
      const result = signsToTrafficSignTagValue(input, countryPrefixes)

      expect(result).toBe('DE:1042-31[Mo-Sa 8-11,16-18]')
    })

    test('normalizes bracket payload when signValue is not present', () => {
      const input = [
        {
          osmValuePart: '1040-30[01:00-12:30]',
          signId: '1040-30',
          valuePrompt: { format: 'time_restriction' },
          kind: 'condition_modifier',
          recodgnizedSign: true,
        },
      ] as SignStateType[]
      const result = signsToTrafficSignTagValue(input, countryPrefixes)

      expect(result).toBe('DE:1040-30[1-12:30]')
    })
  })
})

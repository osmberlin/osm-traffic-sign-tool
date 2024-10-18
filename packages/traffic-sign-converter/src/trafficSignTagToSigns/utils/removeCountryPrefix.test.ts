import { describe, expect, test } from 'vitest'
import type { CountryPrefixesType } from '../../data/countryPrefixes.js'
import { removeCountryPrefix, removeCountryPrefixes } from './removeCountryPrefix.js'

describe('removeCountryPrefix()', () => {
  const countryPrefix = 'DE' satisfies CountryPrefixesType

  test('Primary sign "DE:123"', () => {
    const result = removeCountryPrefix('DE:123', countryPrefix)
    expect(result).toMatch('123')
  })

  test('Primary sign with value "DE:123[4.4]"', () => {
    const result = removeCountryPrefix('DE:123[4.4]', countryPrefix)
    expect(result).toMatch('123[4.4]')
  })

  test('Primary sign with value "de:123[4.4]"', () => {
    const result = removeCountryPrefix('de:123[4.4]', countryPrefix)
    expect(result).toMatch('123[4.4]')
  })

  test('Secondary sign "1234-56"', () => {
    const result = removeCountryPrefix('1234-56', countryPrefix)
    expect(result).toMatch('1234-56')
  })

  test('Secondary sign "DE:1234-56"', () => {
    const result = removeCountryPrefix('DE:1234-56', countryPrefix)
    expect(result).toMatch('1234-56')
  })

  test('Group"', () => {
    const result = removeCountryPrefix('DE:111,1234-56;222', countryPrefix)
    expect(result).toMatch('111,1234-56;222')
  })

  test('Tagging Error with multiple countryPrefix"', () => {
    const result = removeCountryPrefix('DE:111,DE:1234-56;DE:222', countryPrefix)
    expect(result).toMatch('111,1234-56;222')
  })
})

describe('removeCountryPrefixes()', () => {
  const countryPrefix = 'DE' satisfies CountryPrefixesType

  test('Primary sign "DE:123"', () => {
    const result = removeCountryPrefixes(['DE:123'], countryPrefix)
    expect(result).toMatchObject(['123'])
  })

  test('Primary sign with value "DE:123[4.4]"', () => {
    const result = removeCountryPrefixes(['DE:123[4.4]'], countryPrefix)
    expect(result).toMatchObject(['123[4.4]'])
  })

  test('Primary sign with value "de:123[4.4]"', () => {
    const result = removeCountryPrefixes(['de:123[4.4]'], countryPrefix)
    expect(result).toMatchObject(['123[4.4]'])
  })

  test('Secondary sign "1234-56"', () => {
    const result = removeCountryPrefixes(['1234-56'], countryPrefix)
    expect(result).toMatchObject(['1234-56'])
  })

  test('Secondary sign "DE:1234-56"', () => {
    const result = removeCountryPrefixes(['DE:1234-56'], countryPrefix)
    expect(result).toMatchObject(['1234-56'])
  })

  test('Group"', () => {
    const result = removeCountryPrefixes(['DE:111', '1234-56', '222'], countryPrefix)
    expect(result).toMatchObject(['111', '1234-56', '222'])
  })

  test('Tagging Error with multiple countryPrefix"', () => {
    const result = removeCountryPrefixes(['DE:111', 'DE:1234-56', 'DE:222'], countryPrefix)
    expect(result).toMatchObject(['111', '1234-56', '222'])
  })
})

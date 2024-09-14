import { describe, expect, test } from 'vitest'
import { buildUrlKey } from './buildUrlKey'

describe('buildUrlKey()', () => {
  test('Primary sign "DE:123"', () => {
    const result = buildUrlKey('DE:123', undefined)
    expect(result).toMatch('DE:123')
  })

  test('Primary sign with value "DE:123[4.4]"', () => {
    const result = buildUrlKey('DE:123', '4.4')
    expect(result).toMatch('DE:123[4.4]')
  })

  test('Secondary sign "1234-56"', () => {
    const result = buildUrlKey('1234-56', undefined)
    expect(result).toMatch('1234-56')
  })
})

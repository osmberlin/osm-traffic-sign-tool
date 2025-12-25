import { describe, expect, test } from 'vitest'
import { combineSignIdSignValue } from './combineSignIdSignValue.js'

describe('combineSignIdSignValue()', () => {
  test('Primary sign "DE:123"', () => {
    const result = combineSignIdSignValue('DE:123', undefined)
    expect(result).toMatch('123')
  })

  test('Primary sign with value "DE:123[4.4]"', () => {
    const result = combineSignIdSignValue('DE:123', '4.4')
    expect(result).toMatch('123[4.4]')
  })

  test('Secondary sign "1234-56"', () => {
    const result = combineSignIdSignValue('1234-56', undefined)
    expect(result).toMatch('1234-56')
  })

  test('Free-text sign (quoted)', () => {
    const result = combineSignIdSignValue('"Kfz-Verkehr frei"', undefined)
    expect(result).toMatch('"Kfz-Verkehr frei"')
  })
})

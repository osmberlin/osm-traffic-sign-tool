import { describe, expect, test } from 'vitest'
import { splitSignIdSignValue } from './splitSignIdSignValue.js'

describe('splitSignIdSignValue()', () => {
  test('Primary sign "123"', () => {
    const input = '123'
    const result = splitSignIdSignValue(input)
    expect(result).toMatchObject({ signId: '123', signValue: undefined })
  })

  test('Primary sign with value "123[4.4]"', () => {
    const input = '123[4.4]'
    const result = splitSignIdSignValue(input)
    expect(result).toMatchObject({ signId: '123', signValue: '4.4' })
  })

  test('Secondary sign "1234-56"', () => {
    const input = '1234-56'
    const result = splitSignIdSignValue(input)
    expect(result).toMatchObject({ signId: '1234-56', signValue: undefined })
  })

  test('Secondary sign "1234-56"', () => {
    const input = '1234-56'
    const result = splitSignIdSignValue(input)
    expect(result).toMatchObject({ signId: '1234-56', signValue: undefined })
  })
})

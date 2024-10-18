import { describe, expect, test } from 'vitest'
import { removeKeys } from './removeKeys.js'

describe('removeKeys()', () => {
  test('Primary', () => {
    const result = removeKeys('traffic_sign=foo')
    expect(result === 'foo').toBeTruthy()
  })

  test('Side Forward', () => {
    const result = removeKeys('traffic_sign:forward=foo')
    expect(result === 'foo').toBeTruthy()
  })

  test('Side Backward', () => {
    const result = removeKeys('traffic_sign:backward=foo')
    expect(result === 'foo').toBeTruthy()
  })

  test('Bicycle', () => {
    const result = removeKeys('bicycle:right:traffic_sign:right=foo')
    expect(result === 'foo').toBeTruthy()
  })

  test('Value with =', () => {
    const result = removeKeys('traffic_sign=some value with = sign')
    expect(result === 'some value with = sign').toBeTruthy()
  })

  test('Just value', () => {
    const result = removeKeys('foo')
    expect(result === 'foo').toBeTruthy()
  })

  test('Just value with =', () => {
    const result = removeKeys('some value with = sign')
    expect(result === 'some value with = sign').toBeTruthy()
  })

  test('Real tag', () => {
    const result = removeKeys('traffic_sign=DE:237')
    expect(result === 'DE:237').toBeTruthy()
  })
})

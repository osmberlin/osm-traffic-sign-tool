import { describe, expect, test } from 'vitest'
import { sortTags } from './sortTags.js'

describe('sortTags()', () => {
  test('sort keys', () => {
    const signs = new Map([
      ['golf_cart', 'somevalue'],
      ['highway', 'somevalue'],
      ['traffic_sign', 'somevalue'],
      ['hgv', 'somevalue'],
      ['hazard', 'somevalue'],
      ['something', 'somevalue'],
      ['winter_service', 'somevalue'],
    ])
    const result = sortTags(signs)
    expect(Array.from(result.keys())).toMatchObject([
      'highway',
      'hgv',
      'golf_cart',
      'hazard',
      'something',
      'winter_service',
      'traffic_sign',
    ])
  })
})

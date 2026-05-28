import { describe, expect, test } from 'vitest'
import { buildOsmWikiKeyUrl, buildOsmWikiTagUrl } from './buildOsmWikiUrl.js'

describe('buildOsmWikiUrl()', () => {
  test('builds key URL with country prefix', () => {
    expect(buildOsmWikiKeyUrl('DE', 'traffic_sign')).toBe(
      'https://wiki.openstreetmap.org/wiki/DE:Key:traffic_sign',
    )
  })

  test('builds tag URL with country prefix', () => {
    expect(buildOsmWikiTagUrl('DE', 'traffic_sign', '274.1')).toBe(
      'https://wiki.openstreetmap.org/wiki/DE:Tag:traffic_sign=274.1',
    )
  })
})

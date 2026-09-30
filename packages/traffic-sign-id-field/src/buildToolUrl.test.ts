import { describe, expect, it } from 'vitest'
import { buildToolUrl } from './buildToolUrl.js'

describe('buildToolUrl', () => {
  it('builds country page without signs param when tag value is empty', () => {
    expect(buildToolUrl({ countryPrefix: 'DE', tagValue: '' })).toBe(
      'https://trafficsigns.osm-verkehrswende.org/DE',
    )
  })

  it('encodes signs query param from tag value', () => {
    expect(buildToolUrl({ countryPrefix: 'DE', tagValue: 'DE:240;maxspeed' })).toBe(
      'https://trafficsigns.osm-verkehrswende.org/DE?signs=DE%3A240%3Bmaxspeed',
    )
  })
})

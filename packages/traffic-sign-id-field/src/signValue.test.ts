import { trafficSignTagToSigns, signsToTrafficSignTagValue } from '@osm-traffic-signs/converter'
import { describe, expect, it } from 'vitest'
import { parseTagToSigns, serializeSignsToTag } from './signValue.js'

const converter = { trafficSignTagToSigns, signsToTrafficSignTagValue }

describe('signValue', () => {
  it('round-trips a simple DE sign list', () => {
    const input = 'DE:240,1022-10'
    const signs = parseTagToSigns(converter, input, 'DE')
    expect(signs.length).toBeGreaterThan(0)
    expect(serializeSignsToTag(converter, signs, 'DE')).toBe(input)
  })

  it('round-trips named and coded signs', () => {
    const input = 'hazard;DE:240'
    const signs = parseTagToSigns(converter, input, 'DE')
    expect(serializeSignsToTag(converter, signs, 'DE')).toBe(input)
  })
})

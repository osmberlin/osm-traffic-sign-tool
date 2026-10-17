import { describe, expect, test } from 'vitest'
import { signsToTags } from '../../signsToTags/signsToTags.js'
import { hasBundledSvg } from '../../signSvgAvailability.js'
import { trafficSignTagToSigns } from '../../trafficSignTagToSigns/trafficSignTagToSigns.js'

describe('DE Zeichen 314.1 / 314.2 (renamed from 314-1 / 314-2)', () => {
  test('DE:314-1 redirects to 314.1', () => {
    const result = trafficSignTagToSigns('traffic_sign=DE:314-1', 'DE')
    expect(result).toHaveLength(1)
    expect(result[0]?.osmValuePart).toBe('314.1')
    expect(result[0]?.matchdByAlternativeKey).toBe('314-1')
  })

  test('DE:314-2 redirects to 314.2', () => {
    const result = trafficSignTagToSigns('traffic_sign=DE:314-2', 'DE')
    expect(result).toHaveLength(1)
    expect(result[0]?.osmValuePart).toBe('314.2')
    expect(result[0]?.matchdByAlternativeKey).toBe('314-2')
  })

  test('DE:314.1 and DE:314.2 have bundled SVG', () => {
    expect(hasBundledSvg('DE', '314.1')).toBe(true)
    expect(hasBundledSvg('DE', '314.2')).toBe(true)
  })
})

describe('DE Zeichen 290.1 / 290.2 (Beginn / Ende eines eingeschränkten Haltverbots für eine Zone)', () => {
  test('DE:290.1 and DE:290.2 are recognized with bundled SVG', () => {
    expect(trafficSignTagToSigns('traffic_sign=DE:290.1', 'DE')[0]?.osmValuePart).toBe('290.1')
    expect(trafficSignTagToSigns('traffic_sign=DE:290.2', 'DE')[0]?.osmValuePart).toBe('290.2')
    expect(hasBundledSvg('DE', '290.1')).toBe(true)
    expect(hasBundledSvg('DE', '290.2')).toBe(true)
  })
})

describe('DE Zeichen 310 / 311 (Ortstafel Vorderseite / Rückseite)', () => {
  test('DE:310 and DE:311 are recognized with bundled SVG', () => {
    expect(trafficSignTagToSigns('traffic_sign=DE:310', 'DE')[0]?.osmValuePart).toBe('310')
    expect(trafficSignTagToSigns('traffic_sign=DE:311', 'DE')[0]?.osmValuePart).toBe('311')
    expect(hasBundledSvg('DE', '310')).toBe(true)
    expect(hasBundledSvg('DE', '311')).toBe(true)
  })

  test('DE:310 on a node recommends city_limit=begin, DE:311 city_limit=end', () => {
    const begin = signsToTags(trafficSignTagToSigns('traffic_sign=DE:310', 'DE'), 'DE', 'node')
    expect(begin.get('city_limit')).toBe('begin')
    const end = signsToTags(trafficSignTagToSigns('traffic_sign=DE:311', 'DE'), 'DE', 'node')
    expect(end.get('city_limit')).toBe('end')
  })
})

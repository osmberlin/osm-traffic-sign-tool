import { describe, expect, test } from 'vitest'
import { trafficSignDataBR } from './data-definitions/BR/trafficSignDataBR.js'
import { hasBundledSvg, isSignSvgMissing, isSignSvgUnavailable } from './signSvgAvailability.js'

describe('isSignSvgMissing', () => {
  test('returns true for BR signs flagged as missing', () => {
    for (const osmValuePart of ['A-49a', 'A-49b', 'A-50a', 'A-50b']) {
      const sign = trafficSignDataBR.find((entry) => entry.osmValuePart === osmValuePart)
      expect(sign).toBeDefined()
      expect(isSignSvgMissing(sign!)).toBe(true)
    }
  })

  test('returns false for signs with bundled SVG', () => {
    const sign = trafficSignDataBR.find((entry) => entry.osmValuePart === 'A-48')
    expect(sign).toBeDefined()
    expect(isSignSvgMissing(sign!)).toBe(false)
  })
})

describe('hasBundledSvg', () => {
  test('returns false for BR signs without a loader', () => {
    expect(hasBundledSvg('BR', 'A-49a')).toBe(false)
  })

  test('returns true when an SVG loader exists', () => {
    expect(hasBundledSvg('BR', 'A-48')).toBe(true)
  })
})

describe('isSignSvgUnavailable', () => {
  test('covers wiki-missing signs without a bundled SVG', () => {
    const missingWiki = trafficSignDataBR.find((entry) => entry.osmValuePart === 'A-49a')!
    const bundled = trafficSignDataBR.find((entry) => entry.osmValuePart === 'A-48')!

    expect(isSignSvgUnavailable('BR', missingWiki)).toBe(true)
    expect(isSignSvgUnavailable('BR', bundled)).toBe(false)
  })
})

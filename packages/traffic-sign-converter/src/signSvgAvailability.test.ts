import { describe, expect, test } from 'vitest'
import { trafficSignDataBR } from './data-definitions/BR/trafficSignDataBR.js'
import { countries, countryDefinitions } from './data-definitions/countryDefinitions.js'
import { hasBundledSvg, isSignSvgMissing, isSignSvgUnavailable } from './signSvgAvailability.js'
import { trafficSignTagToSigns } from './trafficSignTagToSigns/trafficSignTagToSigns.js'

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

  test('uses svgName for custom bracket values when catalogue svgName is set', () => {
    expect(
      hasBundledSvg('DE', {
        osmValuePart: '1001-30[900]',
        svgName: 'DE_1001_30__800__',
      } as never),
    ).toBe(true)
  })

  test('resolves strings like the svgName of the parsed sign', () => {
    // No SVG of their own: they use the SVG of the catalogue sign they parse to
    expect(hasBundledSvg('DE', '1001-30[900]')).toBe(true)
    expect(hasBundledSvg('DE', '274.1[20]')).toBe(true)
    expect(hasBundledSvg('DE', '274.1[40]')).toBe(true)
    expect(hasBundledSvg('DE', '325.1[30]')).toBe(true)
    expect(hasBundledSvg('DE', '274[50]')).toBe(true)
    expect(hasBundledSvg('DE', 'unknown-sign')).toBe(false)
  })

  test('unrecognized values do not borrow the SVG of a sign with the same import name', () => {
    // `274-1` and `274.1` share the import name DE_274_1 (Tempo 30-Zone)
    expect(hasBundledSvg('DE', '274-1')).toBe(false)
    const [unknownSign] = trafficSignTagToSigns('274-1', 'DE')
    expect(unknownSign?.recognized).toBe(false)
    expect(hasBundledSvg('DE', unknownSign!)).toBe(false)
  })

  // Parses every catalogue sign of every country, which takes a few seconds
  test('a parsed sign and its osmValuePart resolve alike for every catalogue sign', () => {
    for (const countryPrefix of countries) {
      for (const catalogueSign of countryDefinitions[countryPrefix]) {
        const values = [
          catalogueSign.osmValuePart,
          ...(catalogueSign.redirects?.map(({ from }) => from) ?? []),
        ]
        for (const value of values) {
          for (const sign of trafficSignTagToSigns(value, countryPrefix)) {
            expect(
              hasBundledSvg(countryPrefix, sign.osmValuePart),
              `${countryPrefix}:${value} → ${sign.osmValuePart}`,
            ).toBe(hasBundledSvg(countryPrefix, sign))
          }
        }
      }
    }
  }, 20_000)
})

describe('isSignSvgUnavailable', () => {
  test('covers wiki-missing signs without a bundled SVG', () => {
    const missingWiki = trafficSignDataBR.find((entry) => entry.osmValuePart === 'A-49a')!
    const bundled = trafficSignDataBR.find((entry) => entry.osmValuePart === 'A-48')!

    expect(isSignSvgUnavailable('BR', missingWiki)).toBe(true)
    expect(isSignSvgUnavailable('BR', bundled)).toBe(false)
  })
})

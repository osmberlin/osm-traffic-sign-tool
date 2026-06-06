import { describe, expect, test } from 'vitest'
import { isSignImageMissing, isSignImageSource, normalizeSignImage } from './signImage.js'
import { transformToSignState } from './utils/transformToSignState.js'

describe('signImage', () => {
  test('detects missing image literal', () => {
    expect(isSignImageMissing('missing')).toBe(true)
    expect(isSignImageSource('missing')).toBe(false)
  })

  test('normalizes legacy availability flag to missing', () => {
    const legacy = {
      kind: 'remote' as const,
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Brasil_A-49a.svg',
      licence: 'Public Domain' as const,
      availability: 'missing' as const,
    }

    expect(isSignImageMissing(legacy)).toBe(true)
    expect(normalizeSignImage(legacy)).toBe('missing')
  })

  test('transformToSignState strips remote image metadata for missing signs', () => {
    const sign = {
      osmValuePart: 'A-49a',
      signId: 'A-49a',
      name: 'A-49a',
      description: null,
      kind: 'traffic_sign' as const,
      tagRecommendationsByGeometry: [{ geometries: ['way' as const], highwayValues: [] }],
      catalogue: { signCategory: 'hazard_sign' as const },
      image: 'missing' as const,
    }

    const state = transformToSignState('BR', sign)

    expect(state.image).toBe('missing')
    expect(state).not.toHaveProperty('sourceUrl')
  })
})

import { describe, expect, test } from 'vitest'
import { highwayClassQuestion } from './questionCatalog.js'
import type { SignType } from './TrafficSignDataTypes.js'
import { findHighwayClassCatalogueViolations } from './validateHighwayClassCatalogue.js'

const baseSign = {
  osmValuePart: 'test',
  signId: 'test',
  name: 'Test',
  descriptiveName: 'Test',
  description: null,
  catalogue: { signCategory: 'traffic_sign' as const },
  image: {
    kind: 'remote' as const,
    sourceUrl: 'https://example.com',
    licence: 'Public Domain' as const,
  },
  kind: 'traffic_sign' as const,
  tagRecommendationsByGeometry: [{ geometries: ['way'] }],
} satisfies SignType

describe('findHighwayClassCatalogueViolations', () => {
  test('flags signs that define both highwayClass question and catalogue highwayValues', () => {
    const sign: SignType = {
      ...baseSign,
      questions: [highwayClassQuestion(['path', 'cycleway'], 'path')],
      tagRecommendationsByGeometry: [{ geometries: ['way'], highwayValues: ['path'] }],
    }

    const violations = findHighwayClassCatalogueViolations('DE', [sign])

    expect(violations).toHaveLength(1)
    expect(violations[0]?.rule).toBe('highwayQuestionWithCatalogueHighwayValues')
  })

  test('flags stale multi-value modifier highwayValues without context', () => {
    const sign: SignType = {
      ...baseSign,
      osmValuePart: '1000-31',
      kind: 'exception_modifier',
      tagRecommendationsByGeometry: [
        {
          geometries: ['way'],
          highwayValues: ['path', 'cycleway'],
          uniqueTags: [{ key: 'oneway', value: 'no' }],
        },
      ],
    }

    const violations = findHighwayClassCatalogueViolations('DE', [sign])

    expect(violations).toHaveLength(1)
    expect(violations[0]?.rule).toBe('modifierMultiValueHighwayValuesWithoutContext')
  })

  test('allows modifiers with contextual multi-value highwayValues', () => {
    const sign: SignType = {
      ...baseSign,
      osmValuePart: '1020-30',
      kind: 'exception_modifier',
      tagRecommendationsByGeometry: [
        {
          geometries: ['way'],
          highwayValues: ['residential', 'service'],
          modifierValue: 'destination',
        },
      ],
    }

    expect(findHighwayClassCatalogueViolations('DE', [sign])).toEqual([])
  })
})

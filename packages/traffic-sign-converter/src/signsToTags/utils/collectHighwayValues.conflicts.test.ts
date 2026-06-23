import { describe, expect, test } from 'vitest'
import { HighwayClassCatalogueConflictError } from '../../data-definitions/validateHighwayClassCatalogue.js'
import { highwayClassQuestion } from '../../data-definitions/questionCatalog.js'
import type { SignStateType } from '../../data-definitions/TrafficSignDataTypes.js'
import {
  collectHighwayValues,
  findConflictingCatalogueHighwayContributors,
} from './collectHighwayValues.js'

const baseSign = {
  recodgnizedSign: true,
  svgName: 'test',
  osmValuePart: 'main',
  signId: 'main',
  name: 'Main',
  descriptiveName: 'Main',
  description: null,
  kind: 'traffic_sign' as const,
  tagRecommendationsByGeometry: [{ geometries: ['way'] }],
  catalogue: { signCategory: 'traffic_sign' as const },
  image: {
    kind: 'remote' as const,
    sourceUrl: 'https://example.com',
    licence: 'Public Domain' as const,
  },
} satisfies SignStateType

describe('collectHighwayValues highwayClass conflicts', () => {
  test('throws when a modifier still defines catalogue highwayValues', () => {
    const signs: SignStateType[] = [
      {
        ...baseSign,
        questions: [highwayClassQuestion(['path', 'cycleway'], 'path')],
      },
      {
        ...baseSign,
        osmValuePart: '1000-31',
        signId: '1000-31',
        kind: 'exception_modifier',
        tagRecommendationsByGeometry: [
          {
            geometries: ['way'],
            highwayValues: ['path', 'cycleway'],
            uniqueTags: [{ key: 'oneway', value: 'no' }],
          },
        ],
        catalogue: { signCategory: 'exception_modifier' },
      },
    ]

    expect(findConflictingCatalogueHighwayContributors(signs, 'way')).toEqual([
      {
        osmValuePart: '1000-31',
        highwayValues: ['path', 'cycleway'],
      },
    ])
    expect(() => collectHighwayValues(signs, 'way')).toThrow(HighwayClassCatalogueConflictError)
  })

  test('allows highwayClass groups when modifiers have no catalogue highwayValues', () => {
    const signs: SignStateType[] = [
      {
        ...baseSign,
        questions: [highwayClassQuestion(['path', 'cycleway'], 'path')],
      },
      {
        ...baseSign,
        osmValuePart: '1000-31',
        signId: '1000-31',
        kind: 'exception_modifier',
        tagRecommendationsByGeometry: [
          {
            geometries: ['way'],
            highwayValues: [],
            uniqueTags: [{ key: 'oneway', value: 'no' }],
          },
        ],
        catalogue: { signCategory: 'exception_modifier' },
      },
    ]

    expect(collectHighwayValues(signs, 'way')).toEqual([])
  })
})

import { describe, expect, test } from 'vitest'
import {
  classifyTaggingSuggestionsQa,
  countSignsByTaggingSuggestionsQa,
  filterSignsByTaggingSuggestionsQa,
  hasTagRecommendationsContent,
} from './taggingSuggestionsQa.js'
import type { SignType } from './TrafficSignDataTypes.js'

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
}

describe('taggingSuggestionsQa', () => {
  test('hasTagRecommendationsContent', () => {
    expect(hasTagRecommendationsContent([{ geometries: ['way'] }])).toBe(false)
    expect(hasTagRecommendationsContent([{ geometries: ['way'], accessTags: [] }])).toBe(false)
    expect(
      hasTagRecommendationsContent([
        { geometries: ['way'], accessTags: [{ key: 'a', value: 'b' }] },
      ]),
    ).toBe(true)
    expect(
      hasTagRecommendationsContent([{ geometries: ['way'], modifierValueFromValuePrompt: true }]),
    ).toBe(true)
  })

  test('classifyTaggingSuggestionsQa', () => {
    const withTags: SignType = {
      ...baseSign,
      kind: 'traffic_sign',
      tagRecommendationsByGeometry: [
        { geometries: ['way'], uniqueTags: [{ key: 'maxspeed', value: '30' }] },
      ],
    }
    const missing: SignType = {
      ...baseSign,
      kind: 'traffic_sign',
      tagRecommendationsByGeometry: [{ geometries: ['way'] }],
    }
    const explicit: SignType = {
      ...missing,
      tagRecommendationsByGeometry: 'none',
      taggingSuggestionsQa: 'none',
    }

    expect(classifyTaggingSuggestionsQa(withTags)).toBe('withSuggestions')
    expect(classifyTaggingSuggestionsQa(missing)).toBe('missingSuggestions')
    expect(classifyTaggingSuggestionsQa(explicit)).toBe('explicitNoSuggestions')
  })

  test('filter and count', () => {
    const signs: SignType[] = [
      {
        ...baseSign,
        kind: 'traffic_sign',
        tagRecommendationsByGeometry: [
          { geometries: ['way'], uniqueTags: [{ key: 'a', value: 'b' }] },
        ],
      },
      {
        ...baseSign,
        osmValuePart: 'b',
        kind: 'traffic_sign',
        tagRecommendationsByGeometry: [{ geometries: ['way'] }],
      },
      {
        ...baseSign,
        osmValuePart: 'c',
        kind: 'traffic_sign',
        tagRecommendationsByGeometry: 'none',
        taggingSuggestionsQa: 'none',
      },
    ]

    expect(filterSignsByTaggingSuggestionsQa(signs, 'missing').map((s) => s.osmValuePart)).toEqual([
      'b',
    ])
    expect(countSignsByTaggingSuggestionsQa(signs)).toEqual({
      all: 3,
      with: 1,
      missing: 1,
      explicit_none: 1,
    })
  })
})

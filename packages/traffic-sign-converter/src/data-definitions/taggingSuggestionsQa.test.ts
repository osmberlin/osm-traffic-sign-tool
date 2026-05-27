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
    expect(hasTagRecommendationsContent({})).toBe(false)
    expect(hasTagRecommendationsContent({ accessTags: [] })).toBe(false)
    expect(hasTagRecommendationsContent({ accessTags: [{ key: 'a', value: 'b' }] })).toBe(true)
    expect(hasTagRecommendationsContent({ modifierValueFromValuePrompt: true })).toBe(true)
  })

  test('classifyTaggingSuggestionsQa', () => {
    const withTags: SignType = {
      ...baseSign,
      kind: 'traffic_sign',
      tagRecommendations: { uniqueTags: [{ key: 'maxspeed', value: '30' }] },
    }
    const missing: SignType = {
      ...baseSign,
      kind: 'traffic_sign',
      tagRecommendations: {},
    }
    const explicit: SignType = {
      ...missing,
      tagRecommendations: 'none',
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
        tagRecommendations: { uniqueTags: [{ key: 'a', value: 'b' }] },
      },
      { ...baseSign, osmValuePart: 'b', kind: 'traffic_sign', tagRecommendations: {} },
      {
        ...baseSign,
        osmValuePart: 'c',
        kind: 'traffic_sign',
        tagRecommendations: 'none',
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

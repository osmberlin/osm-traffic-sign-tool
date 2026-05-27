import type { ModifierSignType, SignType, TrafficSignType } from './TrafficSignDataTypes.js'

export const taggingSuggestionsQaStatuses = ['explicit_none'] as const
export type TaggingSuggestionsQaStatus = (typeof taggingSuggestionsQaStatuses)[number]

export type TaggingSuggestionsQaCategory =
  | 'withSuggestions'
  | 'missingSuggestions'
  | 'explicitNoSuggestions'

export const taggingSuggestionsQaFilters = ['all', 'with', 'missing', 'explicit_none'] as const
export type TaggingSuggestionsQaFilter = (typeof taggingSuggestionsQaFilters)[number]

type TagRecommendations =
  | TrafficSignType['tagRecommendations']
  | ModifierSignType['tagRecommendations']

export const hasTagRecommendationsContent = (tagRecommendations: TagRecommendations): boolean =>
  Object.values(tagRecommendations).some((value) => {
    if (value === undefined) {
      return false
    }
    if (Array.isArray(value)) {
      return value.length > 0
    }
    if (typeof value === 'boolean') {
      return value
    }
    return true
  })

export const classifyTaggingSuggestionsQa = (sign: SignType): TaggingSuggestionsQaCategory => {
  if (hasTagRecommendationsContent(sign.tagRecommendations)) {
    return 'withSuggestions'
  }

  if (sign.taggingSuggestionsQa === 'explicit_none') {
    return 'explicitNoSuggestions'
  }

  return 'missingSuggestions'
}

export const matchesTaggingSuggestionsQaFilter = (
  sign: SignType,
  filter: TaggingSuggestionsQaFilter,
): boolean => {
  if (filter === 'all') {
    return true
  }

  const category = classifyTaggingSuggestionsQa(sign)

  switch (filter) {
    case 'with':
      return category === 'withSuggestions'
    case 'missing':
      return category === 'missingSuggestions'
    case 'explicit_none':
      return category === 'explicitNoSuggestions'
    default:
      return true
  }
}

export const filterSignsByTaggingSuggestionsQa = (
  signs: SignType[],
  filter: TaggingSuggestionsQaFilter,
): SignType[] => signs.filter((sign) => matchesTaggingSuggestionsQaFilter(sign, filter))

export type TaggingSuggestionsQaCounts = Record<TaggingSuggestionsQaFilter, number>

export const countSignsByTaggingSuggestionsQa = (signs: SignType[]): TaggingSuggestionsQaCounts => {
  const counts: TaggingSuggestionsQaCounts = {
    all: signs.length,
    with: 0,
    missing: 0,
    explicit_none: 0,
  }

  for (const sign of signs) {
    const category = classifyTaggingSuggestionsQa(sign)
    if (category === 'withSuggestions') {
      counts.with++
    } else if (category === 'missingSuggestions') {
      counts.missing++
    } else {
      counts.explicit_none++
    }
  }

  return counts
}

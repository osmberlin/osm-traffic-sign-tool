import type {
  OptionalTagGuidance,
  OptionalTagsRecommendation,
  TagRecommendationTag,
} from '../../data-definitions/TrafficSignDataTypes.js'

export const normalizeOptionalTags = (
  optionalTags: OptionalTagsRecommendation | undefined,
): { tags: TagRecommendationTag[]; guidance?: OptionalTagGuidance } => {
  if (!optionalTags) {
    return { tags: [] }
  }

  if (Array.isArray(optionalTags)) {
    return { tags: optionalTags }
  }

  return {
    tags: optionalTags.tags,
    guidance: optionalTags.guidance,
  }
}

export const hasOptionalTags = (optionalTags: OptionalTagsRecommendation | undefined): boolean =>
  normalizeOptionalTags(optionalTags).tags.length > 0

import type { GeometryType } from '../../data-definitions/geometryTypes.js'
import type { SignStateType } from '../../data-definitions/TrafficSignDataTypes.js'
import { getRecommendations } from './getRecommendations.js'
import { normalizeOptionalTags } from './normalizeOptionalTags.js'

export const collectOptionalTags = (signs: SignStateType[], geometry: GeometryType) => {
  const merged: Map<string, { key: string; value: string }> = new Map()

  for (const sign of signs) {
    if (!sign.recodgnizedSign) {
      continue
    }

    const recs = getRecommendations(sign, geometry)
    const { tags } = normalizeOptionalTags(recs?.optionalTags)
    if (!tags.length) {
      continue
    }

    for (const tag of tags) {
      merged.set(tag.key, tag)
    }
  }

  return Array.from(merged.values())
}

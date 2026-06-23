import type { GeometryType } from '../../data-definitions/geometryTypes.js'
import type { SignStateType } from '../../data-definitions/TrafficSignDataTypes.js'
import { signHasHighwayQuestion } from './collectQuestionTags.js'
import { getRecommendations } from './getRecommendations.js'
import { uniqueArray } from './uniqueArray.js'

export const collectHighwayValues = (
  signs: SignStateType[] | undefined,
  geometry: GeometryType,
) => {
  if (!Array.isArray(signs)) return []

  // highwayClass question replaces catalogue highwayValues for the whole sign group
  if (signs.some(signHasHighwayQuestion)) return []

  const all: string[] = []
  for (const sign of signs) {
    if (!sign.recodgnizedSign) continue
    const recs = getRecommendations(sign, geometry)
    if (recs?.highwayValues) {
      all.push(...recs.highwayValues)
    }
  }

  return uniqueArray(all)
}

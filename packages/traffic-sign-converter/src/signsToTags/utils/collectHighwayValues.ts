import type { GeometryType } from '../../data-definitions/geometryTypes.js'
import type { SignStateType } from '../../data-definitions/TrafficSignDataTypes.js'
import { signHasHighwayQuestion } from './collectQuestionTags.js'
import { getRecommendations } from './getRecommendations.js'
import { uniqueArray } from './uniqueArray.js'

export const groupHasHighwayQuestion = (signs: SignStateType[] | undefined): boolean =>
  Array.isArray(signs) && signs.some(signHasHighwayQuestion)

export const collectHighwayValues = (
  signs: SignStateType[] | undefined,
  geometry: GeometryType,
) => {
  if (!Array.isArray(signs)) return []

  // A highway-class question on the main sign replaces catalogue highwayValues for the whole group.
  if (groupHasHighwayQuestion(signs)) return []

  const all: string[] = []
  for (const sign of signs) {
    if (!sign.recodgnizedSign) continue
    const recs = getRecommendations(sign, geometry)
    if (recs?.highwayValues) {
      all.push(...recs.highwayValues)
    }
  }

  const deduplicated = uniqueArray(all)

  return deduplicated
}

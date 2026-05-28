import type { GeometryType } from '../../data-definitions/geometryTypes.js'
import type { SignStateType } from '../../data-definitions/TrafficSignDataTypes.js'
import { getRecommendations } from './getRecommendations.js'
import { uniqueArray } from './uniqueArray.js'

export const collectHighwayValues = (
  signs: SignStateType[] | undefined,
  geometry: GeometryType,
) => {
  if (!Array.isArray(signs)) return []

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

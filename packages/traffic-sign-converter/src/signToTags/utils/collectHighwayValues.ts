import type { SignType } from '../../data/TrafficSignDataTypes.js'
import { uniqueArray } from './uniqueArray.js'

export const collectHighwayValues = (signs: SignType[] | undefined) => {
  if (!Array.isArray(signs)) return []

  const all = signs
    .map((sign) => sign.tagRecommendations)
    .map((tags) => {
      return tags.highwayValues
    })
    .flat()
    .filter(Boolean)

  const deduplicated = uniqueArray(all)

  return deduplicated
}

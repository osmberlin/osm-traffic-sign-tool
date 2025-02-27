import type { SignStateType } from '../../data-definitions/TrafficSignDataTypes.js'
import { uniqueArray } from './uniqueArray.js'

export const collectHighwayValues = (signs: SignStateType[] | undefined) => {
  if (!Array.isArray(signs)) return []

  const all = signs
    .filter((sign) => sign.recodgnizedSign === true)
    .map((sign) => {
      return sign.tagRecommendations
    })
    .map((tags) => {
      return tags.highwayValues
    })
    .flat()
    .filter(Boolean)

  const deduplicated = uniqueArray(all)

  return deduplicated
}

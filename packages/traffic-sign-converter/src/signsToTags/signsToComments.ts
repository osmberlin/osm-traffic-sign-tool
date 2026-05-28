import type { GeometryType } from '../data-definitions/geometryTypes.js'
import type { SignComentType, SignStateType } from '../data-definitions/TrafficSignDataTypes.js'
import { getRecommendations } from './utils/getRecommendations.js'

export const signsToComments = (signs: SignStateType[], geometry: GeometryType) => {
  const signCommentsMap: Map<string, SignComentType[]> = new Map()

  for (const sign of signs) {
    if (sign.recodgnizedSign === false) continue

    const recommendations = getRecommendations(sign, geometry)
    if (recommendations?.comments?.length) {
      signCommentsMap.set(sign.osmValuePart, recommendations.comments)
    }
  }

  return signCommentsMap
}

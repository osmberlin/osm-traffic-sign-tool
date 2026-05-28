import type { GeometryType } from '../data-definitions/geometryTypes.js'
import type { SignStateType } from '../data-definitions/TrafficSignDataTypes.js'

export const signsToApplicability = (signs: SignStateType[], geometry: GeometryType) => {
  const applicable: SignStateType[] = []
  const notApplicable: SignStateType[] = []

  for (const sign of signs) {
    if (!sign.recodgnizedSign) {
      notApplicable.push(sign)
      continue
    }

    if (sign.tagRecommendationsByGeometry === 'none') {
      notApplicable.push(sign)
      continue
    }

    const hasGeometry = sign.tagRecommendationsByGeometry.some((recommendation) =>
      recommendation.geometries.includes(geometry),
    )
    if (hasGeometry) {
      applicable.push(sign)
    } else {
      notApplicable.push(sign)
    }
  }

  return { applicable, notApplicable }
}

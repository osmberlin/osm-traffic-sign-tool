import type { GeometryType } from '../../data-definitions/geometryTypes.js'
import type {
  ModifierSignType,
  ModifierTagRecommendationByGeometry,
  SignType,
  TagRecommendationByGeometry,
  TrafficSignType,
} from '../../data-definitions/TrafficSignDataTypes.js'

export function getRecommendations(
  sign: TrafficSignType,
  geometry: GeometryType,
): TagRecommendationByGeometry | undefined
export function getRecommendations(
  sign: ModifierSignType,
  geometry: GeometryType,
): ModifierTagRecommendationByGeometry | undefined
export function getRecommendations(
  sign: SignType,
  geometry: GeometryType,
): TagRecommendationByGeometry | ModifierTagRecommendationByGeometry | undefined
export function getRecommendations(sign: SignType, geometry: GeometryType) {
  if (sign.tagRecommendationsByGeometry === 'none') {
    return undefined
  }
  return sign.tagRecommendationsByGeometry.find((recommendation) =>
    recommendation.geometries.includes(geometry),
  )
}

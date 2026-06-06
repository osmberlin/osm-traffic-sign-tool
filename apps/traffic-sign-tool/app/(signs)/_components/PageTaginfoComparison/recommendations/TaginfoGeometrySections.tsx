import { useCountryPrefix } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import { getGeometryLabel } from '@app/src/features/i18n/geometryLabels'
import {
  GEOMETRY_TYPES,
  signsToComments,
  signsToTags,
  trafficSignTagToSigns,
  type CountryPrefixType,
  type GeometryType,
} from '@osm-traffic-signs/converter'
import { TaginfoComments } from './TaginfoComments'
import { TaginfoRecommendations } from './TaginfoRecommendations'

type Props = {
  value: string
}

const geometryHasContent = (
  value: string,
  geometry: GeometryType,
  countryPrefix: CountryPrefixType,
): boolean => {
  const signs = trafficSignTagToSigns(value, countryPrefix)
  const geometries: GeometryType[] = geometry === 'way' ? ['way', 'way_centerline'] : [geometry]

  const hasTags = geometries.some(
    (currentGeometry) => signsToTags(signs, countryPrefix, currentGeometry).size > 0,
  )
  const hasComments = signsToComments(signs, geometry).size > 0

  return hasTags || hasComments
}

export const TaginfoGeometrySections = ({ value }: Props) => {
  const { countryPrefix } = useCountryPrefix()
  const relevantGeometries = GEOMETRY_TYPES.filter((geometry) =>
    geometryHasContent(value, geometry, countryPrefix),
  )

  if (relevantGeometries.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      {relevantGeometries.map((geometry, index) => {
        return (
          <div
            key={geometry}
            className={index > 0 ? 'border-t border-stone-400/50 pt-4' : undefined}
          >
            <h4 className="mb-2 text-xs font-semibold tracking-wide text-stone-600 uppercase">
              {getGeometryLabel(geometry)}
            </h4>
            <div className="space-y-3">
              <TaginfoRecommendations value={value} geometry={geometry} />
              <TaginfoComments value={value} geometry={geometry} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

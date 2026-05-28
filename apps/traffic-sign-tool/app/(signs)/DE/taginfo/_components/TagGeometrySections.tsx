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
import { TagComments } from './TagComments'
import { TagRecommendations } from './TagRecommendations'

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

export const TagGeometrySections = ({ value }: Props) => {
  const { countryPrefix } = useCountryPrefix()
  const relevantGeometries = GEOMETRY_TYPES.filter((geometry) =>
    geometryHasContent(value, geometry, countryPrefix),
  )

  if (relevantGeometries.length === 0) {
    return null
  }

  return (
    <>
      {relevantGeometries.map((geometry, index) => {
        return (
          <div key={geometry}>
            {index > 0 && <hr className="my-5" />}
            <h4 className="mb-2 font-light uppercase">{getGeometryLabel(geometry)}</h4>
            <TagRecommendations value={value} geometry={geometry} />
            <TagComments value={value} geometry={geometry} />
          </div>
        )
      })}
    </>
  )
}

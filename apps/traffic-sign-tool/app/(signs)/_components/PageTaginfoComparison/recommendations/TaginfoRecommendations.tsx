import { useCountryPrefix } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import { Tag } from '@app/app/(signs)/_components/wiki/Tag'
import {
  signsToTags,
  trafficSignTagToSigns,
  type CountryPrefixType,
  type GeometryType,
} from '@osm-traffic-signs/converter'

type Props = {
  value: string
  geometry: GeometryType
}

const aggregateTagRecommendations = (
  value: string,
  geometry: GeometryType,
  countryPrefix: CountryPrefixType,
) => {
  const signs = trafficSignTagToSigns(value, countryPrefix)
  const geometries: GeometryType[] = geometry === 'way' ? ['way', 'way_centerline'] : [geometry]
  const aggregatedTagsMap = new Map<string, string | string[]>()

  for (const currentGeometry of geometries) {
    const tagMap = signsToTags(signs, countryPrefix, currentGeometry)
    for (const [key, valueEntry] of tagMap) {
      aggregatedTagsMap.set(key, valueEntry)
    }
  }

  return [...aggregatedTagsMap]
}

export const TaginfoRecommendations = ({ value, geometry }: Props) => {
  const { countryPrefix } = useCountryPrefix()
  const aggregatedTags = aggregateTagRecommendations(value, geometry, countryPrefix)

  if (aggregatedTags.length === 0) {
    return null
  }

  return (
    <ul className="list-disc space-y-1 pl-5">
      {aggregatedTags.map(([key, tagValue]) => (
        <li key={key} className="leading-snug">
          <Tag tagKey={key} tagValue={tagValue} />
        </li>
      ))}
    </ul>
  )
}

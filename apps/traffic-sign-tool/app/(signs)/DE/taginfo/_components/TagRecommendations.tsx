import { useCountryPrefixWithFallback } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import { Tag } from '@app/app/(signs)/_components/wiki/Tag'
import { signsToTags, trafficSignTagToSigns, type GeometryType } from '@osm-traffic-signs/converter'

type Props = {
  value: string
  geometry: GeometryType
}

export const TagRecommendations = ({ value, geometry }: Props) => {
  const { countryPrefix } = useCountryPrefixWithFallback()
  const signs = trafficSignTagToSigns(value, countryPrefix)
  const geometries: GeometryType[] = geometry === 'way' ? ['way', 'way_centerline'] : [geometry]
  const aggregatedTagsMap = new Map<string, string | string[]>()

  for (const currentGeometry of geometries) {
    const tagMap = signsToTags(signs, countryPrefix, currentGeometry)
    for (const [key, valueEntry] of tagMap) {
      aggregatedTagsMap.set(key, valueEntry)
    }
  }

  if (aggregatedTagsMap.size === 0) {
    return null
  }

  return (
    <ul>
      {Array.from(aggregatedTagsMap).map(([key, value]) => {
        return (
          <li key={key} className="rounded-sm px-2 py-0.5 leading-tight hover:bg-zinc-950/5">
            <Tag tagKey={key} tagValue={value} />
          </li>
        )
      })}
    </ul>
  )
}

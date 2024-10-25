'use client'
import { Tag } from '@app/app/_components/wiki/Tag'
import { useCountryPrefix } from '@app/app/_store/utils/useCountryPrefix'
import { signToTags, trafficSignTagToSigns } from '@osm-traffic-signs/converter'

type Props = { value: string }

export const TagRecommendations = ({ value }: Props) => {
  const countryPrefix = useCountryPrefix()
  const signs = trafficSignTagToSigns(value, countryPrefix)
  const aggregatedTagsMap = signToTags(signs, countryPrefix)

  return (
    <ul>
      {Array.from(aggregatedTagsMap).map(([key, value]) => {
        return (
          <li key={key} className="rounded px-2 py-0.5 leading-tight hover:bg-white/5">
            <Tag tagKey={key} tagValue={value} />
          </li>
        )
      })}
    </ul>
  )
}

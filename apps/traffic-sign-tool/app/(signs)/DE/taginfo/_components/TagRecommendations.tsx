'use client'
import { useCountryPrefixWithFallback } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import { Tag } from '@app/app/(signs)/_components/wiki/Tag'
import { signToTags, trafficSignTagToSigns } from '@osm-traffic-signs/converter'

type Props = { value: string }

// Weitgehend ein Duplikat von apps/traffic-sign-tool/app/(app)/[countryPrefix]/_components/results/ResultTagRecommendations.tsx
export const TagRecommendations = ({ value }: Props) => {
  const { countryPrefix } = useCountryPrefixWithFallback()
  const signs = trafficSignTagToSigns(value, countryPrefix)
  const aggregatedTagsMap = signToTags(signs, countryPrefix)

  return (
    <ul>
      {Array.from(aggregatedTagsMap).map(([key, value]) => {
        return (
          <li key={key} className="rounded-sm px-2 py-0.5 leading-tight hover:bg-white/5">
            <Tag tagKey={key} tagValue={value} />
          </li>
        )
      })}
    </ul>
  )
}

'use client'
import { SelectedSignImage } from '@app/app/(signs)/_components/PageApp/selectedSigns/SelectedSignImage'
import { useCountryPrefixWithFallback } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import { trafficSignTagToSigns } from '@osm-traffic-signs/converter'

type Props = { value: string }

export const TagSignImages = ({ value }: Props) => {
  const { countryPrefix } = useCountryPrefixWithFallback()
  const signs = trafficSignTagToSigns(value, countryPrefix)

  return (
    <ul>
      {signs.map((sign) => {
        return (
          <li key={sign.osmValuePart} className="py-1 leading-tight">
            <SelectedSignImage sign={sign} />
          </li>
        )
      })}
    </ul>
  )
}

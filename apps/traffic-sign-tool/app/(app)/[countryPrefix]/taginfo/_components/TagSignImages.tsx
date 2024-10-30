'use client'
import { useCountryPrefix } from '@app/app/_store/utils/useCountryPrefix'
import { trafficSignTagToSigns } from '@osm-traffic-signs/converter'
import { SelectedSignImage } from '../../_components/selectedSigns/SelectedSignImage'

type Props = { value: string }

export const TagSignImages = ({ value }: Props) => {
  const countryPrefix = useCountryPrefix()
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

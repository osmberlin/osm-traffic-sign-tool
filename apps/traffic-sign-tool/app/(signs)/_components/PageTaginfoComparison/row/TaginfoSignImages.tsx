import { SelectedSignImage } from '@app/app/(signs)/_components/PageApp/selectedSigns/SelectedSignImage'
import { useCountryPrefix } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import { trafficSignTagToSigns } from '@osm-traffic-signs/converter'

type Props = { value: string }

export const TaginfoSignImages = ({ value }: Props) => {
  const { countryPrefix } = useCountryPrefix()
  const signs = trafficSignTagToSigns(value, countryPrefix)

  return (
    <ul className="list-none space-y-2">
      {signs.map((sign) => {
        return (
          <li key={sign.osmValuePart} className="leading-tight">
            <SelectedSignImage sign={sign} />
          </li>
        )
      })}
    </ul>
  )
}

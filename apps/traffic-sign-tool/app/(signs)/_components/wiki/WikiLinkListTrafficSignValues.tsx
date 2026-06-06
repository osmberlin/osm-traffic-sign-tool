import { getTrafficSignWikiLinkParts } from '@app/app/(signs)/_components/wiki/wikiLinkTrafficSignParts'
import { WikiLinkTrafficSignValueItem } from '@app/app/(signs)/_components/wiki/WikiLinkTrafficSignValueItem'
import { useCountryPrefix } from '../store/CountryPrefixContext'

type Props = {
  value: string
  inline?: boolean
  linkLabel?: string
}

export const WikiLinkListTrafficSignValues = ({ value, inline, linkLabel }: Props) => {
  const { countryPrefix } = useCountryPrefix()

  if (!countryPrefix) return null

  const parts = getTrafficSignWikiLinkParts(value, countryPrefix)

  return (
    <ul className={inline ? 'inline space-x-2' : ''}>
      {parts.map(({ key, osmValue }) => (
        <WikiLinkTrafficSignValueItem
          key={key}
          osmValue={osmValue}
          inline={inline}
          linkLabel={linkLabel}
        />
      ))}
    </ul>
  )
}

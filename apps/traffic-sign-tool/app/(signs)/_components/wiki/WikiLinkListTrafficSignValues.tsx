'use client'
import {
  namedTrafficSignValues,
  splitIntoSignValueParts,
  splitSignIdSignValue,
} from '@osm-traffic-signs/converter'
import { useCountryPrefixWithFallback } from '../store/CountryPrefixContext'
import { WikiLinkValue } from '../wiki/WikiLinkValue'

type Props = { value: string; inline?: boolean }

export const WikiLinkListTrafficSignValues = ({ value, inline }: Props) => {
  const { countryPrefix } = useCountryPrefixWithFallback()
  const splitTrafficSignValue = splitIntoSignValueParts(value)
  const signValues = splitTrafficSignValue.map((part) => splitSignIdSignValue(part).signId)

  if (!countryPrefix) return null

  return (
    <ul className={inline ? 'inline space-x-2' : ''}>
      {signValues.map((part) => {
        const prefix = namedTrafficSignValues.includes(part) ? '' : `${countryPrefix}:`

        return (
          <li key={part} className={inline ? 'inline' : ''}>
            <WikiLinkValue
              osmKey="traffic_sign"
              osmValue={part.startsWith(countryPrefix) ? part : `${prefix}${part}`}
            />
          </li>
        )
      })}
    </ul>
  )
}

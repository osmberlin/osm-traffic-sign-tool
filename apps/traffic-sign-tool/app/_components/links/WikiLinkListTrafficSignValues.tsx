'use client'
import { useCountryPrefix } from '@app/app/_store/utils/useCountryPrefix'
import { splitIntoSignValueParts } from '@monorepo/packages/traffic-sign-converter/dist'
import { WikiLinkValue } from '../wiki/WikiLinkValue'

type Props = { value: string; className?: string }

export const WikiLinkListTrafficSignValues = ({ value, className }: Props) => {
  const countryPrefix = useCountryPrefix()
  const splitTrafficSignValues = splitIntoSignValueParts(value)

  if (!countryPrefix) return null

  return (
    <ul className={className}>
      {splitTrafficSignValues.map((part) => {
        return (
          <li key={part}>
            <WikiLinkValue
              osmKey="traffic_sign"
              osmValue={part.startsWith(countryPrefix) ? part : `${countryPrefix}:${part}`}
            />
          </li>
        )
      })}
    </ul>
  )
}

'use client'
import { useCountryPrefix } from '@app/app/_store/utils/useCountryPrefix'
import { splitIntoSignValueParts, splitSignIdSignValue } from '@osm-traffic-signs/converter'
import { WikiLinkValue } from '../wiki/WikiLinkValue'

const knownNamedSignValues = [
  'city_limit',
  'maxspeed',
  'none',
  'destination',
  'yes',
  'no',
  'variable',
  'hazard',
  'signals',
  'give_way',
  'stop',
  'variable_message',
]

type Props = { value: string; inline?: boolean }

export const WikiLinkListTrafficSignValues = ({ value, inline }: Props) => {
  const countryPrefix = useCountryPrefix()
  const splitTrafficSignValue = splitIntoSignValueParts(value)
  const signValues = splitTrafficSignValue.map((part) => splitSignIdSignValue(part).signId)

  if (!countryPrefix) return null

  return (
    <ul className={inline ? 'inline' : ''}>
      {signValues.map((part) => {
        const prefix = knownNamedSignValues.includes(part) ? '' : `${countryPrefix}:`

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

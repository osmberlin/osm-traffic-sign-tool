'use client'
import {
  combineSignIdSignValue,
  CountryPrefixesType,
  signToTrafficSignTagValue,
  splitSignIdSignValue,
  TrafficSignState,
  trafficSignTagToSigns,
} from '@osm-traffic-signs/converter'
import { createParser, useQueryState } from 'nuqs'
import { useCountryPrefix } from './utils/useCountryPrefix'

// From String to Data
const parse = (input: string, countryPrefix: CountryPrefixesType | undefined) => {
  return trafficSignTagToSigns(input, countryPrefix) satisfies TrafficSignState[]
}

// From Data to String
const serialize = (
  trafficSigns: TrafficSignState[],
  countryPrefix: CountryPrefixesType | undefined,
) => {
  return signToTrafficSignTagValue(trafficSigns, countryPrefix)
}

export const useParamSigns = () => {
  const countryPrefix = useCountryPrefix()
  const [paramSigns, setParamSigns] = useQueryState(
    'signs',
    createParser({
      parse: (query) => parse(query, countryPrefix),
      serialize: (value) => serialize(value, countryPrefix),
    }).withDefault([]),
  )

  const toggleOsmValuePart = (osmValuePart: string) => {
    if (paramSigns.some((sign) => sign.osmValuePart === osmValuePart)) {
      // REMOVE SIGN
      // We simply remove the sign object from our state array
      setParamSigns(() => {
        return paramSigns.filter((sign) => sign.osmValuePart !== osmValuePart)
      })
    } else {
      // ADD SIGN
      // We need to handle custom values
      // Which is why we loop the osmValuePart trough `trafficSignTagToSigns`
      const addSign = trafficSignTagToSigns(osmValuePart, countryPrefix)

      setParamSigns(() => {
        return [...paramSigns, ...addSign]
      })
    }
  }

  const updateSignValue = (currentOsmValuePart: string, newValue: string) => {
    const newSigns = paramSigns.map((paramSign) => {
      if (paramSign.osmValuePart === currentOsmValuePart && 'valuePrompt' in paramSign) {
        const { signId } = splitSignIdSignValue(currentOsmValuePart)
        return {
          ...paramSign,
          signValue: newValue,
          osmValuePart: combineSignIdSignValue(
            signId,
            newValue || paramSign.valuePrompt.defaultValue,
          ),
        }
      }
      return paramSign
    })
    setParamSigns(newSigns)
  }

  return { paramSigns, setParamSigns, toggleOsmValuePart, updateSignValue }
}

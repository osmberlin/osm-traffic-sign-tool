'use client'
import {
  combineSignIdSignValue,
  CountryPrefixType,
  SignStateType,
  signsToTrafficSignTagValue,
  splitSignIdSignValue,
  trafficSignTagToSigns,
} from '@osm-traffic-signs/converter'
import { createParser, useQueryState } from 'nuqs'
import { useCountryPrefixWithFallback } from './CountryPrefixContext'

// From String to Data
const parse = (input: string, countryPrefix: CountryPrefixType | undefined) => {
  // An earlier version of the tool used pipes to separate signs
  // We migrate those here in nuqs instead of the package because it is tool secific logic
  const migratedInput = input.replaceAll('|', ';')
  return trafficSignTagToSigns(migratedInput, countryPrefix) satisfies SignStateType[]
}

// From Data to String
const serialize = (trafficSigns: SignStateType[], countryPrefix: CountryPrefixType | undefined) => {
  return signsToTrafficSignTagValue(trafficSigns, countryPrefix)
}

export const useParamSigns = () => {
  const { countryPrefix } = useCountryPrefixWithFallback()
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
      if (paramSign.osmValuePart === currentOsmValuePart) {
        const { signId } = splitSignIdSignValue(currentOsmValuePart)
        const defaultValue =
          'valuePrompt' in paramSign && paramSign?.valuePrompt
            ? paramSign.valuePrompt.defaultValue
            : undefined
        const newOrFallbackValue = Boolean(newValue) ? newValue : defaultValue

        return {
          ...paramSign,
          signValue: newValue,
          osmValuePart: combineSignIdSignValue(signId, newOrFallbackValue),
        } as SignStateType // TS: `as` needed due to some edge cases with `signValue`
      }
      return paramSign satisfies SignStateType
    })
    setParamSigns(newSigns)
  }

  return { paramSigns, setParamSigns, toggleOsmValuePart, updateSignValue }
}

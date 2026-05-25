'use client'
import { parseSignsParam, serializeSignsParam } from '@app/src/features/searchParams/deSearch'
import {
  combineSignIdSignValue,
  SignStateType,
  splitSignIdSignValue,
  trafficSignTagToSigns,
} from '@osm-traffic-signs/converter'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useCountryPrefixWithFallback } from './CountryPrefixContext'

export const useParamSigns = () => {
  const { countryPrefix } = useCountryPrefixWithFallback()
  const navigate = useNavigate({ from: '/$lang' })
  const search = useSearch({ from: '/$lang' })
  const rawSigns = search.signs
  const paramSigns = parseSignsParam(rawSigns, countryPrefix)

  const setParamSigns = (
    value: SignStateType[] | ((prevValue: SignStateType[]) => SignStateType[]),
  ) => {
    const nextValue = typeof value === 'function' ? value(paramSigns) : value

    void navigate({
      replace: true,
      resetScroll: false,
      search: (prev) => ({
        ...prev,
        signs: serializeSignsParam(nextValue, countryPrefix),
      }),
    })
  }

  const toggleOsmValuePart = (osmValuePart: string) => {
    // Check for exact match first
    const hasExactMatch = paramSigns.some((sign) => sign.osmValuePart === osmValuePart)

    // If no exact match, check if this osmValuePart redirects to something in state
    let osmValuePartToRemove = osmValuePart
    if (!hasExactMatch) {
      // Parse the osmValuePart to see if it redirects to something else
      const parsedSigns = trafficSignTagToSigns(osmValuePart, countryPrefix)
      if (parsedSigns.length > 0) {
        const redirectedOsmValuePart = parsedSigns[0].osmValuePart
        // Check if the redirected value exists in state
        if (paramSigns.some((sign) => sign.osmValuePart === redirectedOsmValuePart)) {
          osmValuePartToRemove = redirectedOsmValuePart
        }
      }
    }

    if (paramSigns.some((sign) => sign.osmValuePart === osmValuePartToRemove)) {
      // REMOVE SIGN
      // We simply remove the sign object from our state array
      setParamSigns(() => {
        return paramSigns.filter((sign) => sign.osmValuePart !== osmValuePartToRemove)
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
        const newOrFallbackValue = newValue ? newValue : defaultValue

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

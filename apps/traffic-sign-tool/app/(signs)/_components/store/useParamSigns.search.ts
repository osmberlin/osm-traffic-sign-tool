'use client'
import { parseSignsParam, serializeSignsParam } from '@app/src/features/searchParams/deSearch'
import {
  combineSignIdSignValue,
  SignStateType,
  splitSignIdSignValue,
  trafficSignTagToSigns,
} from '@osm-traffic-signs/converter'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useCallback, useRef } from 'react'
import { useCountryPrefixWithFallback } from './CountryPrefixContext'

const DEFAULT_SIGN_VALUE_DEBOUNCE_MS = 2000

export const useParamSigns = () => {
  const { countryPrefix } = useCountryPrefixWithFallback()
  const navigate = useNavigate({ from: '/$lang' })
  const search = useSearch({ from: '/$lang' })
  const rawSigns = search.signs
  const paramSigns = parseSignsParam(rawSigns, countryPrefix)
  const signValueUpdateTimersRef = useRef(new Map<string, ReturnType<typeof setTimeout>>())

  const setParamSigns = useCallback(
    (value: SignStateType[] | ((prevValue: SignStateType[]) => SignStateType[])) => {
      void navigate({
        replace: true,
        resetScroll: false,
        search: (prev) => {
          const prevSigns = parseSignsParam(prev.signs, countryPrefix)
          const nextValue = typeof value === 'function' ? value(prevSigns) : value

          return {
            ...prev,
            signs: serializeSignsParam(nextValue, countryPrefix),
          }
        },
      })
    },
    [countryPrefix, navigate],
  )

  const updateSignValue = useCallback(
    (currentOsmValuePart: string, newValue: string) => {
      setParamSigns((prevSigns) =>
        prevSigns.map((paramSign) => {
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
            } as SignStateType
          }
          return paramSign satisfies SignStateType
        }),
      )
    },
    [setParamSigns],
  )

  const cancelPendingSignValueUpdate = useCallback((osmValuePart: string) => {
    const pending = signValueUpdateTimersRef.current.get(osmValuePart)
    if (pending) {
      clearTimeout(pending)
      signValueUpdateTimersRef.current.delete(osmValuePart)
    }
  }, [])

  /**
   * TanStack Router has no built-in debounced search updates — delay navigate yourself.
   * @see https://tanstack.com/router/latest/docs/framework/react/guide/search-params
   */
  const updateSignValueDebounced = useCallback(
    (
      osmValuePart: string,
      newValue: string,
      debounceMs: number = DEFAULT_SIGN_VALUE_DEBOUNCE_MS,
    ) => {
      cancelPendingSignValueUpdate(osmValuePart)
      signValueUpdateTimersRef.current.set(
        osmValuePart,
        setTimeout(() => {
          signValueUpdateTimersRef.current.delete(osmValuePart)
          updateSignValue(osmValuePart, newValue)
        }, debounceMs),
      )
    },
    [cancelPendingSignValueUpdate, updateSignValue],
  )

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
      setParamSigns((prevSigns) =>
        prevSigns.filter((sign) => sign.osmValuePart !== osmValuePartToRemove),
      )
    } else {
      const addSign = trafficSignTagToSigns(osmValuePart, countryPrefix)

      setParamSigns((prevSigns) => [...prevSigns, ...addSign])
    }
  }

  return {
    paramSigns,
    setParamSigns,
    toggleOsmValuePart,
    updateSignValue,
    updateSignValueDebounced,
    cancelPendingSignValueUpdate,
  }
}

'use client'
import { CountryPrefixType } from '@osm-traffic-signs/converter'
import { createContext, useContext } from 'react'

const CountryPrefixContext = createContext<CountryPrefixType | undefined>(undefined)

export type CountryPrefixProviderProps = {
  children: React.ReactElement
  countryPrefix: CountryPrefixType
}
export const CountryPrefixProvider = ({ children, countryPrefix }: CountryPrefixProviderProps) => {
  return (
    <CountryPrefixContext.Provider value={countryPrefix}>{children}</CountryPrefixContext.Provider>
  )
}

export const countryPrefixFallback = 'DE'

export const useCountryPrefixWithFallback = () => {
  const countryPrefix = useContext(CountryPrefixContext)
  return { countryPrefix: countryPrefix || countryPrefixFallback }
}

export const useCountryPrefix = () => {
  const countryPrefix = useContext(CountryPrefixContext)
  return { countryPrefix }
}

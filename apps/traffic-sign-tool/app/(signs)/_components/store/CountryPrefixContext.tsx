import { catalogueHtmlLang } from '@app/src/features/routing/lang'
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

/** HTML `lang` for sign-catalogue strings (≠ Paraglide UI locale on the shell). */
export const useCatalogueHtmlLang = (): string => {
  const { countryPrefix } = useCountryPrefixWithFallback()
  return catalogueHtmlLang(countryPrefix)
}

export const useCountryPrefix = () => {
  const countryPrefix = useContext(CountryPrefixContext)
  return { countryPrefix }
}

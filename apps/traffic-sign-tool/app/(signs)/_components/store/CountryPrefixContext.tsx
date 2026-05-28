import { catalogueHtmlLang } from '@app/src/features/routing/lang'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'

export const useCountryPrefix = () => {
  const countryPrefix = useCurrentLang()
  return { countryPrefix }
}

/** HTML `lang` for sign-catalogue strings (≠ Paraglide UI locale on the shell). */
export const useCatalogueHtmlLang = () => {
  const { countryPrefix } = useCountryPrefix()
  return catalogueHtmlLang(countryPrefix)
}

import { type CountryPrefixType, countries } from '@osm-traffic-signs/converter'

/** Supported sign-catalogue country prefixes for the `/$lang` route (not UI locale). */
export const defaultLang = 'DE' satisfies CountryPrefixType

export const isSupportedLang = (lang: string): lang is CountryPrefixType =>
  (countries as readonly string[]).includes(lang)

/** BCP 47 `lang` for sign-catalogue strings (≠ Paraglide UI locale on the shell). */
export const catalogueHtmlLang = (countryPrefix: CountryPrefixType): string =>
  countryPrefix.toLowerCase()

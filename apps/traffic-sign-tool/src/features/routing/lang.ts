import {
  type CountryPrefixType,
  countries,
  getCountryCatalogueMeta,
} from '@osm-traffic-signs/converter'

/** Supported sign-catalogue country prefixes for the `/$lang` route (not UI locale). */
export const defaultLang = countries[0] satisfies CountryPrefixType

export const isSupportedLang = (lang: string): lang is CountryPrefixType =>
  (countries as readonly string[]).includes(lang)

/** BCP 47 `lang` for sign-catalogue strings (≠ Paraglide UI locale on the shell). */
export const catalogueHtmlLang = (countryPrefix: CountryPrefixType) =>
  getCountryCatalogueMeta(countryPrefix).catalogueLocale

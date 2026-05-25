import { countries, type CountryPrefixType } from '@osm-traffic-signs/converter'

export const defaultLang = 'DE' satisfies CountryPrefixType

export const isSupportedLang = (lang: string): lang is CountryPrefixType =>
  (countries as readonly string[]).includes(lang)

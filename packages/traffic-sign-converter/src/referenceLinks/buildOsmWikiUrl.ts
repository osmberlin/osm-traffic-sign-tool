import type { CountryPrefixType } from '../data-definitions/countryDefinitions.js'

const wikiBaseUrl = 'https://wiki.openstreetmap.org/wiki'

export const buildOsmWikiKeyUrl = (countryPrefix: CountryPrefixType, osmKey: string) =>
  `${wikiBaseUrl}/${countryPrefix}:Key:${osmKey}`

export const buildOsmWikiTagUrl = (
  countryPrefix: CountryPrefixType,
  osmKey: string,
  osmValue: string,
) => `${wikiBaseUrl}/${countryPrefix}:Tag:${osmKey}=${osmValue}`

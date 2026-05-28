import type { CountryCatalogueMeta } from '../referenceLinks/types.js'
import type { CountryPrefixType } from './countryDefinitions.js'
import { catalogueMetaDE } from './DE/catalogueMetaDE.js'

export const countryCatalogueMeta = {
  DE: catalogueMetaDE,
} as const satisfies Record<CountryPrefixType, CountryCatalogueMeta>

export const getCountryCatalogueMeta = (countryPrefix: CountryPrefixType) =>
  countryCatalogueMeta[countryPrefix]

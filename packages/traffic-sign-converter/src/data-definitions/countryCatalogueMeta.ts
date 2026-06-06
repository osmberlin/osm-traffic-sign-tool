import type { CountryCatalogueMeta, CountryQaCapabilities } from '../referenceLinks/types.js'
import type { CountryPrefixType } from './countryDefinitions.js'
import { catalogueMetaDE } from './DE/catalogueMetaDE.js'

export type { CountryQaCapabilities }

export const countryCatalogueMeta = {
  DE: catalogueMetaDE,
} as const satisfies Record<CountryPrefixType, CountryCatalogueMeta>

export const getCountryCatalogueMeta = (countryPrefix: CountryPrefixType) =>
  countryCatalogueMeta[countryPrefix]

export const getCatalogueDisplayName = (countryPrefix: CountryPrefixType) =>
  getCountryCatalogueMeta(countryPrefix).catalogueName

export const getCatalogueMaturity = (countryPrefix: CountryPrefixType) =>
  getCountryCatalogueMeta(countryPrefix).maturity

export const hasQaCapability = (
  countryPrefix: CountryPrefixType,
  capability: keyof CountryCatalogueMeta['qaCapabilities'],
) => getCountryCatalogueMeta(countryPrefix).qaCapabilities[capability]

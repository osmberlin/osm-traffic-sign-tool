import type { CountryCatalogueMeta, CountryQaCapabilities } from '../referenceLinks/types.js'
import { catalogueMetaDE } from './DE/catalogueMetaDE.js'
import { catalogueMetaBE } from './BE/catalogueMetaBE.js'
import { catalogueMetaAT } from './AT/catalogueMetaAT.js'
import { catalogueMetaCA } from './CA/catalogueMetaCA.js'
import { catalogueMetaPL } from './PL/catalogueMetaPL.js'
import type { CountryPrefixType } from './countryDefinitions.js'

export type { CountryQaCapabilities }

export const countryCatalogueMeta = {
  DE: catalogueMetaDE,
  BE: catalogueMetaBE as CountryCatalogueMeta,
  AT: catalogueMetaAT as CountryCatalogueMeta,
  CA: catalogueMetaCA as CountryCatalogueMeta,
  PL: catalogueMetaPL as CountryCatalogueMeta,
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

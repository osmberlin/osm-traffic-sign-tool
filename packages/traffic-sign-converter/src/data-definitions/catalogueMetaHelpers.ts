import type { CountryCatalogueMeta } from '../referenceLinks/types.js'
import { betaQaCapabilities } from '../referenceLinks/types.js'
import type { CountryPrefixType } from './countryDefinitions.js'

/** OSM `traffic_sign=*` country codes; includes catalogues not yet in `countryDefinitions`. */
export type CatalogueCountryPrefix = CountryPrefixType | 'FR' | 'PL' | 'CA' | 'AU' | 'BR'

export type BetaCountryCatalogueMeta = Omit<
  CountryCatalogueMeta,
  'countryPrefix' | 'osmTrafficSignPrefix'
> & {
  countryPrefix: CatalogueCountryPrefix
  osmTrafficSignPrefix: CatalogueCountryPrefix
}

type BetaCatalogueMetaInput = {
  countryPrefix: CatalogueCountryPrefix
  iconicSignOsmValuePart: string
  catalogueName: string
  catalogueLocale: string
  defaultCommentLang: string
  osmWikiOverviewUrl: string
  referenceLinks: CountryCatalogueMeta['referenceLinks']
  osmTrafficSignPrefix?: CatalogueCountryPrefix
}

export const createBetaCatalogueMeta = (
  input: BetaCatalogueMetaInput,
): BetaCountryCatalogueMeta => ({
  countryPrefix: input.countryPrefix,
  iconicSignOsmValuePart: input.iconicSignOsmValuePart,
  catalogueName: input.catalogueName,
  maturity: 'alpha',
  osmTrafficSignPrefix: input.osmTrafficSignPrefix ?? input.countryPrefix,
  catalogueLocale: input.catalogueLocale,
  defaultCommentLang: input.defaultCommentLang,
  osmWikiOverviewUrl: input.osmWikiOverviewUrl,
  referenceLinks: input.referenceLinks,
  qaCapabilities: betaQaCapabilities,
})

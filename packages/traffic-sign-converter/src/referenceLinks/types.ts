import type { CountryPrefixType } from '../data-definitions/countryDefinitions.js'

export type CountryReferenceLinkConfig = {
  /** OSM Wiki table anchor URL. Placeholders: `{hashPrefix}`, `{signId}` */
  osmWikiTableUrl: string
  /** Wikipedia table text-fragment URL. Placeholders: `{textFragment}` (already encoded) */
  wikipediaTableUrl?: string
  hashPrefixes: {
    main: string
    modifier: string
  }
  wikipediaTextFragmentLabels: {
    main: string
    modifier: string
  }
}

/** Catalogue or feature release stage shown in the UI when not `stable`. */
export type MaturityKey = 'alpha' | 'beta' | 'stable'

export type CountryCatalogueMeta = {
  countryPrefix: CountryPrefixType
  /** Release stage; `alpha` and `beta` show a label in the UI. */
  maturity: MaturityKey
  /** BCP 47 locale for catalogue rendering/sorting. */
  catalogueLocale: string
  /** Fallback language for catalogue comments without explicit lang tags. */
  defaultCommentLang: string
  /** Country overview wiki page for multi-modifier warning links. */
  osmWikiOverviewUrl: string
  referenceLinks: CountryReferenceLinkConfig
}

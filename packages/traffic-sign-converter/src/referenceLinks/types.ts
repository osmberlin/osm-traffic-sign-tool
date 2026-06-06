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

/** Per-country QA / maintainer view availability. */
export type CountryQaCapabilities = {
  taggingQa: boolean
  questionsQa: boolean
  combinationsQa: boolean
  allSigns: boolean
  wikiComparison: boolean
  taginfoComparison: boolean
  debugInfo: boolean
}

/** Full QA capabilities (stable DE catalogue). */
export const fullQaCapabilities = {
  taggingQa: true,
  questionsQa: true,
  combinationsQa: true,
  allSigns: true,
  wikiComparison: true,
  taginfoComparison: true,
  debugInfo: true,
} as const satisfies CountryQaCapabilities

/** Beta catalogue: package-data QA plus wiki/taginfo when snapshots exist per country. */
export const betaQaCapabilities = {
  taggingQa: true,
  questionsQa: true,
  combinationsQa: true,
  allSigns: true,
  wikiComparison: true,
  taginfoComparison: true,
  debugInfo: true,
} as const satisfies CountryQaCapabilities

/** Catalogue or feature release stage shown in the UI when not `stable`. */
export type MaturityKey = 'alpha' | 'beta' | 'stable'

export type CountryCatalogueMeta = {
  countryPrefix: CountryPrefixType
  /** Round blue pedestrian/sidewalk path sign for catalogue picker thumbnail (osmValuePart only). */
  iconicSignOsmValuePart: string
  /** English display name for catalogue switcher (not translated per UI locale). */
  catalogueName: string
  /** Release stage; `alpha` and `beta` show a label in the UI. */
  maturity: MaturityKey
  /** Prefix used in `traffic_sign=*` values (normally same as route key). */
  osmTrafficSignPrefix: CountryPrefixType
  /** BCP 47 locale for catalogue rendering/sorting. */
  catalogueLocale: string
  /** Fallback language for catalogue comments without explicit lang tags. */
  defaultCommentLang: string
  /** Country overview wiki page for multi-modifier warning links. */
  osmWikiOverviewUrl: string
  referenceLinks: CountryReferenceLinkConfig
  qaCapabilities: CountryQaCapabilities
}

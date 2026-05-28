/**
 * Catalogue-country reference link configuration (≠ Paraglide UI locale).
 *
 * URL templates use `{placeholder}` syntax. Each country prefix can define its
 * own templates and the sign-type labels used to build Wikipedia text fragments.
 */
export type CountryReferenceLinkConfig = {
  /** OSM Wiki table anchor URL. Placeholders: `{hashPrefix}`, `{signId}` */
  osmWikiTableUrl: string
  /** Wikipedia table text-fragment URL. Placeholders: `{textFragment}` (already encoded) */
  wikipediaTableUrl: string
  hashPrefixes: {
    main: string
    modifier: string
  }
  wikipediaTextLabels: {
    main: string
    modifier: string
  }
}

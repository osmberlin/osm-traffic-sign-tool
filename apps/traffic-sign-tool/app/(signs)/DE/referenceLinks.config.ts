import type { CountryReferenceLinkConfig } from '@app/src/features/referenceLinks/types'

/**
 * Reference link templates for the DE sign catalogue.
 *
 * Other catalogue locales can provide their own config with the same placeholders:
 * - `{hashPrefix}` — OSM Wiki anchor prefix for main vs modifier signs
 * - `{signId}` — official sign id (e.g. `274.1`)
 * - `{textFragment}` — URL-encoded `:~:text=` search string for Wikipedia
 */
export const deReferenceLinks = {
  osmWikiTableUrl:
    'https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_Deutschland#{hashPrefix}{signId}',
  wikipediaTableUrl:
    'https://de.wikipedia.org/wiki/Bildtafel_der_Verkehrszeichen_in_der_Bundesrepublik_Deutschland_seit_2017#:~:text={textFragment}',
  hashPrefixes: {
    main: 'Zeichen_',
    modifier: 'Zusatzzeichen_',
  },
  wikipediaTextLabels: {
    main: 'Zeichen',
    modifier: 'Zusatzzeichen',
  },
} as const satisfies CountryReferenceLinkConfig

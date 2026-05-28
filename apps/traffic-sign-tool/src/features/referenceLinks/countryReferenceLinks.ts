import { deReferenceLinks } from '@app/app/(signs)/DE/referenceLinks.config'
import type { CountryPrefixType } from '@osm-traffic-signs/converter'
import type { CountryReferenceLinkConfig } from './types'

export const countryReferenceLinks = {
  DE: deReferenceLinks,
} as const satisfies Partial<Record<CountryPrefixType, CountryReferenceLinkConfig>>

export const getCountryReferenceLinks = (
  countryPrefix: CountryPrefixType,
): CountryReferenceLinkConfig | undefined => countryReferenceLinks[countryPrefix]

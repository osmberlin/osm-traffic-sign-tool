import type { CountryPrefixType } from '@osm-traffic-signs/converter'

export type CountryTaginfoConfig = {
  countryPrefix: CountryPrefixType
  geofabrikRegion: string
  apiLang: string
}

export const countryTaginfoConfigs: Record<CountryPrefixType, CountryTaginfoConfig> = {
  DE: { countryPrefix: 'DE', geofabrikRegion: 'europe:germany', apiLang: 'de' },
  AT: { countryPrefix: 'AT', geofabrikRegion: 'europe:austria', apiLang: 'de' },
  BE: { countryPrefix: 'BE', geofabrikRegion: 'europe:belgium', apiLang: 'en' },
  FR: { countryPrefix: 'FR', geofabrikRegion: 'europe:france', apiLang: 'fr' },
  PL: { countryPrefix: 'PL', geofabrikRegion: 'europe:poland', apiLang: 'pl' },
  AU: { countryPrefix: 'AU', geofabrikRegion: 'australia-oceania:australia', apiLang: 'en' },
  BR: { countryPrefix: 'BR', geofabrikRegion: 'south-america:brazil', apiLang: 'pt' },
  CA: { countryPrefix: 'CA', geofabrikRegion: 'north-america:canada', apiLang: 'en' },
}

export const taginfoSnapshotCountryPrefixes = Object.keys(
  countryTaginfoConfigs,
) as CountryPrefixType[]

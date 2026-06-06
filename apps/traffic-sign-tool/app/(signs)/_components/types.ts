import { CountryPrefixType, SignType } from '@osm-traffic-signs/converter'

export type CataloguePageProps = { trafficSignData: SignType[] }

export type PageProps = CataloguePageProps & { countryPrefix: CountryPrefixType }

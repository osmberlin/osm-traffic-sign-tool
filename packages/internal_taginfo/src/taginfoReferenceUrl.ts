import type { CountryPrefixType } from '@osm-traffic-signs/converter'
import { countryTaginfoConfigs } from './countryTaginfoConfigs.js'

export const getTaginfoTrafficSignKeyUrl = (countryPrefix: CountryPrefixType): string => {
  const config = countryTaginfoConfigs[countryPrefix]
  if (!config) {
    return 'https://taginfo.openstreetmap.org/keys/traffic_sign'
  }

  return `https://taginfo.geofabrik.de/${config.geofabrikRegion}/keys/traffic_sign`
}

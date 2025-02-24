import { countryDefinitions } from '@osm-traffic-signs/converter'
import { PageApp } from '../_components/PageApp'
import { countryPrefix } from './_contryPrefix.const'

export default async function AppDe() {
  const trafficSignData = countryDefinitions[countryPrefix]

  return <PageApp countryPrefix={countryPrefix} trafficSignData={trafficSignData} />
}

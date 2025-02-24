import { countryDefinitions } from '@osm-traffic-signs/converter'
import { PageAllApp } from '../../_components/PageAllSigns'
import { countryPrefix } from '../_contryPrefix.const'

export default async function SignsPage() {
  const trafficSignData = countryDefinitions[countryPrefix]

  return <PageAllApp countryPrefix={countryPrefix} trafficSignData={trafficSignData} />
}

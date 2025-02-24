import { countryDefinitions } from '@osm-traffic-signs/converter'
import { PageCheckSignCombinations } from '../../_components/PageCheckSignCombinations'
import { countryPrefix } from '../_contryPrefix.const'

export default async function SignsPage() {
  const trafficSignData = countryDefinitions[countryPrefix]

  return (
    <PageCheckSignCombinations countryPrefix={countryPrefix} trafficSignData={trafficSignData} />
  )
}

import { countryPrefixes } from '@osm-traffic-signs/converter'
import { AppUseClient } from './_components/AppUseClient'

export async function generateStaticParams() {
  return countryPrefixes.map((prefx) => ({
    countryPrefix: prefx,
  }))
}

export default function App() {
  // Needs to be a "server component" so the page can be statically generated for each `countryPrefix`
  return <AppUseClient />
}

import { PageApp } from '@app/app/(signs)/_components/PageApp'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { countryDefinitions } from '@osm-traffic-signs/converter'
import { createFileRoute } from '@tanstack/react-router'

const countryPrefix = 'DE' as const

function DeIndexRouteComponent() {
  const trafficSignData = Route.useLoaderData()
  return <PageApp countryPrefix={countryPrefix} trafficSignData={trafficSignData} />
}

export const Route = createFileRoute('/DE/')({
  loader: () => countryDefinitions[countryPrefix],
  validateSearch: deSearchSchema,
  component: DeIndexRouteComponent,
})

import { PageAllApp } from '@app/app/(signs)/_components/PageAllSigns'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { countryDefinitions } from '@osm-traffic-signs/converter'
import { createFileRoute } from '@tanstack/react-router'

const countryPrefix = 'DE' as const

function DeSignsRouteComponent() {
  const trafficSignData = Route.useLoaderData()
  return <PageAllApp countryPrefix={countryPrefix} trafficSignData={trafficSignData} />
}

export const Route = createFileRoute('/DE/signs')({
  loader: () => countryDefinitions[countryPrefix],
  validateSearch: deSearchSchema,
  component: DeSignsRouteComponent,
})

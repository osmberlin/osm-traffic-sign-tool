import { PageCheckSignCombinations } from '@app/app/(signs)/_components/PageCheckSignCombinations'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { countryDefinitions } from '@osm-traffic-signs/converter'
import { createFileRoute } from '@tanstack/react-router'

const countryPrefix = 'DE' as const

function DeCheckSignCombinationsRouteComponent() {
  const trafficSignData = Route.useLoaderData()
  return (
    <PageCheckSignCombinations countryPrefix={countryPrefix} trafficSignData={trafficSignData} />
  )
}

export const Route = createFileRoute('/DE/check-sign-combinations')({
  loader: () => countryDefinitions[countryPrefix],
  validateSearch: deSearchSchema,
  component: DeCheckSignCombinationsRouteComponent,
})

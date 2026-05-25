import { PageCheckSignCombinations } from '@app/app/(signs)/_components/PageCheckSignCombinations'
import { isDev } from '@app/app/_components/utils/isDev'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { countryDefinitions } from '@osm-traffic-signs/converter'
import { createFileRoute, notFound } from '@tanstack/react-router'

const countryPrefix = 'DE' as const

function DeCheckSignCombinationsRouteComponent() {
  const trafficSignData = Route.useLoaderData()
  return (
    <PageCheckSignCombinations countryPrefix={countryPrefix} trafficSignData={trafficSignData} />
  )
}

export const Route = createFileRoute('/DE/check-sign-combinations')({
  beforeLoad: () => {
    if (!isDev) {
      throw notFound()
    }
  },
  loader: () => countryDefinitions[countryPrefix],
  validateSearch: deSearchSchema,
  component: DeCheckSignCombinationsRouteComponent,
})

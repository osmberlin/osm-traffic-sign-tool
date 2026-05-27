import { PageCheckSignCombinations } from '@app/app/(signs)/_components/PageCheckSignCombinations'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { countryDefinitions } from '@osm-traffic-signs/converter'
import { createFileRoute } from '@tanstack/react-router'

function LangCheckSignCombinationsRouteComponent() {
  const trafficSignData = Route.useLoaderData()
  const { countryPrefix } = Route.useRouteContext()
  return (
    <PageCheckSignCombinations countryPrefix={countryPrefix} trafficSignData={trafficSignData} />
  )
}

export const Route = createFileRoute('/$lang/check-sign-combinations')({
  loader: ({ context }) => countryDefinitions[context.countryPrefix],
  validateSearch: deSearchSchema,
  component: LangCheckSignCombinationsRouteComponent,
})

import { PageCheckSignCombinations } from '@app/app/(signs)/_components/PageCheckSignCombinations'
import { isDev } from '@app/app/_components/utils/isDev'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { countryDefinitions } from '@osm-traffic-signs/converter'
import { createFileRoute, notFound } from '@tanstack/react-router'

function LangCheckSignCombinationsRouteComponent() {
  const trafficSignData = Route.useLoaderData()
  const { countryPrefix } = Route.useRouteContext()
  return (
    <PageCheckSignCombinations countryPrefix={countryPrefix} trafficSignData={trafficSignData} />
  )
}

export const Route = createFileRoute('/$lang/check-sign-combinations')({
  beforeLoad: () => {
    if (!isDev) {
      throw notFound()
    }
  },
  loader: ({ context }) => countryDefinitions[context.countryPrefix],
  validateSearch: deSearchSchema,
  component: LangCheckSignCombinationsRouteComponent,
})

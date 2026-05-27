import { PageCheckSignCombinations } from '@app/app/(signs)/_components/PageCheckSignCombinations'
import * as m from '@app/paraglide/messages'
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
  head: () => ({
    meta: [{ title: `${m.page_combinations_qa_title()} — ${m.header_title()}` }],
  }),
  loader: ({ context }) => countryDefinitions[context.countryPrefix],
  validateSearch: deSearchSchema,
  component: LangCheckSignCombinationsRouteComponent,
})

import { PageAllApp } from '@app/app/(signs)/_components/PageAllSigns'
import * as m from '@app/paraglide/messages'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { countryDefinitions } from '@osm-traffic-signs/converter'
import { createFileRoute } from '@tanstack/react-router'

function LangSignsRouteComponent() {
  const trafficSignData = Route.useLoaderData()
  const { countryPrefix } = Route.useRouteContext()
  return <PageAllApp countryPrefix={countryPrefix} trafficSignData={trafficSignData} />
}

export const Route = createFileRoute('/$lang/signs')({
  head: () => ({
    meta: [{ title: `${m.footer_all_signs()} — ${m.header_title()}` }],
  }),
  loader: ({ context }) => countryDefinitions[context.countryPrefix],
  validateSearch: deSearchSchema,
  component: LangSignsRouteComponent,
})

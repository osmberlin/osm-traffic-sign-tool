import { PageApp } from '@app/app/(signs)/_components/PageApp'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { countryDefinitions } from '@osm-traffic-signs/converter'
import { createFileRoute } from '@tanstack/react-router'

function LangIndexRouteComponent() {
  const trafficSignData = Route.useLoaderData()
  const { countryPrefix } = Route.useRouteContext()
  return <PageApp countryPrefix={countryPrefix} trafficSignData={trafficSignData} />
}

export const Route = createFileRoute('/$lang/')({
  loader: ({ context }) => countryDefinitions[context.countryPrefix],
  validateSearch: deSearchSchema,
  component: LangIndexRouteComponent,
})

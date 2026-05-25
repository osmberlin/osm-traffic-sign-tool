import { PageApp } from '@app/app/(signs)/_components/PageApp'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { countryDefinitions } from '@osm-traffic-signs/converter'
import { createFileRoute } from '@tanstack/react-router'

function LangIndexRouteComponent() {
  const trafficSignData = Route.useLoaderData()
  const { countryPrefix } = Route.useRouteContext()
  return (
    <div className="mx-auto w-full max-w-6xl min-w-0 px-2">
      <PageApp countryPrefix={countryPrefix} trafficSignData={trafficSignData} />
    </div>
  )
}

export const Route = createFileRoute('/$lang/')({
  loader: ({ context }) => countryDefinitions[context.countryPrefix],
  validateSearch: deSearchSchema,
  component: LangIndexRouteComponent,
})

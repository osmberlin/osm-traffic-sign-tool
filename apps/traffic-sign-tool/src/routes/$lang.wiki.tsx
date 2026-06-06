import WikiComparisonRoutePage from '@app/app/(signs)/_components/WikiComparisonRoutePage'
import * as m from '@app/paraglide/messages'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { buildNoindexPageHead } from '@app/src/features/seo/seoHead'
import { countryDefinitions } from '@osm-traffic-signs/converter'
import { createFileRoute } from '@tanstack/react-router'

function LangWikiRouteComponent() {
  const trafficSignData = Route.useLoaderData()
  return <WikiComparisonRoutePage trafficSignData={trafficSignData} />
}

export const Route = createFileRoute('/$lang/wiki')({
  head: () => buildNoindexPageHead(m.wiki_title()),
  loader: ({ context }) => countryDefinitions[context.countryPrefix],
  validateSearch: deSearchSchema,
  component: LangWikiRouteComponent,
})

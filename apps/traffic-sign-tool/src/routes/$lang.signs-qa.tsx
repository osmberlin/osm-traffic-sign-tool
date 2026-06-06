import { PageSignsQa } from '@app/app/(signs)/_components/PageSignsQa'
import * as m from '@app/paraglide/messages'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { buildNoindexPageHead } from '@app/src/features/seo/seoHead'
import { countryDefinitions } from '@osm-traffic-signs/converter'
import { createFileRoute } from '@tanstack/react-router'

function LangSignsQaRouteComponent() {
  const trafficSignData = Route.useLoaderData()
  return <PageSignsQa trafficSignData={trafficSignData} />
}

export const Route = createFileRoute('/$lang/signs-qa')({
  head: () => buildNoindexPageHead(m.page_tagging_qa_title()),
  loader: ({ context }) => countryDefinitions[context.countryPrefix],
  validateSearch: deSearchSchema,
  component: LangSignsQaRouteComponent,
})

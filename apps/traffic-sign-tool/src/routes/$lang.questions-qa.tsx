import { PageQuestionsQa } from '@app/app/(signs)/_components/PageQuestionsQa'
import * as m from '@app/paraglide/messages'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { buildNoindexPageHead } from '@app/src/features/seo/seoHead'
import { countryDefinitions } from '@osm-traffic-signs/converter'
import { createFileRoute } from '@tanstack/react-router'

function LangQuestionsQaRouteComponent() {
  const trafficSignData = Route.useLoaderData()
  return <PageQuestionsQa trafficSignData={trafficSignData} />
}

export const Route = createFileRoute('/$lang/questions-qa')({
  head: () => buildNoindexPageHead(m.page_questions_qa_title()),
  loader: ({ context }) => countryDefinitions[context.countryPrefix],
  validateSearch: deSearchSchema,
  component: LangQuestionsQaRouteComponent,
})

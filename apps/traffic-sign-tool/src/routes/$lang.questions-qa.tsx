import { PageQuestionsQa } from '@app/app/(signs)/_components/PageQuestionsQa'
import * as m from '@app/paraglide/messages'
import { getCatalogueLabel } from '@app/src/features/i18n/catalogueLabels'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { buildNoindexPageHead } from '@app/src/features/seo/seoHead'
import {
  countryDefinitions,
  type CountryPrefixType,
  type SignType,
} from '@osm-traffic-signs/converter'
import { createFileRoute } from '@tanstack/react-router'

function LangQuestionsQaRouteComponent() {
  const trafficSignData = Route.useLoaderData() as SignType[]
  return <PageQuestionsQa trafficSignData={trafficSignData} />
}

export const Route = createFileRoute('/$lang/questions-qa')({
  head: ({ match }) => {
    const countryPrefix = match.params.lang as CountryPrefixType
    const catalogueName = getCatalogueLabel(countryPrefix)
    return buildNoindexPageHead(m.page_questions_qa_title({ catalogueName, countryPrefix }))
  },
  loader: ({ context }) => countryDefinitions[context.countryPrefix as CountryPrefixType],
  validateSearch: deSearchSchema,
  component: LangQuestionsQaRouteComponent,
})

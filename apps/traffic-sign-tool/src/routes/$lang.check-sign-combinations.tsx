import { PageCheckSignCombinations } from '@app/app/(signs)/_components/PageCheckSignCombinations'
import * as m from '@app/paraglide/messages'
import { getCatalogueLabel } from '@app/src/features/i18n/catalogueLabels'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { buildNoindexPageHead } from '@app/src/features/seo/seoHead'
import { countryDefinitions, type CountryPrefixType } from '@osm-traffic-signs/converter'
import { createFileRoute } from '@tanstack/react-router'

function LangCheckSignCombinationsRouteComponent() {
  const trafficSignData = Route.useLoaderData()
  const { countryPrefix } = Route.useRouteContext()
  return (
    <PageCheckSignCombinations countryPrefix={countryPrefix} trafficSignData={trafficSignData} />
  )
}

export const Route = createFileRoute('/$lang/check-sign-combinations')({
  head: ({ match }) => {
    const countryPrefix = match.params.lang as CountryPrefixType
    const catalogueName = getCatalogueLabel(countryPrefix)
    return buildNoindexPageHead(m.page_combinations_qa_title({ catalogueName, countryPrefix }))
  },
  loader: ({ context }) => countryDefinitions[context.countryPrefix],
  validateSearch: deSearchSchema,
  component: LangCheckSignCombinationsRouteComponent,
})

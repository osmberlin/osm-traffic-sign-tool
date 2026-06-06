import WikiComparisonRoutePage from '@app/app/(signs)/_components/WikiComparisonRoutePage'
import * as m from '@app/paraglide/messages'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { buildNoindexPageHead } from '@app/src/features/seo/seoHead'
import { createFileRoute } from '@tanstack/react-router'

function LangWikiRouteComponent() {
  return <WikiComparisonRoutePage />
}

export const Route = createFileRoute('/$lang/wiki')({
  head: () => buildNoindexPageHead(m.wiki_title()),
  validateSearch: deSearchSchema,
  component: LangWikiRouteComponent,
})

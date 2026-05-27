import WikiPage from '@app/app/(signs)/DE/wiki/page'
import * as m from '@app/paraglide/messages'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { createFileRoute } from '@tanstack/react-router'

function LangWikiRouteComponent() {
  return <WikiPage />
}

export const Route = createFileRoute('/$lang/wiki')({
  head: () => ({
    meta: [{ title: `${m.wiki_title()} — ${m.header_title()}` }],
  }),
  validateSearch: deSearchSchema,
  component: LangWikiRouteComponent,
})

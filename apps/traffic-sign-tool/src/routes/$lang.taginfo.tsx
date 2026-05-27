import TaginfoPage from '@app/app/(signs)/DE/taginfo/page'
import * as m from '@app/paraglide/messages'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { createFileRoute } from '@tanstack/react-router'

function LangTaginfoRouteComponent() {
  return <TaginfoPage />
}

export const Route = createFileRoute('/$lang/taginfo')({
  head: () => ({
    meta: [{ title: `${m.taginfo_title()} — ${m.header_title()}` }],
  }),
  validateSearch: deSearchSchema,
  component: LangTaginfoRouteComponent,
})

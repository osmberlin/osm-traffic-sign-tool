import TaginfoPage from '@app/app/(signs)/DE/taginfo/page'
import * as m from '@app/paraglide/messages'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { buildNoindexPageHead } from '@app/src/features/seo/seoHead'
import { createFileRoute } from '@tanstack/react-router'

function LangTaginfoRouteComponent() {
  return <TaginfoPage />
}

export const Route = createFileRoute('/$lang/taginfo')({
  head: () => buildNoindexPageHead(m.taginfo_title()),
  validateSearch: deSearchSchema,
  component: LangTaginfoRouteComponent,
})

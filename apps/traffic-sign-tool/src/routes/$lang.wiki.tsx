import WikiPage from '@app/app/(signs)/DE/wiki/page'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { createFileRoute } from '@tanstack/react-router'

function LangWikiRouteComponent() {
  return <WikiPage />
}

export const Route = createFileRoute('/$lang/wiki')({
  validateSearch: deSearchSchema,
  component: LangWikiRouteComponent,
})

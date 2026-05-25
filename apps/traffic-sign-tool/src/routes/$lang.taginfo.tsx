import TaginfoPage from '@app/app/(signs)/DE/taginfo/page'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { createFileRoute } from '@tanstack/react-router'

function LangTaginfoRouteComponent() {
  return <TaginfoPage />
}

export const Route = createFileRoute('/$lang/taginfo')({
  validateSearch: deSearchSchema,
  component: LangTaginfoRouteComponent,
})

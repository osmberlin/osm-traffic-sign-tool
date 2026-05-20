import TaginfoPage from '@app/app/(signs)/DE/taginfo/page'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { createFileRoute } from '@tanstack/react-router'

function DeTaginfoRouteComponent() {
  return <TaginfoPage />
}

export const Route = createFileRoute('/DE/taginfo')({
  validateSearch: deSearchSchema,
  component: DeTaginfoRouteComponent,
})

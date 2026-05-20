import WikiPage from '@app/app/(signs)/DE/wiki/page'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { createFileRoute } from '@tanstack/react-router'

function DeWikiRouteComponent() {
  return <WikiPage />
}

export const Route = createFileRoute('/DE/wiki')({
  validateSearch: deSearchSchema,
  component: DeWikiRouteComponent,
})

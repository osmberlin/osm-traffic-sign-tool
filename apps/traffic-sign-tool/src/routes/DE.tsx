import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { createFileRoute, Outlet } from '@tanstack/react-router'

function DeLayoutComponent() {
  return <Outlet />
}

export const Route = createFileRoute('/DE')({
  validateSearch: deSearchSchema,
  component: DeLayoutComponent,
})

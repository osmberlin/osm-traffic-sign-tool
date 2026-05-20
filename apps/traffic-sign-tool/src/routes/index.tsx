import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: ({ search }) => {
    throw redirect({
      replace: true,
      search: {
        ...(search.q ? { q: search.q } : {}),
        ...(search.signs ? { signs: search.signs } : {}),
      },
      to: '/DE',
    })
  },
  validateSearch: deSearchSchema,
  component: () => null,
})

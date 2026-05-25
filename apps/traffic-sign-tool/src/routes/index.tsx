import { defaultLang } from '@app/src/features/routing/lang'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: ({ search }) => {
    throw redirect({
      // TODO: replace with country picker once more langs are available.
      to: '/$lang',
      params: { lang: defaultLang },
      replace: true,
      search: {
        ...(search.q ? { q: search.q } : {}),
        ...(search.signs ? { signs: search.signs } : {}),
        ...(search.focus ? { focus: search.focus } : {}),
      },
    })
  },
  validateSearch: deSearchSchema,
  component: () => null,
})

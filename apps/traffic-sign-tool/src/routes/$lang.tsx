import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { isSupportedLang } from '@app/src/features/routing/lang'
import { createFileRoute, notFound, Outlet, redirect } from '@tanstack/react-router'

function LangLayoutComponent() {
  return <Outlet />
}

export const Route = createFileRoute('/$lang')({
  beforeLoad: ({ location, params }) => {
    if (!isSupportedLang(params.lang)) {
      throw notFound()
    }

    if (location.pathname === `/${params.lang}/`) {
      throw redirect({
        to: '/$lang',
        params: { lang: params.lang },
        replace: true,
        search: location.search,
      })
    }

    return { countryPrefix: params.lang }
  },
  validateSearch: deSearchSchema,
  component: LangLayoutComponent,
})

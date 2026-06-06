import { isSupportedLang } from '@app/src/features/routing/lang'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import type { CountryPrefixType } from '@osm-traffic-signs/converter'
import { createFileRoute, notFound, Outlet, redirect } from '@tanstack/react-router'

/**
 * Sign catalogue routes under `/$lang/…`.
 *
 * `params.lang` is the catalogue country prefix (e.g. `DE`), not the UI language.
 * UI locale is managed separately by Paraglide + `useUiLocale` (localStorage).
 */
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

    return { countryPrefix: params.lang as CountryPrefixType }
  },
  validateSearch: deSearchSchema,
  component: Outlet,
})

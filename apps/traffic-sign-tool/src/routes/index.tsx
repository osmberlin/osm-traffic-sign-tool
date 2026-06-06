import { CataloguePickerPage } from '@app/app/_components/CataloguePickerPage'
import { readCataloguePreference } from '@app/src/features/routing/cataloguePreference'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { createFileRoute, redirect } from '@tanstack/react-router'

const preserveIndexSearch = (search: { q?: string; signs?: string; focus?: string }) => ({
  ...(search.q ? { q: search.q } : {}),
  ...(search.signs ? { signs: search.signs } : {}),
  ...(search.focus ? { focus: search.focus } : {}),
})

export const Route = createFileRoute('/')({
  beforeLoad: ({ search }) => {
    const preference = readCataloguePreference()
    if (preference) {
      throw redirect({
        to: '/$lang',
        params: { lang: preference },
        replace: true,
        search: preserveIndexSearch(search),
      })
    }
  },
  validateSearch: deSearchSchema,
  component: CataloguePickerPage,
})

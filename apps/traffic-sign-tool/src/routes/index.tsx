import { CataloguePickerPage } from '@app/app/_components/CataloguePickerPage'
import { readCataloguePreference } from '@app/src/features/routing/cataloguePreference'
import { buildIndexPreferenceRedirect } from '@app/src/features/routing/indexRouteRedirect'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: ({ search }) => {
    const redirectOptions = buildIndexPreferenceRedirect(readCataloguePreference(), search)
    if (redirectOptions) {
      throw redirect(redirectOptions)
    }
  },
  validateSearch: deSearchSchema,
  component: CataloguePickerPage,
})

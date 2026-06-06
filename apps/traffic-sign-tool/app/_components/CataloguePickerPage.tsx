import { CatalogueOptionList } from '@app/app/_components/i18n/CatalogueOptionList'
import * as m from '@app/paraglide/messages'
import { writeCataloguePreference } from '@app/src/features/routing/cataloguePreference'
import type { CountryPrefixType } from '@osm-traffic-signs/converter'
import { useSearch } from '@tanstack/react-router'

export const CataloguePickerPage = () => {
  const search = useSearch({ from: '/' })

  const getLinkProps = (countryPrefix: CountryPrefixType) => ({
    linkTo: '/$lang',
    linkParams: { lang: countryPrefix },
    linkSearch: {
      ...(search.q ? { q: search.q } : {}),
      ...(search.signs ? { signs: search.signs } : {}),
      ...(search.focus ? { focus: search.focus } : {}),
    },
  })

  return (
    <div className="mx-auto w-full max-w-md px-4 pb-12">
      <div className="overflow-hidden rounded-2xl bg-stone-700 p-4 text-sm shadow-lg ring-1 ring-stone-600/80">
        <h2 className="mb-4 text-base font-semibold text-stone-100">
          {m.page_catalogue_picker_title()}
        </h2>
        <CatalogueOptionList
          getLinkProps={getLinkProps}
          onNavigate={writeCataloguePreference}
          badgeMode="iconic"
        />
      </div>
    </div>
  )
}

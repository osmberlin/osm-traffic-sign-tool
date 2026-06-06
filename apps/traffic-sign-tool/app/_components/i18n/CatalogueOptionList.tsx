import { CatalogueIconicSign } from '@app/app/_components/i18n/CatalogueIconicSign'
import { LangSwitcherOption } from '@app/app/_components/i18n/LangSwitcherOption'
import { MaturityLabel } from '@app/app/_components/MaturityLabel'
import * as m from '@app/paraglide/messages'
import {
  countries,
  getCatalogueDisplayName,
  getCatalogueMaturity,
  isVisibleMaturity,
  type CountryPrefixType,
} from '@osm-traffic-signs/converter'

type CatalogueOptionListProps = {
  selectedCountry?: CountryPrefixType | null
  onSelect: (countryPrefix: CountryPrefixType) => void
  badgeMode: 'prefix' | 'iconic'
}

const getCatalogueLabel = (countryPrefix: CountryPrefixType) =>
  countryPrefix === 'DE'
    ? m.lang_switcher_sign_catalogue_de_name()
    : getCatalogueDisplayName(countryPrefix)

export const CatalogueOptionList = ({
  selectedCountry,
  onSelect,
  badgeMode,
}: CatalogueOptionListProps) => {
  return (
    <ul className="space-y-1">
      {countries.map((countryPrefix) => {
        const label = getCatalogueLabel(countryPrefix)
        const catalogueMaturity = getCatalogueMaturity(countryPrefix)
        return (
          <LangSwitcherOption
            key={countryPrefix}
            badge={
              badgeMode === 'iconic' ? (
                <CatalogueIconicSign
                  countryPrefix={countryPrefix}
                  className="size-9 object-contain"
                />
              ) : (
                countryPrefix
              )
            }
            ariaLabel={label}
            label={
              <span className="flex flex-wrap items-center gap-2">
                <span>{label}</span>
                {isVisibleMaturity(catalogueMaturity) ? (
                  <MaturityLabel maturity={catalogueMaturity} />
                ) : null}
              </span>
            }
            isSelected={selectedCountry != null && selectedCountry === countryPrefix}
            onClick={() => onSelect(countryPrefix)}
          />
        )
      })}
    </ul>
  )
}

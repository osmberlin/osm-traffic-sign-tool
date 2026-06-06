import { CatalogueIconicSign } from '@app/app/_components/i18n/CatalogueIconicSign'
import { LangSwitcherOption } from '@app/app/_components/i18n/LangSwitcherOption'
import { MaturityLabel } from '@app/app/_components/MaturityLabel'
import * as m from '@app/paraglide/messages'
import { getLocale } from '@app/paraglide/runtime'
import { getCatalogueLabel } from '@app/src/features/i18n/catalogueLabels'
import {
  countries,
  getCatalogueMaturity,
  isVisibleMaturity,
  type CountryPrefixType,
} from '@osm-traffic-signs/converter'

export type CatalogueOptionLinkProps = {
  linkTo: string
  linkParams?: Record<string, string>
  linkSearch?: Record<string, unknown>
}

type CatalogueOptionListProps = {
  selectedCountry?: CountryPrefixType | null
  getLinkProps: (countryPrefix: CountryPrefixType) => CatalogueOptionLinkProps
  onNavigate?: (countryPrefix: CountryPrefixType) => void
  badgeMode: 'prefix' | 'iconic'
}

export const CatalogueOptionList = ({
  selectedCountry,
  getLinkProps,
  onNavigate,
  badgeMode,
}: CatalogueOptionListProps) => {
  return (
    <ul className="space-y-1">
      {[...countries]
        .sort((a, b) =>
          getCatalogueLabel(a).localeCompare(getCatalogueLabel(b), getLocale(), {
            sensitivity: 'base',
          }),
        )
        .map((countryPrefix) => {
          const label = getCatalogueLabel(countryPrefix)
          const catalogueMaturity = getCatalogueMaturity(countryPrefix)
          const { linkTo, linkParams, linkSearch } = getLinkProps(countryPrefix)
          return (
            <LangSwitcherOption
              key={countryPrefix}
              badgeVariant={badgeMode === 'iconic' ? 'plain' : 'boxed'}
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
                <span className="flex w-full items-center justify-between gap-2">
                  <span>{label}</span>
                  {isVisibleMaturity(catalogueMaturity) ? (
                    <MaturityLabel maturity={catalogueMaturity} />
                  ) : null}
                </span>
              }
              isSelected={selectedCountry != null && selectedCountry === countryPrefix}
              linkTo={linkTo}
              linkParams={linkParams}
              linkSearch={linkSearch}
              onNavigate={() => onNavigate?.(countryPrefix)}
            />
          )
        })}
    </ul>
  )
}

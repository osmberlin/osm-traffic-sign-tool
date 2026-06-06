import { useCountryPrefix } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import { useParamFocus } from '@app/app/(signs)/_components/store/useParamFocus.search'
import { MaturityInfoBadge, MaturityLinkBadge } from '@app/app/_components/MaturityLabel'
import * as m from '@app/paraglide/messages'
import { signCategoryEntries } from '@app/src/features/i18n/signCategoryLabels'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import {
  activeCatalogueFocusView,
  filterSignsByFocus,
  getCatalogueMaturity,
  hasQaCapability,
  isVisibleMaturity,
  isHighlightedInView,
  SignType,
} from '@osm-traffic-signs/converter'
import { SearchSignInput } from './signGroups/SearchSignInput'
import { SignGrid } from './signGroups/SignGrid'
import { SignGridSearchQuery } from './signGroups/SignGridSearchQuery'

type Props = { trafficSignData: SignType[] }

export const SignSelectionColumn = ({ trafficSignData }: Props) => {
  const lang = useCurrentLang()
  const { countryPrefix } = useCountryPrefix()
  const { focuses } = useParamFocus()
  const catalogueMaturity = getCatalogueMaturity(countryPrefix)
  const showTaggingQaLink = hasQaCapability(countryPrefix, 'taggingQa')

  const displaySigns = filterSignsByFocus(trafficSignData, focuses)
  const activeView = activeCatalogueFocusView(focuses)

  const signsFeatured =
    activeView === null ? [] : displaySigns.filter((sign) => isHighlightedInView(sign, activeView))

  const featuredIds = new Set(signsFeatured.map((s) => s.osmValuePart))

  const groupedSigns: Map<SignType['catalogue']['signCategory'], SignType[]> = new Map([])
  displaySigns
    .filter((sign) => !featuredIds.has(sign.osmValuePart))
    .forEach((sign) => {
      const category = sign.catalogue.signCategory
      groupedSigns.set(category, [...(groupedSigns.get(category) || []), sign])
    })

  return (
    <>
      <div className="mb-4 flex w-full flex-col gap-3 @sm/sign-selection:flex-row @sm/sign-selection:items-start @sm/sign-selection:justify-between">
        <div className="flex shrink-0 flex-col gap-1">
          <h2 className="flex flex-wrap items-center gap-2 text-lg font-light text-black uppercase">
            {m.page_choose_signs()}
            {isVisibleMaturity(catalogueMaturity) ? (
              showTaggingQaLink ? (
                <MaturityLinkBadge
                  maturity={catalogueMaturity}
                  lang={lang}
                  to="/$lang/signs-qa"
                  tooltip={m.tagging_qa_maturity_tooltip()}
                />
              ) : (
                <MaturityInfoBadge maturity={catalogueMaturity} />
              )
            ) : null}
          </h2>
        </div>
        <div className="w-full @sm/sign-selection:w-auto">
          <SearchSignInput />
        </div>
      </div>

      <SignGridSearchQuery trafficSignData={trafficSignData} />

      {signsFeatured.length > 0 ? (
        <SignGrid headline={m.sign_grid_frequently_used()} signs={signsFeatured} />
      ) : null}

      {signCategoryEntries().map(([category, headline]) => {
        const signs = groupedSigns.get(category)
        return signs?.length ? <SignGrid key={category} headline={headline} signs={signs} /> : null
      })}
    </>
  )
}

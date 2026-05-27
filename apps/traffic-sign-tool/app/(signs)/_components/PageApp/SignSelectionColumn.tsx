import { useParamFocus } from '@app/app/(signs)/_components/store/useParamFocus.search'
import * as m from '@app/paraglide/messages'
import { signCategoryEntries } from '@app/src/features/i18n/signCategoryLabels'
import {
  activeCatalogueFocusView,
  filterSignsByFocus,
  isHighlightedInView,
  SignType,
} from '@osm-traffic-signs/converter'
import { SearchSignInput } from './signGroups/SearchSignInput'
import { SignGrid } from './signGroups/SignGrid'
import { SignGridSearchQuery } from './signGroups/SignGridSearchQuery'

type Props = { trafficSignData: SignType[] }

export const SignSelectionColumn = ({ trafficSignData }: Props) => {
  const { focuses } = useParamFocus()

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
        <h2 className="shrink-0 text-lg font-light text-black uppercase">
          {m.page_choose_signs()}
        </h2>
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

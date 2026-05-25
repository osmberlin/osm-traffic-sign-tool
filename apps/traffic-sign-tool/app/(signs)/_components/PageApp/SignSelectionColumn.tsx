import { useParamFocus } from '@app/app/(signs)/_components/store/useParamFocus.search'
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

const signGroupTranslations: Map<SignType['catalogue']['signCategory'], string> = new Map([
  ['traffic_sign', 'Verkehrszeichen'],
  ['exception_modifier', 'Zusatzzeichen'],
  ['condition_modifier', 'Zusatzzeichen Einschränkungen'],
  ['direction_modifier', 'Pfeile'],
  ['speed', 'Geschwindigkeitsbeschränkungen'],
  ['hazard_sign', 'Gefahrenzeichen'],
  ['surface_sign', 'Straßenoberfläche'],
  ['object_sign', 'Objektmarkierungen'],
  ['signpost', 'Wegweiser / Umleitung'],
])

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
        <h2 className="shrink-0 text-lg font-light text-black uppercase">Choose Signs</h2>
        <div className="w-full @sm/sign-selection:w-auto">
          <SearchSignInput />
        </div>
      </div>

      <SignGridSearchQuery trafficSignData={trafficSignData} />

      {signsFeatured.length > 0 ? (
        <SignGrid headline="Häufig verwendet" signs={signsFeatured} />
      ) : null}

      {Array.from(signGroupTranslations).map(([category, headline]) => {
        const signs = groupedSigns.get(category)
        return signs?.length ? <SignGrid key={category} headline={headline} signs={signs} /> : null
      })}
    </>
  )
}

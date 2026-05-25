import { useParamFocus } from '@app/app/(signs)/_components/store/useParamFocus.search'
import { SignType } from '@osm-traffic-signs/converter'
import { filterSignsByFocus } from './signGroups/focusFilter'
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
  // ['object_sign', ''], // search only
  // ['signpost', ''], // search only
])

export const SignSelectionColumn = ({ trafficSignData }: Props) => {
  const { focuses } = useParamFocus()

  // Data
  const displaySigns = filterSignsByFocus(trafficSignData, focuses)
  const signsMostUsed = displaySigns.filter((sign) => sign.catalogue.visibility === 'highlight')

  // Group data
  const groupedSigns: Map<SignType['catalogue']['signCategory'], SignType[]> = new Map([])
  displaySigns
    .filter((sign) => sign.catalogue.visibility !== 'highlight')
    .forEach((sign) => {
      const category = sign.catalogue.signCategory
      groupedSigns.set(category, [...(groupedSigns.get(category) || []), sign])
    })

  const uncategorizedAndSearchOnly = displaySigns.filter((sign) => {
    return ![
      ...signsMostUsed,
      // all the grouped signs
      ...Array.from(groupedSigns)
        .map((line) => line[1])
        .flat(),
    ]
      .map((s) => s.osmValuePart)
      .includes(sign.osmValuePart)
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

      <SignGrid headline="Häufig verwendet" signs={signsMostUsed} />

      {Array.from(signGroupTranslations).map(([category, headline]) => {
        const signs = groupedSigns.get(category)
        return signs?.length ? <SignGrid key={category} headline={headline} signs={signs} /> : null
      })}

      {/* Lists all those `search only` signs */}
      <SignGrid headline="Weitere" defaultOpen={false} signs={uncategorizedAndSearchOnly} />
    </>
  )
}

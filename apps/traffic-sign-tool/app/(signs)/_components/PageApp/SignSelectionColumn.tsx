import { SignType } from '@osm-traffic-signs/converter'
import { SearchSignInput } from './signGroups/SearchSignInput'
import { SignGrid } from './signGroups/SignGrid'
import { SignGridSearchQuery } from './signGroups/SignGridSearchQuery'

type Props = { trafficSignData: SignType[] }

const signGroupTranslations: Map<SignType['catalogue']['signCategory'], string> = new Map([
  ['traffic_sign', 'Verkehrszeichen'],
  ['exception_modifier', 'Zusatzzeichen'],
  ['condition_modifier', 'Zusatzzeichen Einschränkungen'],
  ['speed', 'Geschwindigkeitsbeschränkungen'],
  ['hazard_sign', 'Gefahrenzeichen'],
  ['surface_sign', 'Straßenoberfläche'],
  // ['object_sign', ''], // search only
  // ['signpost', ''], // search only
])

export const SignSelectionColumn = ({ trafficSignData }: Props) => {
  // Data
  const displaySigns = trafficSignData.filter((sign) => sign.catalogue.visibility !== 'search_only')
  const signsMostUsed = displaySigns.filter((sign) => sign.catalogue.visibility === 'highlight')

  // Group data
  const groupedSigns: Map<SignType['catalogue']['signCategory'], SignType[]> = new Map([])
  displaySigns
    .filter((sign) => sign.catalogue.visibility !== 'highlight')
    .forEach((sign) => {
      const category = sign.catalogue.signCategory
      groupedSigns.set(category, [...(groupedSigns.get(category) || []), sign])
    })

  const uncategorizedAndSearchOnly = trafficSignData.filter((sign) => {
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
      <div className="flex items-start justify-between">
        <h2 className="mb-4 text-lg font-light text-black uppercase">Choose Signs</h2>
        <SearchSignInput />
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

import { SignType } from '@osm-traffic-signs/converter'
import { SearchSignInput } from './signGroups/SearchSignInput'
import { SignGrid } from './signGroups/SignGrid'
import { SignGridSearchQuery } from './signGroups/SignGridSearchQuery'

type Props = { trafficSignData: SignType[] }

export const SignSelectionColumn = ({ trafficSignData }: Props) => {
  // Data
  const signsMostUsed = trafficSignData.filter((sign) => sign.catalogue.visibility === 'highlight')
  const signsCatSigns = trafficSignData.filter(
    (sign) =>
      sign.catalogue.signCategory === 'traffic_sign' &&
      sign.catalogue.visibility !== 'highlight' &&
      sign.catalogue.visibility !== 'search_only',
  )
  const signsCatExceptionModifiers = trafficSignData.filter(
    (sign) =>
      sign.catalogue.signCategory === 'exception_modifier' &&
      sign.catalogue.visibility !== 'search_only',
  )
  const signsCatConditionModifiers = trafficSignData.filter(
    (sign) =>
      sign.catalogue.signCategory === 'condition_modifier' &&
      sign.catalogue.visibility !== 'search_only',
  )
  const signsCatHazard = trafficSignData.filter(
    (sign) =>
      sign.catalogue.signCategory === 'hazard_sign' && sign.catalogue.visibility !== 'search_only',
  )
  const rest = trafficSignData.filter(
    (sign) =>
      ![
        ...signsMostUsed,
        ...signsCatSigns,
        ...signsCatExceptionModifiers,
        ...signsCatConditionModifiers,
        ...signsCatHazard,
      ]
        .map((s) => s.osmValuePart)
        .includes(sign.osmValuePart),
  )

  return (
    <>
      <div className="flex items-start justify-between">
        <h2 className="mb-4 text-lg font-light uppercase text-black">Choose Signs</h2>
        <SearchSignInput />
      </div>

      <SignGridSearchQuery trafficSignData={trafficSignData} />

      <SignGrid headline="Häufig verwendet" signs={signsMostUsed} />

      <SignGrid headline="Kategorie Verkehrszeichen" signs={signsCatSigns} />

      <SignGrid headline="Zusatzzeichen" signs={signsCatExceptionModifiers} />

      <SignGrid headline="Zusatzzeichen Einschränkungen" signs={signsCatConditionModifiers} />

      <SignGrid headline="Gefahrenzeichen" signs={signsCatHazard} />

      <SignGrid headline="Weitere" defaultOpen={false} signs={rest} />
    </>
  )
}

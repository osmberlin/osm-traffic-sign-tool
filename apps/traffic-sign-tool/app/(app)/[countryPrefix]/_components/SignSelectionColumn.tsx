'use client'
import { trafficSignData } from '@monorepo/packages/traffic-sign-converter/dist'
import { SearchSignInput } from './signGroups/SearchSignInput'
import { SignGrid } from './signGroups/SignGrid'
import { SignGridSearchQuery } from './signGroups/SignGridSearchQuery'

export const SignSelectionColumn = () => {
  // Data
  const signsMostUsed = trafficSignData.filter((sign) => sign.catalogue.visibility === 'highlight')
  const signsCatSigns = trafficSignData.filter(
    (sign) =>
      sign.catalogue.signCategory === 'traffic_sign' &&
      sign.catalogue.visibility !== 'highlight' &&
      sign.catalogue.visibility !== 'search_only',
  )
  const signsCatModifiers = trafficSignData.filter(
    (sign) =>
      sign.catalogue.signCategory === 'modifier_sign' &&
      sign.catalogue.visibility !== 'search_only',
  )
  const signsCatModifierRestrictions = trafficSignData.filter(
    (sign) =>
      sign.catalogue.signCategory === 'modifier_sign_restriction' &&
      sign.catalogue.visibility !== 'search_only',
  )
  const rest = trafficSignData.filter(
    (sign) =>
      ![...signsMostUsed, ...signsCatSigns, ...signsCatModifiers, ...signsCatModifierRestrictions]
        .map((s) => s.osmValuePart)
        .includes(sign.osmValuePart),
  )

  return (
    <>
      <div className="flex items-start justify-between">
        <h2 className="mb-4 text-lg font-light uppercase text-black">Choose Signs</h2>
        <SearchSignInput />
      </div>

      <SignGridSearchQuery />

      <SignGrid headline="Häufig verwendet" signs={signsMostUsed} />

      <SignGrid headline="Kategorie Verkehrszeichen" signs={signsCatSigns} />

      <SignGrid headline="Zusatzzeichen" signs={signsCatModifiers} />

      <SignGrid headline="Zusatzzeichen Einschränkungen" signs={signsCatModifierRestrictions} />

      <SignGrid headline="Weitere" defaultOpen={false} signs={rest} />
    </>
  )
}

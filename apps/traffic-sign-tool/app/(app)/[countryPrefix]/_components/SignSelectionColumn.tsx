'use client'
import { trafficSignData } from '@monorepo/packages/traffic-sign-converter/dist'
import { SearchSignInput } from './signGroups/SearchSignInput'
import { SignGrid } from './signGroups/SignGrid'
import { SignGridSearchQuery } from './signGroups/SignGridSearchQuery'

export const SignSelectionColumn = () => {
  // Data
  const signsMostUsed = trafficSignData.filter(
    (sign) => 'mostUsed' in sign && sign.mostUsed === true,
  )
  const signsCatSigns = trafficSignData.filter(
    (sign) => sign.category === 'traffic_sign' && !('mostUsed' in sign),
  )
  const signsCatModifiers = trafficSignData.filter((sign) => sign.category === 'modifier_sign')
  const signsCatModifierRestrictions = trafficSignData.filter(
    (sign) => sign.category === 'modifier_sign_restriction',
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
    </>
  )
}

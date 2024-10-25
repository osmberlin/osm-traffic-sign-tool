'use client'
import { SelectedSigns } from '@app/app/_components/signs/SelectedSigns'
import { SignGrid } from '@app/app/_components/signs/SignGrid'
import { trafficSignData } from '@monorepo/packages/traffic-sign-converter/dist'
import { StateHelper } from '../../../_components/layout/StateHelper'
import { SearchSignInput } from '../../../_components/signs/SearchSignInput'
import { SignGridSearchQuery } from '../../../_components/signs/SignGridSearchQuery'
import { useParamSigns } from '../../../_store/useParamSigns.nuqs'
import { ResultColumn } from './ResultColumn'

export const AppUseClient = () => {
  const { paramSigns } = useParamSigns()

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
      <main className="flex gap-4">
        <section className="rounded bg-stone-300 px-6 py-4">
          <div className="flex items-start justify-between">
            <h2 className="mb-4 text-lg font-light uppercase text-black">Choose Signs</h2>
            <SearchSignInput />
          </div>

          <SignGridSearchQuery />
          <SignGrid headline="Häufig verwendet" signs={signsMostUsed} />

          <SignGrid headline="Kategorie Verkehrszeichen" signs={signsCatSigns} />

          <SignGrid headline="Zusatzzeichen" signs={signsCatModifiers} />

          <SignGrid headline="Zusatzzeichen Einschränkungen" signs={signsCatModifierRestrictions} />
        </section>

        <section className="w-56 flex-none rounded bg-stone-300 py-4">
          <h2 className="mb-4 text-center text-lg font-light uppercase">Selected Signs</h2>

          <SelectedSigns />
        </section>

        <section className="w-96 flex-none rounded bg-stone-900 px-4 py-4 text-stone-100">
          <ResultColumn />
        </section>
      </main>

      <StateHelper state={{ paramSigns }} />
    </>
  )
}

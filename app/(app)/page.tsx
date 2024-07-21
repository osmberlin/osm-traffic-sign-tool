'use client'
import { trafficSigns as signStore } from '@/data/trafficSigns'
import { ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import { parseAsString, useQueryState } from 'nuqs'
import { StateHelper } from '../_components/layout/StateHelper'
import { CopyButton } from '../_components/links/CopyButton'
import { SelectedSign } from '../_components/signs/SelectedSign'
import { SignGrid } from '../_components/signs/SignGrid'
import { aggregateComments } from '../_components/signs/utils/aggregateComments'
import { aggregateTags } from '../_components/signs/utils/aggregateTags'
import { Tag } from '../_components/wiki/Tag'
import { WikiLinkify } from '../_components/wiki/WikiLinkify'
import { useParamSigns } from '../_store/useParamSigns.nuqs'

export default function App() {
  const [paramQ, setParamQ] = useQueryState('q', parseAsString)
  const { paramSigns } = useParamSigns()

  // Rendering signs: Update
  const searchSigns = signStore.filter((sign) => {
    if (!paramQ) return true
    return (
      sign.signKey.toLocaleLowerCase().includes(paramQ) ||
      sign.descriptiveName?.toLocaleLowerCase()?.includes(paramQ) ||
      sign.description?.toLocaleLowerCase()?.includes(paramQ)
    )
  })
  const selectedSigns = signStore.filter((sign) => paramSigns?.includes(sign.urlKey))
  const hasSelectedSigns = selectedSigns.length > 0
  const aggregatedTags = aggregateTags(selectedSigns)
  const aggregatedComments = aggregateComments(selectedSigns)
  // Copy signs: Update
  const copyTrafficSignTag = aggregatedTags.find(([key]) => key === 'traffic_sign')?.join('=')
  const copyAllTags = aggregatedTags.map(([key, value]) => `${key}=${value}`).join('\n')
  const trafficSignTag = copyTrafficSignTag?.split('=')
  // Debug helper: Update
  const validKeys = signStore.map((value) => value.urlKey)
  const unrecognizedKeys = paramSigns?.filter((key) => !validKeys?.includes(key))

  const signsMostUsed = signStore.filter((sign) => sign.mostUsed === true)
  const signsCatSigns = signStore.filter(
    (sign) => sign.category === 'traffic_sign' && !sign.mostUsed,
  )
  const signsCatModifiers = signStore.filter((sign) => sign.category === 'modifier_sign')
  const signsCatModifierRestrictions = signStore.filter(
    (sign) => sign.category === 'modifier_sign_restriction',
  )

  return (
    <>
      {paramSigns && unrecognizedKeys.length > 0 && (
        <section className="mb-4 rounded bg-amber-700 p-4 text-white">
          <h2 className="text-lg font-thin uppercase">
            Unrecognized keys ({unrecognizedKeys.length})
          </h2>
          <p>{unrecognizedKeys.join(', ')}</p>
        </section>
      )}
      <main className="flex gap-4">
        <section className="rounded bg-stone-300 px-6 py-4">
          <div className="flex items-start justify-between">
            <h2 className="mb-4 text-lg font-light uppercase text-black">Choose Signs</h2>
            <div className="relative -mt-1.5">
              <input
                onChange={(event) => {
                  setParamQ(event.target.value)
                }}
                name="search"
                type="text"
                autoFocus={true}
                className="block rounded-md border-0 px-2 py-1.5 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                placeholder="Search…"
              />
              {paramQ && !searchSigns.length && (
                <div className="absolute -bottom-4 right-0.5 text-xs text-indigo-700">
                  No results
                </div>
              )}
            </div>
          </div>

          {paramQ && searchSigns.length && (
            <SignGrid headline="Suchergebnisse" signs={searchSigns} />
          )}

          <SignGrid headline="Häufig verwendet" signs={signsMostUsed} />

          <SignGrid headline="Kategorie Verkehrszeichen" signs={signsCatSigns} />

          <SignGrid headline="Zusatzzeichen" signs={signsCatModifiers} />

          <SignGrid headline="Zusatzzeichen Einschränkungen" signs={signsCatModifierRestrictions} />
        </section>

        <section className="w-56 flex-none rounded bg-stone-300 py-4">
          <h2 className="mb-4 text-center text-lg font-light uppercase">Selected Signs</h2>

          <div className="-mt-2 space-y-6">
            {selectedSigns.map((sign) => {
              return <SelectedSign key={sign.key} sign={sign} />
            })}
          </div>
        </section>

        <section className="w-96 flex-none rounded bg-stone-900 px-4 py-4 text-stone-100">
          {!hasSelectedSigns && (
            <>
              <h2 className="mb-4 text-lg font-light uppercase">Recommended Tags</h2>
              <p className="font-light text-stone-400">
                Select a traffic sign to display recommended tags …
              </p>
            </>
          )}

          {hasSelectedSigns && (
            <>
              <h2 className="mb-4 text-lg font-light uppercase">Traffic sign tag</h2>
              {trafficSignTag && copyTrafficSignTag && (
                <div className="flex items-center justify-between">
                  <Tag tagKey={trafficSignTag[0]} tagValue={trafficSignTag[1]} />
                  <CopyButton text={copyTrafficSignTag}>
                    <ClipboardDocumentIcon className="size-4" />
                  </CopyButton>
                </div>
              )}

              <h2 className="mb-4 mt-10 text-lg font-light uppercase">
                Recommended <code>highway</code> tags
              </h2>

              {aggregatedTags && copyAllTags && (
                <div className="flex items-end justify-between">
                  <ul>
                    {aggregatedTags.map(([key, value]) => {
                      return (
                        <li key={key}>
                          <Tag tagKey={key} tagValue={value} />
                        </li>
                      )
                    })}
                  </ul>

                  <div>
                    <CopyButton text={copyAllTags}>
                      <ClipboardDocumentIcon className="size-4" />
                    </CopyButton>
                  </div>
                </div>
              )}

              <div className="mt-10 space-y-2">
                <h3 className="text-lg font-thin uppercase text-stone-50">Notes</h3>
                {!aggregatedComments.length && '–'}
                {aggregatedComments.map(([signKey, signTitle, comment]) => {
                  return (
                    <p
                      key={signKey}
                      className="prose-white prose-a:underline prose-a:decoration-stone-700 prose-a:underline-offset-4 hover:prose-a:decoration-stone-400 hover:prose-a:decoration-1"
                    >
                      <code
                        title={signTitle}
                        className="mr-1 inline-flex items-center rounded bg-gray-50/10 px-1.5 py-0.5 pt-1 text-xs"
                      >
                        {signKey}
                      </code>
                      <WikiLinkify text={comment} />
                    </p>
                  )
                })}
              </div>
            </>
          )}
        </section>
      </main>

      <StateHelper state={selectedSigns} />
    </>
  )
}

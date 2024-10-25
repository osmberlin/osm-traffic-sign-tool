'use client'
import { aggregateComments } from '@app/app/_components/signs/utils/aggregateComments'
import { aggregateTags } from '@app/app/_components/signs/utils/aggregateTags'
import { useParamSigns } from '@app/app/_store/useParamSigns.nuqs'
import { useCountryPrefix } from '@app/app/_store/utils/useCountryPrefix'
import { ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import { CopyButton } from '../../../_components/links/CopyButton'
import { Tag } from '../../../_components/wiki/Tag'
import { WikiLinkify } from '../../../_components/wiki/WikiLinkify'

export const ResultColumn = () => {
  const { paramSigns } = useParamSigns()
  const countryPrefix = useCountryPrefix()
  const aggregatedComments = aggregateComments(paramSigns)

  // Rendering signs
  const hasSelectedSigns = paramSigns.length > 0
  const aggregatedTags = aggregateTags(paramSigns, countryPrefix)

  // Copy signs
  const copyTrafficSignTag = aggregatedTags.find(([key]) => key === 'traffic_sign')?.join('=')
  const copyAllTags = aggregatedTags.map(([key, value]) => `${key}=${value}`).join('\n')
  const trafficSignTag = copyTrafficSignTag?.split('=')

  return (
    <>
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
            <h3 className="text-lg font-light uppercase text-stone-50">Notes</h3>
            {!aggregatedComments.length && '–'}
            {aggregatedComments.map(([signKey, signTitle, comment]) => {
              return (
                <p
                  key={signKey}
                  className="prose-white font-serif font-normal prose-a:underline prose-a:decoration-stone-700 prose-a:underline-offset-4 hover:prose-a:decoration-stone-400 hover:prose-a:decoration-1"
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
    </>
  )
}

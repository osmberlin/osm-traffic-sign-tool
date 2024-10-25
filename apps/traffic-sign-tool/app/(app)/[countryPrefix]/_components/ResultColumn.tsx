'use client'
import { WikiLinkValue } from '@app/app/_components/wiki/WikiLinkValue'
import { useParamSigns } from '@app/app/_store/useParamSigns.nuqs'
import { useCountryPrefix } from '@app/app/_store/utils/useCountryPrefix'
import { ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import {
  signToTags,
  signToTrafficSignTagValue,
  splitIntoSignValueParts,
  toTag,
} from '@osm-traffic-signs/converter'
import { CopyButton } from '../../../_components/links/CopyButton'
import { Tag } from '../../../_components/wiki/Tag'
import { ResultNotes } from './results/ResultNotes'

export const ResultColumn = () => {
  const countryPrefix = useCountryPrefix()

  // Rendering signs
  const { paramSigns } = useParamSigns()
  const hasSelectedSigns = paramSigns.length > 0
  const aggregatedTagsMap = signToTags(paramSigns, countryPrefix)

  // Copy signs
  const copyTrafficSignTag = toTag({
    key: 'traffic_sign',
    value: signToTrafficSignTagValue(paramSigns, countryPrefix),
  })
  const copyAllTags = Array.from(aggregatedTagsMap)
    .map(([key, value]) => toTag({ key, value: Array.isArray(value) ? value.join(';') : value }))
    .join('\n')
  const trafficSignTag = copyTrafficSignTag?.split('=')

  if (!countryPrefix) return null

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
            <>
              <div className="flex items-center justify-between break-all">
                <Tag tagKey={trafficSignTag[0]} tagValue={trafficSignTag[1]} />
                <CopyButton text={copyTrafficSignTag}>
                  <ClipboardDocumentIcon className="size-4" />
                </CopyButton>
              </div>
              <p className="space-x-2 text-xs">
                <strong>Wiki:</strong>
                {splitIntoSignValueParts(trafficSignTag[1]).map((part) => {
                  return (
                    <span key={part}>
                      <WikiLinkValue
                        osmKey={trafficSignTag[0]}
                        osmValue={
                          part.startsWith(countryPrefix) ? part : `${countryPrefix}:${part}`
                        }
                      />
                    </span>
                  )
                })}
              </p>
            </>
          )}

          <h2 className="mb-4 mt-10 text-lg font-light uppercase">
            Recommended <code>highway</code> tags
          </h2>

          <div className="-mx-2 flex items-end justify-between">
            <ul>
              {Array.from(aggregatedTagsMap).map(([key, value]) => {
                return (
                  <li key={key} className="rounded px-2 py-0.5 leading-tight hover:bg-white/5">
                    <Tag tagKey={key} tagValue={value} />
                  </li>
                )
              })}
            </ul>

            {copyAllTags && (
              <div>
                <CopyButton text={copyAllTags}>
                  <ClipboardDocumentIcon className="size-4" />
                </CopyButton>
              </div>
            )}
          </div>

          <ResultNotes />
        </>
      )}
    </>
  )
}

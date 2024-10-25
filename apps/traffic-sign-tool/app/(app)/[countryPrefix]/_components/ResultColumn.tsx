'use client'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import { wikiLinkClasses, WikiLinkValue } from '@app/app/_components/wiki/WikiLinkValue'
import { useParamSigns } from '@app/app/_store/useParamSigns.nuqs'
import { useCountryPrefix } from '@app/app/_store/utils/useCountryPrefix'
import { ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import {
  signToTrafficSignTagValue,
  splitIntoSignValueParts,
  toTag,
} from '@osm-traffic-signs/converter'
import { CopyButton } from '../../../_components/links/CopyButton'
import { Tag } from '../../../_components/wiki/Tag'
import { ResultNotes } from './results/ResultNotes'
import { ResultTagRecommendations } from './results/ResultTagRecommendations'

export const ResultColumn = () => {
  const countryPrefix = useCountryPrefix()

  // Rendering signs
  const { paramSigns } = useParamSigns()
  const hasSelectedSigns = paramSigns.length > 0

  // Copy signs
  const copyTrafficSignTag = toTag({
    key: 'traffic_sign',
    value: signToTrafficSignTagValue(paramSigns, countryPrefix),
  })
  const trafficSignTag = copyTrafficSignTag?.split('=')

  const splitTrafficSignValues = splitIntoSignValueParts(trafficSignTag[1])

  const deOsmToolsLink = () => {
    // Param cannot be excaped or its ignored…
    return `http://osmtools.de/traffic_signs/?signs=${splitTrafficSignValues.map((v) => v.replace(`DE:`, '')).join(',')}`
  }

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
                {splitTrafficSignValues.map((part) => {
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

                {countryPrefix === 'DE' && (
                  <ExternalLink href={deOsmToolsLink()} blank className={wikiLinkClasses}>
                    osmtools.de
                  </ExternalLink>
                )}
              </p>
            </>
          )}

          <ResultTagRecommendations />

          <ResultNotes />
        </>
      )}
    </>
  )
}

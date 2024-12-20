'use client'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import { osmtoolsUrl } from '@app/app/_components/links/osmtoolsUrl'
import { WikiLinkListTrafficSignValues } from '@app/app/_components/wiki/WikiLinkListTrafficSignValues'
import { wikiLinkClasses } from '@app/app/_components/wiki/WikiLinkValue'
import { useParamSigns } from '@app/app/_store/useParamSigns.nuqs'
import { useCountryPrefix } from '@app/app/_store/utils/useCountryPrefix'
import { ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import { signToTrafficSignTagValue, toTag } from '@osm-traffic-signs/converter'
import { CopyButton } from '../../../../_components/links/CopyButton'
import { Tag } from '../../../../_components/wiki/Tag'

export const ResultTrafficSignTag = () => {
  const countryPrefix = useCountryPrefix()
  const { paramSigns } = useParamSigns()

  // Copy signs
  const copyTrafficSignTag = toTag({
    key: 'traffic_sign',
    value: signToTrafficSignTagValue(paramSigns, countryPrefix),
  })
  const trafficSignTag = copyTrafficSignTag?.split('=')

  if (!countryPrefix) return null

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-light uppercase">Traffic sign tag</h2>
        <CopyButton text={copyTrafficSignTag}>
          <ClipboardDocumentIcon className="size-4" />
        </CopyButton>
      </div>

      {trafficSignTag && copyTrafficSignTag && (
        <>
          <div className="break-all">
            <Tag tagKey={trafficSignTag[0]} tagValue={trafficSignTag[1]} />
          </div>
          <div className="space-x-2 text-xs">
            <strong>Wiki:</strong>
            <WikiLinkListTrafficSignValues value={trafficSignTag[1]} inline />

            {countryPrefix === 'DE' && (
              <ExternalLink href={osmtoolsUrl(trafficSignTag[1])} blank className={wikiLinkClasses}>
                osmtools.de
              </ExternalLink>
            )}
          </div>
        </>
      )}
    </>
  )
}

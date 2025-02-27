'use client'
import { useParamSigns } from '@app/app/(signs)/_components/store/useParamSigns.nuqs'
import { CopyButton } from '@app/app/_components/links/CopyButton'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import { osmtoolsUrl } from '@app/app/_components/links/osmtoolsUrl'
import { ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import { signsToTrafficSignTagValue, toTag } from '@osm-traffic-signs/converter'
import { useCountryPrefix } from '../../store/CountryPrefixContext'
import { Tag } from '../../wiki/Tag'
import { WikiLinkListTrafficSignValues } from '../../wiki/WikiLinkListTrafficSignValues'
import { wikiLinkClasses } from '../../wiki/WikiLinkValue'

export const ResultTrafficSignTag = () => {
  const { countryPrefix } = useCountryPrefix()
  const { paramSigns } = useParamSigns()

  // Copy signs
  const copyTrafficSignTag = toTag({
    key: 'traffic_sign',
    value: signsToTrafficSignTagValue(paramSigns, countryPrefix),
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

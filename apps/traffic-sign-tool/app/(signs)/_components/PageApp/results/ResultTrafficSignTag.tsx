import { useParamSigns } from '@app/app/(signs)/_components/store/useParamSigns.search'
import { CopyButton } from '@app/app/_components/links/CopyButton'
import * as m from '@app/paraglide/messages'
import { ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import { signsToTrafficSignTagValue, toTag } from '@osm-traffic-signs/converter'
import { useCountryPrefix } from '../../store/CountryPrefixContext'
import { Tag } from '../../wiki/Tag'
import { TrafficSignTagReferenceLinks } from './ResultTagRecommendations/TrafficSignTagReferenceLinks'

export const ResultTrafficSignTag = () => {
  const { countryPrefix } = useCountryPrefix()
  const { paramSigns } = useParamSigns()

  const copyTrafficSignTag = toTag({
    key: 'traffic_sign',
    value: signsToTrafficSignTagValue(paramSigns, countryPrefix),
  })
  const trafficSignTag = copyTrafficSignTag?.split('=')

  if (!countryPrefix) return null

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-light uppercase">{m.traffic_sign_tag_heading()}</h2>
        <CopyButton text={copyTrafficSignTag}>
          <ClipboardDocumentIcon className="size-4" />
        </CopyButton>
      </div>

      {trafficSignTag && copyTrafficSignTag && (
        <>
          <div className="break-all">
            <Tag tagKey={trafficSignTag[0]} tagValue={trafficSignTag[1]} />
          </div>
          <TrafficSignTagReferenceLinks tagValue={trafficSignTag[1]} />
        </>
      )}
    </>
  )
}

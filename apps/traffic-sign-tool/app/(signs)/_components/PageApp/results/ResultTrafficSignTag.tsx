import { useParamSigns } from '@app/app/(signs)/_components/store/useParamSigns.search'
import { CopyButton } from '@app/app/_components/links/CopyButton'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import { osmtoolsUrl } from '@app/app/_components/links/osmtoolsUrl'
import * as m from '@app/paraglide/messages'
import { ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import { SignStateType, signsToTrafficSignTagValue, toTag } from '@osm-traffic-signs/converter'
import { Fragment } from 'react'
import { useCountryPrefix } from '../../store/CountryPrefixContext'
import { Tag } from '../../wiki/Tag'
import { WikiLinkListTrafficSignValues } from '../../wiki/WikiLinkListTrafficSignValues'
import { wikiLinkClasses } from '../../wiki/WikiLinkValue'

type SignWithId = SignStateType & { signId: string }

const getOsmWikiTableUrl = (sign: SignWithId) => {
  const isZusatzzeichen = sign.kind === 'exception_modifier' || sign.kind === 'condition_modifier'
  const hashPrefix = isZusatzzeichen ? 'Zusatzzeichen_' : 'Zeichen_'
  return `https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_Deutschland#${hashPrefix}${sign.signId}`
}

const getWikipediaUrl = (sign: SignWithId) => {
  const isZusatzzeichen = sign.kind === 'exception_modifier' || sign.kind === 'condition_modifier'
  const signType = isZusatzzeichen ? 'Zusatzzeichen' : 'Zeichen'
  const textFragment = encodeURIComponent(`${signType} ${sign.signId}`)
  return `https://de.wikipedia.org/wiki/Bildtafel_der_Verkehrszeichen_in_der_Bundesrepublik_Deutschland_seit_2017#:~:text=${textFragment}`
}

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
          <div className="mt-1 space-x-2 text-xs">
            <strong>{m.wiki_label()}</strong>
            <WikiLinkListTrafficSignValues value={trafficSignTag[1]} inline />

            {countryPrefix === 'DE' && (
              <>
                <ExternalLink
                  href={osmtoolsUrl(trafficSignTag[1])}
                  blank
                  className={wikiLinkClasses}
                >
                  osmtools.de
                </ExternalLink>
                {paramSigns.length > 0 && (
                  <details className="inline">
                    <summary className="inline cursor-pointer underline decoration-transparent underline-offset-4 hover:decoration-stone-400 hover:decoration-1">
                      {m.more_label()}
                    </summary>
                    <ul className="mt-2 space-y-1 pl-4">
                      {paramSigns.map((sign) => {
                        if (!sign.signId) return null
                        const osmUrl = getOsmWikiTableUrl(sign)
                        const wikiUrl = getWikipediaUrl(sign)
                        const signLabel = `${countryPrefix}:${sign.osmValuePart}`

                        return (
                          <Fragment key={sign.osmValuePart}>
                            {osmUrl && (
                              <li className="list-disc">
                                <ExternalLink href={osmUrl} blank className={wikiLinkClasses}>
                                  {m.osm_wiki_table({ signLabel })}
                                </ExternalLink>
                              </li>
                            )}
                            {wikiUrl && (
                              <li className="list-disc">
                                <ExternalLink href={wikiUrl} blank className={wikiLinkClasses}>
                                  {m.wikipedia_table({ signLabel })}
                                </ExternalLink>
                              </li>
                            )}
                          </Fragment>
                        )
                      })}
                    </ul>
                  </details>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}

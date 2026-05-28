import { useParamSigns } from '@app/app/(signs)/_components/store/useParamSigns.search'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import { osmtoolsUrl } from '@app/app/_components/links/osmtoolsUrl'
import * as m from '@app/paraglide/messages'
import type { SignStateType } from '@osm-traffic-signs/converter'
import { Fragment } from 'react'
import { useCountryPrefixWithFallback } from '../../../store/CountryPrefixContext'
import { WikiLinkListTrafficSignValues } from '../../../wiki/WikiLinkListTrafficSignValues'
import { wikiLinkClasses } from '../../../wiki/WikiLinkValue'

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

type Props = {
  tagValue: string
}

export const TrafficSignTagReferenceLinks = ({ tagValue }: Props) => {
  const { countryPrefix } = useCountryPrefixWithFallback()
  const { paramSigns } = useParamSigns()

  return (
    <div className="mt-1 space-x-2 text-xs">
      <strong>{m.wiki_label()}</strong>
      <WikiLinkListTrafficSignValues value={tagValue} inline />

      {countryPrefix === 'DE' && (
        <>
          <ExternalLink href={osmtoolsUrl(tagValue)} blank className={wikiLinkClasses}>
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
                  const osmUrl = getOsmWikiTableUrl(sign as SignWithId)
                  const wikiUrl = getWikipediaUrl(sign as SignWithId)
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
  )
}

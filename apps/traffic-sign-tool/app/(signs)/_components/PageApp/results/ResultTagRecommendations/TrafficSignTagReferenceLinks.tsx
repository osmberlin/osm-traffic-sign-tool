import { useParamSigns } from '@app/app/(signs)/_components/store/useParamSigns.search'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import { osmtoolsUrl } from '@app/app/_components/links/osmtoolsUrl'
import * as m from '@app/paraglide/messages'
import {
  buildSignReferenceLinks,
  getCountryCatalogueMeta,
  type SignStateType,
} from '@osm-traffic-signs/converter'
import { Fragment } from 'react'
import { useCountryPrefix } from '../../../store/CountryPrefixContext'
import { WikiLinkListTrafficSignValues } from '../../../wiki/WikiLinkListTrafficSignValues'
import { wikiLinkClasses } from '../../../wiki/WikiLinkValue'

type SignWithId = SignStateType & { signId: string }

type Props = {
  tagValue: string
}

export const TrafficSignTagReferenceLinks = ({ tagValue }: Props) => {
  const { countryPrefix } = useCountryPrefix()
  const { paramSigns } = useParamSigns()
  const referenceLinks = getCountryCatalogueMeta(countryPrefix).referenceLinks

  return (
    <div className="mt-1 space-x-2 text-xs">
      <strong>{m.wiki_label()}</strong>
      <WikiLinkListTrafficSignValues value={tagValue} inline />

      {referenceLinks && (
        <>
          <ExternalLink
            href={osmtoolsUrl(tagValue, countryPrefix)}
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
                  const { osmWikiTableUrl, wikipediaTableUrl } = buildSignReferenceLinks(
                    sign as SignWithId,
                    referenceLinks,
                  )
                  const signLabel = `${countryPrefix}:${sign.osmValuePart}`

                  return (
                    <Fragment key={sign.osmValuePart}>
                      <li className="list-disc">
                        <ExternalLink href={osmWikiTableUrl} blank className={wikiLinkClasses}>
                          {m.osm_wiki_table({ signLabel })}
                        </ExternalLink>
                      </li>
                      {wikipediaTableUrl && (
                        <li className="list-disc">
                          <ExternalLink href={wikipediaTableUrl} blank className={wikiLinkClasses}>
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

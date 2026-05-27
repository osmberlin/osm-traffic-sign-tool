import { useCountryPrefixWithFallback } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import { WikiLinkify } from '@app/app/(signs)/_components/wiki/WikiLinkify'
import { CommentTranslateLink } from '@app/app/_components/i18n/CommentTranslateLink'
import { useUiLocale } from '@app/app/_components/i18n/useUiLocale'
import { inlineCodeClass, proseLightClass } from '@app/app/_components/layout/proseClasses'
import * as m from '@app/paraglide/messages'
import {
  signsToComments,
  trafficSignTagToSigns,
  type SignComentType,
} from '@osm-traffic-signs/converter'
import clsx from 'clsx'

type Props = { value: string }

export const TagComments = ({ value }: Props) => {
  const { countryPrefix } = useCountryPrefixWithFallback()
  const uiLocale = useUiLocale()
  const signs = trafficSignTagToSigns(value, countryPrefix)
  const signsCommentsMap = signsToComments(signs)

  return (
    <div className="break-all">
      {Array.from(signsCommentsMap).map(([signKey, signComments]) => {
        return (
          <div key={signKey} className={clsx('gap-2 px-2 font-serif', proseLightClass)}>
            <h3 className="font-bold">
              {m.tag_comments_sign()} <code className={inlineCodeClass}>{signKey}</code>:
            </h3>
            <ul className="space-y-2">
              {(signComments as (SignComentType & { lang?: string })[]).map(
                ({ tagReference, important, comment, lang }, index) => {
                  const commentLang = lang ?? 'de'

                  return (
                    <li
                      key={`${comment}-${index}`}
                      className={important ? 'text-amber-800' : ''}
                      lang={commentLang !== uiLocale ? commentLang : undefined}
                    >
                      {tagReference && (
                        <p>
                          <code className={inlineCodeClass}>{tagReference}</code>
                        </p>
                      )}
                      <span>
                        <WikiLinkify text={comment} className={proseLightClass} />
                        <CommentTranslateLink commentText={comment} commentLang={commentLang} />
                      </span>
                    </li>
                  )
                },
              )}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

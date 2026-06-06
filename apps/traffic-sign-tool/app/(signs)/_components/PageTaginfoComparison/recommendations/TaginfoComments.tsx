import { useCountryPrefix } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import { WikiLinkify } from '@app/app/(signs)/_components/wiki/WikiLinkify'
import { CommentTranslateLink } from '@app/app/_components/i18n/CommentTranslateLink'
import { useUiLocale } from '@app/app/_components/i18n/useUiLocale'
import {
  commentWithTranslateInlineClass,
  inlineCodeClass,
  proseLightClass,
} from '@app/app/_components/layout/proseClasses'
import * as m from '@app/paraglide/messages'
import {
  signsToComments,
  trafficSignTagToSigns,
  type GeometryType,
  type SignComentType,
} from '@osm-traffic-signs/converter'
import clsx from 'clsx'

type Props = {
  value: string
  geometry: GeometryType
}

export const TaginfoComments = ({ value, geometry }: Props) => {
  const { countryPrefix } = useCountryPrefix()
  const uiLocale = useUiLocale()
  const signs = trafficSignTagToSigns(value, countryPrefix)
  const signsCommentsMap = signsToComments(signs, geometry)

  if (signsCommentsMap.size === 0) {
    return null
  }

  return (
    <div className="space-y-3 break-all">
      {Array.from(signsCommentsMap).map(([signKey, signComments]) => {
        return (
          <div key={signKey} className={clsx('font-serif', proseLightClass)}>
            <h3 className="mb-1 text-sm font-semibold text-stone-800">
              {m.tag_comments_sign()} <code className={inlineCodeClass}>{signKey}</code>
            </h3>
            <ul className="list-disc space-y-2 pl-5">
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
                      <span className={commentWithTranslateInlineClass}>
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

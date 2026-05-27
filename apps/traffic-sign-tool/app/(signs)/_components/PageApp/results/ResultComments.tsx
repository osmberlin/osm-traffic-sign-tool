import { useCountryPrefixWithFallback } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import { useParamSigns } from '@app/app/(signs)/_components/store/useParamSigns.search'
import { CommentTranslateLink } from '@app/app/_components/i18n/CommentTranslateLink'
import { useUiLocale } from '@app/app/_components/i18n/useUiLocale'
import * as m from '@app/paraglide/messages'
import {
  getRedirectsForSign,
  signsToComments,
  type SignComentType,
} from '@osm-traffic-signs/converter'
import clsx from 'clsx'
import { WikiLinkify } from '../../wiki/WikiLinkify'

export const ResultComments = () => {
  const { paramSigns } = useParamSigns()
  const { countryPrefix } = useCountryPrefixWithFallback()
  const uiLocale = useUiLocale()
  const signsCommentsMap = signsToComments(paramSigns)

  const commentsMapWithRedirects = new Map(signsCommentsMap)

  paramSigns.forEach((sign) => {
    const redirects = getRedirectsForSign(sign.osmValuePart, countryPrefix)
    const hasRedirectInfo = sign.matchdByAlternativeKey || redirects.length > 0

    if (hasRedirectInfo) {
      const existingComments = commentsMapWithRedirects.get(sign.osmValuePart) || []
      const redirectComments = []

      if (sign.matchdByAlternativeKey) {
        redirectComments.push({
          comment: m.redirect_renamed({
            from: sign.matchdByAlternativeKey,
            to: sign.osmValuePart,
          }),
          important: undefined,
          lang: 'en' as const,
        })
      }

      if (redirects.length > 0) {
        redirectComments.push({
          comment: m.redirect_alternatives({
            list: redirects.map((alt) => `\`${alt}\``).join(', '),
          }),
          important: undefined,
          lang: 'en' as const,
        })
      }

      commentsMapWithRedirects.set(sign.osmValuePart, [...existingComments, ...redirectComments])
    }
  })

  return (
    <div className="mt-10 space-y-6">
      <h3 className="text-lg font-light text-stone-50 uppercase">{m.notes_heading()}</h3>
      {!commentsMapWithRedirects.size && m.notes_empty()}
      {Array.from(commentsMapWithRedirects).map(([signKey, signComments]) => {
        return (
          <div key={signKey} className="space-y-2">
            <h4 className="font-light text-stone-300">
              {m.notes_on()}{' '}
              <code className="rounded-sm bg-stone-700 px-2 py-1 text-stone-50">{signKey}</code>
            </h4>
            <ul className="prose-code:bg-white/10 prose-code:rounded prose-code:px-0.5 prose-white prose-a:underline prose-a:decoration-stone-700 prose-a:underline-offset-4 prose-a:hover:decoration-stone-400 prose-a:hover:decoration-1 prose-code:whitespace-nowrap list-disc space-y-2 pl-5 font-serif font-normal break-all">
              {(signComments as (SignComentType & { lang?: string })[]).map(
                ({ tagReference, important, comment, lang }, index) => {
                  const commentLang = lang ?? 'de'

                  return (
                    <li
                      key={`${comment}-${index}`}
                      className={clsx('text-sm', important ? 'text-amber-500' : '')}
                      lang={commentLang !== uiLocale ? commentLang : undefined}
                    >
                      {tagReference && (
                        <p>
                          <code>{tagReference}</code>
                        </p>
                      )}
                      <span>
                        <WikiLinkify text={comment} />
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

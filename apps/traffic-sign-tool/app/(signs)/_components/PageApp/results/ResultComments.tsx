'use client'
import { useCountryPrefixWithFallback } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import { useParamSigns } from '@app/app/(signs)/_components/store/useParamSigns.nuqs'
import { getRedirectsForSign, signsToComments } from '@osm-traffic-signs/converter'
import clsx from 'clsx'
import { WikiLinkify } from '../../wiki/WikiLinkify'

export const ResultComments = () => {
  const { paramSigns } = useParamSigns()
  const { countryPrefix } = useCountryPrefixWithFallback()
  const signsCommentsMap = signsToComments(paramSigns)

  // Add redirect notes to the comments map
  const commentsMapWithRedirects = new Map(signsCommentsMap)

  paramSigns.forEach((sign) => {
    const redirects = getRedirectsForSign(sign.osmValuePart, countryPrefix)
    const hasRedirectInfo = sign.matchdByAlternativeKey || redirects.length > 0

    if (hasRedirectInfo) {
      const existingComments = commentsMapWithRedirects.get(sign.osmValuePart) || []
      const redirectComments = []

      // Add note if this sign was redirected
      if (sign.matchdByAlternativeKey) {
        redirectComments.push({
          comment: `\`${sign.matchdByAlternativeKey}\` was renamed to \`${sign.osmValuePart}\` which is the identifier this tool uses.`,
          important: undefined,
        })
      }

      // Add note about all alternative identifiers
      if (redirects.length > 0) {
        redirectComments.push({
          comment: `All alternative identifiers for this sign: ${redirects.map((alt) => `\`${alt}\``).join(', ')}`,
          important: undefined,
        })
      }

      commentsMapWithRedirects.set(sign.osmValuePart, [...existingComments, ...redirectComments])
    }
  })

  return (
    <div className="mt-10 space-y-6">
      <h3 className="text-lg font-light text-stone-50 uppercase">Notes</h3>
      {!commentsMapWithRedirects.size && '–'}
      {Array.from(commentsMapWithRedirects).map(([signKey, signComments]) => {
        return (
          <div key={signKey} className="space-y-2">
            <h4 className="font-light text-stone-300">
              Notes on{' '}
              <code className="rounded-sm bg-stone-700 px-2 py-1 text-stone-50">{signKey}</code>
            </h4>
            <ul className="prose-code:bg-white/10 prose-code:rounded prose-code:px-0.5 prose-white prose-a:underline prose-a:decoration-stone-700 prose-a:underline-offset-4 prose-a:hover:decoration-stone-400 prose-a:hover:decoration-1 prose-code:whitespace-nowrap list-disc space-y-2 pl-5 font-serif font-normal break-all">
              {signComments.map(({ tagReference, important, comment }, index) => {
                return (
                  <li
                    key={`${comment}-${index}`}
                    className={clsx('text-sm', important ? 'text-amber-500' : '')}
                  >
                    {tagReference && (
                      <p>
                        <code>{tagReference}</code>
                      </p>
                    )}
                    <WikiLinkify text={comment} />
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

import { useCountryPrefix } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import { useParamSigns } from '@app/app/(signs)/_components/store/useParamSigns.search'
import * as m from '@app/paraglide/messages'
import { getRedirectsForSign, signsToTopLevelComments } from '@osm-traffic-signs/converter'
import { CommentsMap } from './ResultTagRecommendations/CommentsMap'

export const ResultComments = () => {
  const { paramSigns } = useParamSigns()
  const { countryPrefix } = useCountryPrefix()
  const signsCommentsMap = signsToTopLevelComments(paramSigns)

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
    <div className="mt-6 space-y-4 opacity-60 transition-opacity group-hover:opacity-100 md:mt-10 md:space-y-6">
      <h3 className="text-lg font-light text-stone-50 uppercase">{m.notes_heading()}</h3>
      {!commentsMapWithRedirects.size && m.notes_empty()}
      <CommentsMap comments={commentsMapWithRedirects} />
    </div>
  )
}

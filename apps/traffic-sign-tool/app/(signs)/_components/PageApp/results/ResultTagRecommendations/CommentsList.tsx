import { CommentTranslateLink } from '@app/app/_components/i18n/CommentTranslateLink'
import { useUiLocale } from '@app/app/_components/i18n/useUiLocale'
import { getCountryCatalogueMeta, type SignComentType } from '@osm-traffic-signs/converter'
import { clsx } from 'clsx'
import { useCountryPrefix } from '../../../store/CountryPrefixContext'
import { WikiLinkify } from '../../../wiki/WikiLinkify'

type Props = {
  comments: SignComentType[]
  className?: string
}

export const CommentsList = ({ comments, className }: Props) => {
  const uiLocale = useUiLocale()
  const { countryPrefix } = useCountryPrefix()
  const { defaultCommentLang } = getCountryCatalogueMeta(countryPrefix)
  if (comments.length === 0) return null

  return (
    <ul
      className={clsx(
        'prose-code:bg-white/10 prose-code:rounded prose-code:px-0.5 prose-white prose-a:underline prose-a:decoration-stone-700 prose-a:underline-offset-4 prose-a:hover:decoration-stone-400 prose-a:hover:decoration-1 prose-code:whitespace-nowrap list-disc space-y-2 pl-5 font-serif text-sm font-normal break-all',
        className,
      )}
    >
      {comments.map(({ tagReference, important, comment, lang }, index) => {
        const commentLang = lang ?? defaultCommentLang
        return (
          <li
            key={`${comment}-${index}`}
            className={clsx(important ? 'text-amber-500' : '')}
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
      })}
    </ul>
  )
}

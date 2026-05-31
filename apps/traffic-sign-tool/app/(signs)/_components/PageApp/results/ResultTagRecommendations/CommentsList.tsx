import { CommentTranslateLink } from '@app/app/_components/i18n/CommentTranslateLink'
import { useUiLocale } from '@app/app/_components/i18n/useUiLocale'
import {
  commentWithTranslateInlineClass,
  notesListClassName,
} from '@app/app/_components/layout/proseClasses'
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
    <ul className={clsx(notesListClassName, 'list-disc', className)}>
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
            <span className={commentWithTranslateInlineClass}>
              <WikiLinkify text={comment} />
              <CommentTranslateLink commentText={comment} commentLang={commentLang} />
            </span>
          </li>
        )
      })}
    </ul>
  )
}

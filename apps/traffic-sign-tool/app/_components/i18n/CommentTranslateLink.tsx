import { useUiLocale } from '@app/app/_components/i18n/useUiLocale'
import * as m from '@app/paraglide/messages'
import {
  buildGoogleTranslateUrl,
  commentLangMatchesUiLocale,
} from '@app/src/features/i18n/googleTranslateUrl'
import { LanguageIcon } from '@heroicons/react/16/solid'

type Props = {
  commentText: string
  commentLang?: string
}

export const CommentTranslateLink = ({ commentText, commentLang }: Props) => {
  const uiLocale = useUiLocale()

  if (commentLangMatchesUiLocale(commentLang, uiLocale)) {
    return null
  }

  const href = buildGoogleTranslateUrl(commentText, uiLocale, commentLang)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="ml-1.5 inline-flex align-middle text-stone-400 hover:text-violet-300"
      aria-label={m.translate_comment()}
      title={m.translate_comment()}
    >
      <LanguageIcon className="size-4" aria-hidden="true" />
    </a>
  )
}

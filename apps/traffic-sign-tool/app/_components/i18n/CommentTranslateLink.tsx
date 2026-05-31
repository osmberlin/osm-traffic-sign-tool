import { useUiLocale } from '@app/app/_components/i18n/useUiLocale'
import { stonePillButton } from '@app/app/_components/links/buttonStyles'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import * as m from '@app/paraglide/messages'
import {
  buildGoogleTranslateUrl,
  commentLangMatchesUiLocale,
} from '@app/src/features/i18n/googleTranslateUrl'
import { LanguageIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'

type Props = {
  commentText: string
  commentLang?: string
  className?: string
}

export const CommentTranslateLink = ({ commentText, commentLang, className }: Props) => {
  const uiLocale = useUiLocale()

  if (commentLangMatchesUiLocale(commentLang, uiLocale)) {
    return null
  }

  const href = buildGoogleTranslateUrl(commentText, uiLocale, commentLang)

  return (
    <ExternalLink
      href={href}
      blank
      className={clsx(
        'ml-1.5 inline-flex h-4 shrink-0 items-center px-1 align-baseline',
        stonePillButton,
        className,
      )}
      aria-label={m.translate_comment()}
    >
      <LanguageIcon className="size-3" aria-hidden="true" />
    </ExternalLink>
  )
}

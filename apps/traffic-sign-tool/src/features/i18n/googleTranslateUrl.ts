import type { UiLocale } from '@app/src/features/i18n/uiLocale'

/** BCP-47 primary language subtag for Google Translate (`sl` / `tl`). */
export const primaryLanguageSubtag = (lang: string): string => lang.toLowerCase().split('-')[0]

/** Source language for translate links; falls back to auto-detect when unknown. */
export const translateSourceLocale = (commentLang: string | undefined): string =>
  commentLang ? primaryLanguageSubtag(commentLang) : 'auto'

/** Open Google Translate with comment text, targeting the active UI locale. */
export const buildGoogleTranslateUrl = (
  text: string,
  targetLocale: UiLocale,
  sourceLocale?: string,
): string => {
  const params = new URLSearchParams({
    sl: translateSourceLocale(sourceLocale),
    tl: targetLocale,
    text,
  })

  return `https://translate.google.com/?${params.toString()}`
}

export const commentLangMatchesUiLocale = (
  commentLang: string | undefined,
  uiLocale: UiLocale,
): boolean => {
  if (!commentLang) {
    return true
  }

  return primaryLanguageSubtag(commentLang) === uiLocale
}

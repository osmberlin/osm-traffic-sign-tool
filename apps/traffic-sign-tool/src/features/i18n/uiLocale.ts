/** UI languages for Paraglide. Not the same as `/$lang` catalogue country prefixes. */
export const uiLocales = ['en', 'de'] as const
export type UiLocale = (typeof uiLocales)[number]

export const DEFAULT_UI_LOCALE = 'en' satisfies UiLocale

const uiLocaleSet = new Set<string>(uiLocales)

export const isUiLocale = (value: string | undefined | null): value is UiLocale =>
  value != null && uiLocaleSet.has(value)

export const parseUiLocale = (value: string | undefined | null): UiLocale | null =>
  isUiLocale(value) ? value : null

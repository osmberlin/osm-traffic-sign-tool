/**
 * UI locale (`en` / `de`) for Paraglide message rendering.
 *
 * Intentionally separate from the `/$lang` route param, which selects the sign
 * catalogue country prefix (e.g. `DE`), not the language the app UI is shown in.
 *
 * Persistence and resolution live in Paraglide (`localStorage` → `baseLocale`).
 * This module is a thin React bridge: subscribe via `useUiLocale`, write via
 * `setUiLocale`. Do not add a second localStorage key or derive UI locale from
 * the URL — see `vite.config.ts` strategy and `src/routes/$lang.tsx`.
 *
 * Root layout uses `key={uiLocale}` on the app shell so Paraglide `m.xxx()` calls
 * re-run in child components (React Compiler does not treat `getLocale()` as a dep).
 * Document title updates via TanStack Router `head()` after `router.invalidate()`.
 */
import { getLocale, setLocale } from '@app/paraglide/runtime'
import { DEFAULT_UI_LOCALE, isUiLocale, type UiLocale } from '@app/src/features/i18n/uiLocale'
import { useSyncExternalStore } from 'react'

const localeListeners = new Set<() => void>()

const notifyLocaleListeners = () => {
  for (const listener of localeListeners) {
    listener()
  }
}

const subscribeToUiLocale = (listener: () => void) => {
  localeListeners.add(listener)
  return () => localeListeners.delete(listener)
}

export const getUiLocale = (): UiLocale => {
  const locale = getLocale()
  return isUiLocale(locale) ? locale : DEFAULT_UI_LOCALE
}

export const setUiLocale = (locale: UiLocale) => {
  setLocale(locale, { reload: false })
  notifyLocaleListeners()
  // Dynamic import avoids router ↔ routeTree ↔ __root ↔ useUiLocale cycle at module init.
  void import('@app/src/router').then(({ router }) => router.invalidate())
}

export const useUiLocale = (): UiLocale =>
  useSyncExternalStore(subscribeToUiLocale, getUiLocale, () => DEFAULT_UI_LOCALE)

export { DEFAULT_UI_LOCALE }

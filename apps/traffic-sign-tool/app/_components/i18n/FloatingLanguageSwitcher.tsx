import { setUiLocale, useUiLocale } from '@app/app/_components/i18n/useUiLocale'
import { stonePillButton } from '@app/app/_components/links/buttonStyles'
import * as m from '@app/paraglide/messages'
import { uiLocales, type UiLocale } from '@app/src/features/i18n/uiLocale'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { LanguageIcon } from '@heroicons/react/24/outline'
import { countries } from '@osm-traffic-signs/converter'
import { clsx } from 'clsx'

/** Two independent settings: catalogue country (`/$lang`) vs UI language (Paraglide). */
export const FloatingLanguageSwitcher = () => {
  const uiLocale = useUiLocale()
  const signConfigLang = useCurrentLang() // catalogue prefix from route, not UI locale

  const handleUiLocaleSelect = (locale: UiLocale, close: () => void) => {
    setUiLocale(locale)
    close()
  }

  return (
    <div className="pointer-events-none fixed top-4 right-4 z-50">
      <Popover className="pointer-events-auto relative">
        <PopoverButton
          className={clsx(stonePillButton, 'gap-x-1.5 px-3 py-2 text-sm font-semibold')}
          aria-label={m.lang_switcher_button()}
        >
          <LanguageIcon aria-hidden="true" className="size-5 shrink-0" />
          <span>{m.lang_switcher_button()}</span>
        </PopoverButton>

        <PopoverPanel
          transition
          className="absolute right-0 z-10 mt-3 w-screen max-w-md transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
        >
          {({ close }) => (
            <div className="overflow-hidden rounded-2xl bg-stone-700 text-sm shadow-lg ring-1 ring-stone-600/80">
              <div className="grid grid-cols-1 gap-x-4 gap-y-4 p-4 lg:grid-cols-2">
                <section aria-labelledby="lang-switcher-sign-catalogue">
                  <h3
                    id="lang-switcher-sign-catalogue"
                    className="mb-2 text-xs font-semibold tracking-wide text-stone-400 uppercase"
                  >
                    {m.lang_switcher_sign_catalogue()}
                  </h3>
                  <ul className="space-y-1">
                    {countries.map((countryPrefix) => {
                      const isSelected = signConfigLang === countryPrefix
                      return (
                        <li
                          key={countryPrefix}
                          className={clsx(
                            'relative flex items-center gap-x-3 rounded-lg p-3',
                            isSelected ? 'bg-stone-900/80' : 'opacity-60',
                          )}
                          aria-current={isSelected ? 'true' : undefined}
                        >
                          <div className="flex size-9 flex-none items-center justify-center rounded-lg bg-stone-800 text-sm font-bold text-stone-200">
                            {countryPrefix}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-stone-100">
                              {countryPrefix === 'DE'
                                ? m.lang_switcher_sign_catalogue_de_name()
                                : countryPrefix}
                            </p>
                          </div>
                          {isSelected ? (
                            <CheckIcon
                              aria-hidden="true"
                              className="size-5 shrink-0 text-violet-400"
                            />
                          ) : null}
                        </li>
                      )
                    })}
                  </ul>
                </section>

                <section aria-labelledby="lang-switcher-ui-language">
                  <h3
                    id="lang-switcher-ui-language"
                    className="mb-2 text-xs font-semibold tracking-wide text-stone-400 uppercase"
                  >
                    {m.lang_switcher_ui_language()}
                  </h3>
                  <ul className="space-y-1">
                    {uiLocales.map((locale) => {
                      const isSelected = uiLocale === locale
                      const label = locale === 'en' ? m.lang_ui_en() : m.lang_ui_de()
                      return (
                        <li key={locale}>
                          <button
                            type="button"
                            onClick={() => handleUiLocaleSelect(locale, close)}
                            className={clsx(
                              'group relative flex w-full items-center gap-x-3 rounded-lg p-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500',
                              isSelected
                                ? 'bg-stone-900/80'
                                : 'bg-stone-800/55 ring-1 ring-stone-300/15 ring-inset hover:bg-stone-600/60 hover:ring-stone-300/25',
                            )}
                            aria-current={isSelected ? 'true' : undefined}
                            aria-label={label}
                          >
                            <div className="flex size-9 flex-none items-center justify-center rounded-lg bg-stone-800 text-xs font-bold text-stone-200 uppercase group-hover:bg-stone-700">
                              {locale}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-stone-100">{label}</p>
                            </div>
                            {isSelected ? (
                              <CheckIcon
                                aria-hidden="true"
                                className="size-5 shrink-0 text-violet-400"
                              />
                            ) : null}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              </div>
            </div>
          )}
        </PopoverPanel>
      </Popover>
    </div>
  )
}

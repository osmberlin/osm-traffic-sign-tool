import { setUiLocale, useUiLocale } from '@app/app/_components/i18n/useUiLocale'
import { stonePillButton } from '@app/app/_components/links/buttonStyles'
import * as m from '@app/paraglide/messages'
import { uiLocales, type UiLocale } from '@app/src/features/i18n/uiLocale'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { LanguageIcon } from '@heroicons/react/24/outline'
import { countries, type CountryPrefixType } from '@osm-traffic-signs/converter'
import { useNavigate } from '@tanstack/react-router'
import { clsx } from 'clsx'
import { LangSwitcherOption } from './LangSwitcherOption'

/** Two independent settings: catalogue country (`/$lang`) vs UI language (Paraglide). */
export const FloatingLanguageSwitcher = () => {
  const uiLocale = useUiLocale()
  const signConfigLang = useCurrentLang() // catalogue prefix from route, not UI locale
  const navigate = useNavigate({ from: '/$lang' })

  const handleCatalogueSelect = (countryPrefix: CountryPrefixType, close: () => void) => {
    if (countryPrefix === signConfigLang) {
      return
    }
    navigate({ to: '/$lang', params: { lang: countryPrefix } })
    close()
  }

  const handleUiLocaleSelect = (locale: UiLocale, close: () => void) => {
    if (locale === uiLocale) {
      return
    }
    setUiLocale(locale)
    close()
  }

  return (
    <div className="absolute top-4 right-4 z-10 sm:right-6 lg:right-8">
      <Popover className="relative">
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
                    {countries.map((countryPrefix) => (
                      <LangSwitcherOption
                        key={countryPrefix}
                        badge={countryPrefix}
                        label={
                          countryPrefix === 'DE'
                            ? m.lang_switcher_sign_catalogue_de_name()
                            : countryPrefix
                        }
                        isSelected={signConfigLang === countryPrefix}
                        onClick={() => handleCatalogueSelect(countryPrefix, close)}
                      />
                    ))}
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
                    {uiLocales.map((locale) => (
                      <LangSwitcherOption
                        key={locale}
                        badge={locale}
                        label={locale === 'en' ? m.lang_ui_en() : m.lang_ui_de()}
                        isSelected={uiLocale === locale}
                        onClick={() => handleUiLocaleSelect(locale, close)}
                      />
                    ))}
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

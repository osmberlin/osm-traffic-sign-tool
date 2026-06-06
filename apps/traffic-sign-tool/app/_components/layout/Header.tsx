import { MaturityLabel } from '@app/app/_components/MaturityLabel'
import {
  useAboutToolOpen,
  useAboutToolOpenActions,
} from '@app/app/_components/store/useAboutToolOpen.zustand'
import * as m from '@app/paraglide/messages'
import { isCataloguePickerRoute } from '@app/src/features/routing/isCataloguePickerRoute'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import { getCatalogueMaturity, isVisibleMaturity } from '@osm-traffic-signs/converter'
import { Link, useRouterState } from '@tanstack/react-router'
import { clsx } from 'clsx'
import packageJson from '../../../package.json'
import { FloatingLanguageSwitcher } from '../i18n/FloatingLanguageSwitcher'
import { ExternalLink } from '../links/ExternalLink'
import svgLogo from './assets/logo.svg'

export const Header = () => {
  const isAboutOpen = useAboutToolOpen()
  const { setIsOpen: setAboutOpen } = useAboutToolOpenActions()
  const lang = useCurrentLang()
  const catalogueMaturity = getCatalogueMaturity(lang)
  const showCatalogueMaturityNotice = isVisibleMaturity(catalogueMaturity)
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const onCataloguePicker = isCataloguePickerRoute(pathname)
  const isHome = onCataloguePicker || pathname === `/${lang}`
  const version = packageJson?.version || 'unknown'
  const titleClassName = clsx(
    'mb-3 flex items-center gap-3 text-xl leading-tight font-light text-stone-400 md:text-3xl',
    !isHome && 'decoration-violet-700 underline-offset-4 hover:underline',
  )
  const titleContent = (
    <>
      <img src={svgLogo} alt="" width={48} height={48} />{' '}
      <span>
        {m.header_title()} <small className="text-xs">{version}</small>
      </span>
    </>
  )

  return (
    <header className="relative mx-auto mb-6 w-full max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
      <FloatingLanguageSwitcher />
      <div className="mx-auto mt-5 flex w-full max-w-prose flex-col flex-wrap overflow-hidden md:mt-10">
        <h1>
          {isHome ? (
            <span className={titleClassName}>{titleContent}</span>
          ) : (
            <Link className={titleClassName} to="/$lang" params={{ lang }}>
              {titleContent}
            </Link>
          )}
        </h1>

        <details
          open={isAboutOpen}
          onToggle={(event) => setAboutOpen(event.currentTarget.open)}
          className="my-5 self-center leading-relaxed text-stone-300"
        >
          <summary className="cursor-pointer text-center underline-offset-2 hover:underline">
            {m.header_about_summary()}
          </summary>
          <p>
            {!onCataloguePicker && showCatalogueMaturityNotice ? (
              <>
                <MaturityLabel maturity={catalogueMaturity} className="mr-1 align-middle" />{' '}
                {m.catalogue_maturity_notice()}
                <br />
              </>
            ) : null}
            {m.header_about_body({ trafficSignTag: 'traffic_sign=*' })}{' '}
            <strong>{m.header_about_review()}</strong>
            <br />
            <ExternalLink blank href="https://github.com/osmberlin/osm-traffic-sign-tool">
              {m.header_about_report()}
            </ExternalLink>
            .
          </p>
        </details>
      </div>
    </header>
  )
}

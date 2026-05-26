'use client'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import { Link } from '@tanstack/react-router'
import { ExternalLink } from '../links/ExternalLink'
import { isDev } from '../utils/isDev'

const footerLinkClassName =
  'text-center text-base text-stone-400 underline decoration-stone-700 underline-offset-4 hover:text-stone-100'

const footerLinkActiveProps = {
  className: 'font-bold cursor-auto hover:no-underline decoration-transparent',
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => event.preventDefault(),
} as const

const navigation = [
  {
    name: 'Imprint & Contact & Privacy Statement (German)',
    href: 'https://www.osm-verkehrswende.org/contact',
  },
  {
    name: 'Changelog',
    href: 'https://github.com/osmberlin/osm-traffic-sign-tool/blob/main/apps/traffic-sign-tool/CHANGELOG.md',
  },
  {
    name: 'Code on Github',
    href: 'https://github.com/osmberlin/osm-traffic-sign-tool',
  },
]

const baseInternalNavigation = [
  { name: 'Compare with taginfo', to: '/$lang/taginfo' as const },
  { name: 'Compare with wiki', to: '/$lang/wiki' as const },
  { name: 'Tagging QA', to: '/$lang/signs-qa' as const },
  { name: 'All signs', to: '/$lang/signs' as const, active: true },
] as const

export const Footer = () => {
  const lang = useCurrentLang()
  const internalNavigation = [
    ...baseInternalNavigation,
    ...(isDev
      ? [
          {
            name: 'DEV ONLY: Check sign combinations',
            to: '/$lang/check-sign-combinations' as const,
          },
        ]
      : []),
  ]
  return (
    <footer className="mx-auto mt-20 max-w-6xl px-4 py-12 sm:px-6 md:mt-0 lg:px-8">
      <p className="mb-8 text-center text-base text-stone-400">
        This project is part of the{' '}
        <ExternalLink href="https://www.osm-verkehrswende.org/traffic-signs/">
          OpenStreetMap Verkehrswende Traffic Sign Project
        </ExternalLink>
        . <br />
        It is inspired by the great but unmaintaned{' '}
        <ExternalLink
          className="text-base text-stone-400 underline decoration-stone-700 underline-offset-4 hover:text-stone-100"
          href="http://osmtools.de/traffic_signs/"
          blank
        >
          osmtools.de/traffic_signs
        </ExternalLink>
      </p>
      <nav className="flex flex-col items-center gap-4" aria-label="Footer">
        <div className="-mx-5 -my-2 flex flex-wrap justify-center">
          {navigation.map((item) => {
            return (
              <div key={item.href} className="px-5 py-2">
                <ExternalLink href={item.href} className={footerLinkClassName} blank>
                  {item.name}
                </ExternalLink>
              </div>
            )
          })}
        </div>

        <div className="-mx-5 -my-2 flex flex-wrap justify-center">
          {internalNavigation.map((item) => {
            return (
              <div key={item.to} className="px-5 py-2">
                {'active' in item && item.active ? (
                  <Link
                    to={item.to}
                    params={{ lang }}
                    activeOptions={{ exact: true }}
                    activeProps={footerLinkActiveProps}
                    className={footerLinkClassName}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <Link to={item.to} params={{ lang }} className={footerLinkClassName}>
                    {item.name}
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </nav>
    </footer>
  )
}

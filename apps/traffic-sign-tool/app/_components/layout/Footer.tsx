import { ResultDebug } from '@app/app/(signs)/_components/PageApp/results/ResultDebug'
import * as m from '@app/paraglide/messages'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import { Link } from '@tanstack/react-router'
import { ExternalLink } from '../links/ExternalLink'

const footerLinkClassName =
  'text-center text-base text-stone-400 underline decoration-stone-700 underline-offset-4 hover:text-stone-100'

const footerLinkActiveProps = {
  className: 'font-bold cursor-auto hover:no-underline decoration-transparent',
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => event.preventDefault(),
} as const

export const Footer = () => {
  const lang = useCurrentLang()

  const navigation = [
    {
      name: m.footer_imprint(),
      href: 'https://www.osm-verkehrswende.org/contact',
    },
    {
      name: m.footer_changelog(),
      href: 'https://github.com/osmberlin/osm-traffic-sign-tool/blob/main/apps/traffic-sign-tool/CHANGELOG.md',
    },
    {
      name: m.footer_github(),
      href: 'https://github.com/osmberlin/osm-traffic-sign-tool',
    },
  ]

  const internalNavigation = [
    { name: m.footer_taginfo(), to: '/$lang/taginfo' as const },
    { name: m.footer_wiki(), to: '/$lang/wiki' as const },
    { name: m.footer_signs_qa(), to: '/$lang/signs-qa' as const },
    { name: m.footer_combinations_qa(), to: '/$lang/check-sign-combinations' as const },
    { name: m.footer_questions_qa(), to: '/$lang/questions-qa' as const },
    { name: m.footer_all_signs(), to: '/$lang/signs' as const, active: true },
  ] as const

  return (
    <footer className="mx-auto mt-20 max-w-6xl px-4 py-12 sm:px-6 md:mt-0 lg:px-8">
      <p className="mb-8 text-center text-base text-stone-400">
        {m.footer_project_part()}{' '}
        <ExternalLink href="https://www.osm-verkehrswende.org/traffic-signs/">
          {m.footer_project_link()}
        </ExternalLink>
        . <br />
        {m.footer_inspired()}{' '}
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

        <ResultDebug linkClassName={footerLinkClassName} />
      </nav>
    </footer>
  )
}

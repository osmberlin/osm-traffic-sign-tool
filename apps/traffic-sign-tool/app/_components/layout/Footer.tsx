'use client'
import { useCountryPrefix } from '@app/app/_store/utils/useCountryPrefix'
import Link from 'next/link'
import { ExternalLink } from '../links/ExternalLink'

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

export const Footer = () => {
  const countryPrefix = useCountryPrefix()

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
      <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
        {navigation.map((item) => {
          return (
            <div key={item.href} className="px-5 py-2">
              <ExternalLink
                href={item.href}
                className="text-center text-base text-stone-400 underline decoration-stone-700 underline-offset-4 hover:text-stone-100"
                blank
              >
                {item.name}
              </ExternalLink>
            </div>
          )
        })}

        {countryPrefix && (
          <div className="flex gap-10 px-5 py-2">
            <Link
              href={`/${countryPrefix}/taginfo`}
              className="text-center text-base text-stone-300 underline decoration-stone-700 underline-offset-4 hover:text-stone-100"
            >
              Compare with taginfo
            </Link>
            <Link
              href={`/${countryPrefix}/wiki`}
              className="text-center text-base text-stone-300 underline decoration-stone-700 underline-offset-4 hover:text-stone-100"
            >
              Compare with wiki
            </Link>
            <Link
              href={`/${countryPrefix}/signs`}
              className="text-center text-base text-stone-300 underline decoration-stone-700 underline-offset-4 hover:text-stone-100"
            >
              Full sign list
            </Link>
          </div>
        )}
      </nav>
    </footer>
  )
}

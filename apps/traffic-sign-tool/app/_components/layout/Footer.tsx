'use client'
import { useCountryPrefix } from '@app/app/_store/utils/useCountryPrefix'

const navigation = [
  {
    name: 'Imprint & Contact & Privacy Statement (German)',
    href: 'https://parkraum.osm-verkehrswende.org/contact',
  },
  {
    name: 'Code on Github',
    href: 'https://github.com/osmberlin/osm-traffic-sign-tool',
  },
]

export const Footer = () => {
  const countryPrefix = useCountryPrefix()

  return (
    <>
      <footer>
        <div className="mx-auto max-w-6xl overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
          <p className="mb-8 text-center text-base text-stone-400">
            This project is part of the OpenStreetMap Verkehrswende Project. <br />
            It is inspired by the great but unmaintaned{' '}
            <a
              className="text-base text-stone-400 underline decoration-stone-700 underline-offset-4 hover:text-stone-400"
              href="http://osmtools.de/traffic_signs/"
              target="_blank"
            >
              osmtools.de/traffic_signs
            </a>
          </p>
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            {navigation.map((item) => {
              return (
                <div key={item.href} className="px-5 py-2">
                  <a
                    href={item.href}
                    className="text-base text-stone-400 underline decoration-stone-700 underline-offset-4 hover:text-stone-400"
                    target="_blank"
                  >
                    {item.name}
                  </a>
                </div>
              )
            })}

            {countryPrefix && (
              <div className="flex gap-10 px-5 py-2">
                <a
                  href={`${countryPrefix}/taginfo`}
                  className="text-base text-stone-400 underline decoration-stone-700 underline-offset-4 hover:text-stone-400"
                >
                  Common values from taginfo
                </a>
                <a
                  href={`${countryPrefix}/signs`}
                  className="text-base text-stone-400 underline decoration-stone-700 underline-offset-4 hover:text-stone-400"
                >
                  List of all traffic signs
                </a>
              </div>
            )}
          </nav>
        </div>
      </footer>
    </>
  )
}

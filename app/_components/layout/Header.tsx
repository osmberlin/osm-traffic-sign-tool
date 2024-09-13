'use client'
import { clsx } from 'clsx'
import { usePathname } from 'next/navigation'
import packageJson from '../../../package.json'
import { ExternalLink } from '../links/ExternalLink'

export const Header = () => {
  const isHome = usePathname() === '/'
  const version = packageJson?.version || 'unknown'

  return (
    <section>
      <div className="mx-auto max-w-6xl overflow-hidden px-4 pb-6 pt-10 sm:px-6 lg:px-8">
        <div className="-mx-5 -my-2 flex flex-col flex-wrap">
          <a
            className={clsx(
              'mb-3 self-center decoration-violet-700 underline-offset-4 hover:underline',
              isHome ? 'cursor-auto hover:no-underline' : '',
            )}
            aria-disabled={isHome}
            onClick={(e) => isHome && e.preventDefault()}
            href="/"
          >
            <h1 className="text-3xl font-thin text-stone-400">
              OSM Traffic Sign Tool 2.0{' '}
              <span className="rounded bg-stone-300 px-2 pt-1 text-2xl uppercase text-stone-800">
                Beta
              </span>{' '}
              <small className="text-xs">{version}</small>
            </h1>
          </a>
          <details open className="my-5 max-w-prose self-center leading-tight text-stone-300">
            <summary className="cursor-pointer text-center underline-offset-2 hover:underline">
              About this tool…
            </summary>
            <p>
              This tool helps to find the right <code>traffic_sign=*</code> tag as well as
              recommended tags for the road that it applies to.{' '}
              <strong>Please review all tags before updating OSM.</strong>
              <br />
              <strong className="text-amber-500">
                This project is in beta stage.{' '}
                <ExternalLink blank href="https://github.com/osmberlin/osm-traffic-sign-tool">
                  Please report issues; please help with research
                </ExternalLink>
                .
              </strong>
            </p>
          </details>
        </div>
      </div>
    </section>
  )
}

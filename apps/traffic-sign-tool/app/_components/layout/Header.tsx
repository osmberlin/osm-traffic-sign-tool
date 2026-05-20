'use client'
import { Link, useRouterState } from '@tanstack/react-router'
import { clsx } from 'clsx'
import packageJson from '../../../package.json'
import { ExternalLink } from '../links/ExternalLink'
import svgLogo from './assets/logo.svg'

export const Header = () => {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const isHome = pathname === '/'
  const version = packageJson?.version || 'unknown'

  return (
    <header className="mx-auto mt-5 mb-6 flex max-w-prose flex-col flex-wrap overflow-hidden px-4 sm:px-6 md:mt-10 lg:w-[65ch] lg:max-w-prose lg:px-8">
      <h1>
        <Link
          className={clsx(
            'mb-3 flex items-center gap-3 text-xl leading-tight font-light text-stone-400 decoration-violet-700 underline-offset-4 hover:underline md:text-3xl',
            isHome ? 'cursor-auto hover:no-underline' : '',
          )}
          aria-disabled={isHome}
          onClick={(event) => isHome && event.preventDefault()}
          to="/"
        >
          <img src={svgLogo} alt="" width={48} height={48} />{' '}
          <span>
            OSM Traffic Sign Tool 2 <small className="text-xs">{version}</small>
          </span>
        </Link>
      </h1>

      <details open className="my-5 self-center leading-tight text-stone-300">
        <summary className="cursor-pointer text-center underline-offset-2 hover:underline">
          About this tool…
        </summary>
        <p>
          This tool helps to find the right <code>traffic_sign=*</code> tag as well as recommended
          tags for the road that it applies to. <br />
          <strong>Please review all tags before updating OSM.</strong>
          <br />
          <ExternalLink blank href="https://github.com/osmberlin/osm-traffic-sign-tool">
            Please report issues or help with research
          </ExternalLink>
          .
        </p>
      </details>
    </header>
  )
}

import { MissingSvgNotice } from '@app/app/(signs)/_components/MissingSvgNotice'
import type { SignType } from '@osm-traffic-signs/converter'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest'

beforeAll(() => {
  Object.defineProperty(globalThis, 'localStorage', {
    value: {
      getItem: () => null,
      setItem: () => undefined,
      removeItem: () => undefined,
      clear: () => undefined,
    },
    writable: true,
  })
})

vi.mock('@app/app/(signs)/_components/store/CountryPrefixContext', () => ({
  useCountryPrefix: () => ({ countryPrefix: 'BR' as const }),
  useCatalogueHtmlLang: () => 'pt-BR',
}))

vi.mock('@app/src/features/routing/useCurrentLang', () => ({
  useCurrentLang: () => 'BR',
}))

afterEach(() => {
  cleanup()
})

vi.mock('@tanstack/react-router', () => ({
  Link: ({
    children,
    to,
    params,
    hash,
    className,
    activeProps,
  }: {
    children: React.ReactNode
    to: string
    params: { lang: string }
    hash?: string
    className?: string
    activeProps?: { className?: string }
  }) => (
    <a
      href={`${to.replace('$lang', params.lang)}${hash ? `#${hash}` : ''}`}
      className={[className, activeProps?.className].filter(Boolean).join(' ')}
    >
      {children}
    </a>
  ),
}))

const missingSign = {
  osmValuePart: 'A-49a',
  signId: 'A-49a',
  name: 'A-49a',
  descriptiveName: 'Pedestres à esquerda, VLT à direita',
  description: null,
  kind: 'traffic_sign',
  tagRecommendationsByGeometry: [{ geometries: ['way'], highwayValues: [] }],
  catalogue: { signCategory: 'hazard_sign' },
  image: 'missing',
} satisfies SignType

const presentSign = {
  ...missingSign,
  osmValuePart: 'A-48',
  signId: 'A-48',
  name: 'A-48',
  image: {
    kind: 'remote',
    sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Brasil_A-48.svg',
    licence: 'Public Domain',
  },
} satisfies SignType

describe('MissingSvgNotice', () => {
  test('renders notice with wiki deeplink for missing SVG sign', () => {
    render(<MissingSvgNotice sign={missingSign} />)

    const link = screen.getByRole('link', { name: /wiki comparison page/i })
    expect(link.getAttribute('href')).toBe('/BR/wiki#wiki-qa-BR-A-49a')
    expect(screen.getByText(/BR:A-49a/i)).toBeTruthy()
  })

  test('shows no-preview notice for signs without a bundled SVG', () => {
    const noPreviewSign = {
      ...missingSign,
      osmValuePart: 'Correios',
      signId: 'Correios',
      name: 'Correios',
      image: {
        kind: 'remote' as const,
        sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Correios.JPG',
        licence: 'Public Domain' as const,
      },
    } satisfies SignType

    render(<MissingSvgNotice sign={noPreviewSign} />)

    expect(screen.getByText(/no SVG preview in this tool/i)).toBeTruthy()
    expect(screen.queryByRole('link')).toBeNull()
  })

  test('omits wiki link on wiki comparison page', () => {
    render(<MissingSvgNotice sign={missingSign} showWikiLink={false} />)

    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.getByText(/upload the sign to the wiki/i)).toBeTruthy()
  })

  test('renders nothing when SVG is available', () => {
    const { container } = render(<MissingSvgNotice sign={presentSign} />)
    expect(container.innerHTML).toBe('')
  })
})

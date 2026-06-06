import { MissingSvgPlaceholder } from '@app/app/(signs)/_components/MissingSvgPlaceholder'
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

afterEach(() => {
  cleanup()
})

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

describe('MissingSvgPlaceholder', () => {
  test('shows sign key in placeholder', () => {
    render(<MissingSvgPlaceholder sign={missingSign} />)

    expect(screen.getByText('A-49a')).toBeTruthy()
    expect(screen.getByLabelText(/A-49a/i)).toBeTruthy()
  })

  test('thumbnail mode respects fixed size classes without stretching', () => {
    const { container } = render(
      <MissingSvgPlaceholder sign={missingSign} className="h-14 w-14" showSignKey={false} />,
    )

    const placeholder = container.firstElementChild
    expect(placeholder?.className).toContain('h-14')
    expect(placeholder?.className).toContain('w-14')
    expect(placeholder?.className).not.toContain('w-full')
    expect(screen.queryByText('A-49a')).toBeNull()
    expect(screen.getByLabelText(/A-49a/i)).toBeTruthy()
  })
})

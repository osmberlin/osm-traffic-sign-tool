import { ResultTagRecommendations } from '@app/app/(signs)/_components/PageApp/results/ResultTagRecommendations'
import { cleanup, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

let mockParamSigns: any[] = []

vi.mock('@app/app/(signs)/_components/store/useParamSigns.search', () => ({
  useParamSigns: () => ({
    paramSigns: mockParamSigns,
  }),
}))

vi.mock('@app/app/(signs)/_components/store/CountryPrefixContext', () => ({
  useCountryPrefixWithFallback: () => ({ countryPrefix: 'DE' }),
}))

vi.mock('@app/app/_components/links/CopyButton', () => ({
  CopyButton: ({ children }: { children: ReactNode }) => <button>{children}</button>,
}))

vi.mock('@heroicons/react/20/solid', () => ({
  ClipboardDocumentIcon: () => <svg aria-label="clipboard" />,
  InformationCircleIcon: () => <svg aria-label="info" />,
}))

vi.mock('@app/app/(signs)/_components/PageApp/results/ResultTagRecommendations/TagList', () => ({
  TagList: () => <div>Tag list</div>,
}))

vi.mock('@osm-traffic-signs/converter', () => ({
  classifyTaggingSuggestionsQa: (sign: any) =>
    sign.taggingSuggestionsQa === 'explicit_none' ? 'explicitNoSuggestions' : 'withSuggestions',
  signsToTags: () => new Map([['traffic_sign', 'DE:279-30']]),
  toTag: ({ key, value }: { key: string; value: string }) => `${key}=${value}`,
}))

afterEach(() => {
  cleanup()
  mockParamSigns = []
})

describe('ResultTagRecommendations', () => {
  test('shows explicit-none note for a single sign', () => {
    mockParamSigns = [
      {
        recodgnizedSign: true,
        osmValuePart: '279-30',
        taggingSuggestionsQa: 'explicit_none',
      },
    ]

    render(<ResultTagRecommendations />)

    expect(screen.getByText(/This sign/i)).toBeTruthy()
    expect(screen.getByText('279-30')).toBeTruthy()
    expect(screen.getByText('traffic_sign')).toBeTruthy()
  })

  test('shows no explicit-none note when marker is missing', () => {
    mockParamSigns = [
      {
        recodgnizedSign: true,
        osmValuePart: '279-30',
      },
    ]

    render(<ResultTagRecommendations />)

    expect(screen.queryByText(/marked to have no tagging recommendations/i)).toBeNull()
  })

  test('uses "Sign X" wording when multiple signs are selected but only one is explicit-none', () => {
    mockParamSigns = [
      {
        recodgnizedSign: true,
        osmValuePart: '279-30',
        taggingSuggestionsQa: 'explicit_none',
      },
      {
        recodgnizedSign: true,
        osmValuePart: '250',
      },
    ]

    const { container } = render(<ResultTagRecommendations />)

    expect(container.textContent).toContain('Sign ')
    expect(screen.queryByText(/This sign/i)).toBeNull()
    expect(screen.getByText('279-30')).toBeTruthy()
  })

  test('lists all explicit-none sign keys when multiple are selected', () => {
    mockParamSigns = [
      {
        recodgnizedSign: true,
        osmValuePart: '279-30',
        taggingSuggestionsQa: 'explicit_none',
      },
      {
        recodgnizedSign: true,
        osmValuePart: '279-50',
        taggingSuggestionsQa: 'explicit_none',
      },
    ]

    const { container } = render(<ResultTagRecommendations />)

    expect(container.textContent).toContain('Signs ')
    expect(container.textContent).toContain(' and ')
    expect(screen.getByText('279-30')).toBeTruthy()
    expect(screen.getByText('279-50')).toBeTruthy()
  })
})

import { SelectedSignValuePrompt } from '@app/app/(signs)/_components/PageApp/selectedSigns/SelectedSignValuePrompt'
import type { SignStateType } from '@osm-traffic-signs/converter'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

beforeEach(() => {
  vi.spyOn(console, 'info').mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
  cleanup()
})

vi.mock('@app/app/(signs)/_components/store/useParamSigns.search', () => ({
  useParamSigns: () => ({
    updateSignValue: vi.fn(),
    updateSignValueDebounced: vi.fn(),
    cancelPendingSignValueUpdate: vi.fn(),
  }),
}))

vi.mock('@app/app/(signs)/_components/store/CountryPrefixContext', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@app/app/(signs)/_components/store/CountryPrefixContext')>()
  return {
    ...actual,
    useCountryPrefix: () => ({ countryPrefix: 'DE' as const }),
  }
})

vi.mock('@app/app/_components/i18n/useUiLocale', () => ({
  useUiLocale: () => 'en',
}))

const openingHoursSign = {
  recodgnizedSign: true,
  osmValuePart: '1042-31[Mo-Sa 18:00-19:00]',
  signId: '1042-31',
  signValue: 'Mo-Sa 18:00-19:00',
  name: 'Zusatzzeichen 1042-31',
  descriptiveName: 'Zeitliche Beschränkung: werktags, von-bis',
  description: null,
  kind: 'condition_modifier',
  valuePrompt: {
    prompt: 'Werktags, Uhrzeit von-bis',
    defaultValue: 'Mo-Sa 18:00-19:00',
    format: 'opening_hours',
  },
  tagRecommendationsByGeometry: [
    {
      geometries: ['way'],
      modifierValueFromValuePrompt: true,
    },
  ],
  catalogue: {
    signCategory: 'condition_modifier',
  },
  image: {
    kind: 'remote',
    sourceUrl: 'https://example.com/sign.svg',
    licence: 'Public Domain',
  },
  svgName: 'DE_1042_31',
} satisfies SignStateType

describe('SelectedSignValuePrompt', () => {
  test('shows error feedback for invalid opening_hours input', async () => {
    const user = userEvent.setup()

    render(<SelectedSignValuePrompt sign={openingHoursSign} />)

    const input = screen.getByRole('textbox')
    await user.clear(input)
    await user.type(input, 'Di-So+12:00-13:00')

    expect(screen.getByRole('alert')).toBeTruthy()
  })

  test('clears error feedback for valid opening_hours input', async () => {
    const user = userEvent.setup()

    render(<SelectedSignValuePrompt sign={openingHoursSign} />)

    const input = screen.getByRole('textbox')
    await user.clear(input)
    await user.type(input, 'Di-So+12:00-13:00')
    expect(screen.getByRole('alert')).toBeTruthy()

    await user.clear(input)
    await user.type(input, 'Mo-Fr 16:00-18:00; PH off')

    expect(screen.queryByRole('alert')).toBeNull()
  })
})

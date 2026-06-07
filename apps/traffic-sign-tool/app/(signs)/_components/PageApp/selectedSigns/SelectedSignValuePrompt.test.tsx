import { SelectedSignValuePrompt } from '@app/app/(signs)/_components/PageApp/selectedSigns/SelectedSignValuePrompt'
import type { SignStateType } from '@osm-traffic-signs/converter'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'

const { mockUpdateSignValue, mockUpdateSignValueDebounced, mockCancelPendingSignValueUpdate } =
  vi.hoisted(() => ({
    mockUpdateSignValue: vi.fn(),
    mockUpdateSignValueDebounced: vi.fn(),
    mockCancelPendingSignValueUpdate: vi.fn(),
  }))

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

beforeEach(() => {
  vi.spyOn(console, 'info').mockImplementation(() => {})
  mockUpdateSignValue.mockClear()
  mockUpdateSignValueDebounced.mockClear()
  mockCancelPendingSignValueUpdate.mockClear()
})

afterEach(() => {
  vi.restoreAllMocks()
  cleanup()
})

vi.mock('@app/app/(signs)/_components/store/useParamSigns.search', () => ({
  useParamSigns: () => ({
    updateSignValue: mockUpdateSignValue,
    updateSignValueDebounced: mockUpdateSignValueDebounced,
    cancelPendingSignValueUpdate: mockCancelPendingSignValueUpdate,
  }),
}))

vi.mock('@app/app/(signs)/_components/store/CountryPrefixContext', () => ({
  useCountryPrefix: () => ({ countryPrefix: 'DE' as const }),
  useCatalogueHtmlLang: () => 'de-DE',
}))

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

const integerValueSign = {
  recodgnizedSign: true,
  osmValuePart: '274.1[47]',
  signId: '274.1',
  signValue: 47,
  name: 'Zeichen 274.1',
  descriptiveName: 'Tempo ??-Zone',
  description: 'Beginn einer Tempo ??-Zone',
  kind: 'traffic_sign',
  valuePrompt: {
    prompt: 'Geschwindigkeit in km/h ohne Einheit',
    defaultValue: '47',
    format: 'integer',
  },
  tagRecommendationsByGeometry: [
    {
      geometries: ['way'],
      highwayValues: [],
      uniqueTags: [],
      conditionalTags: [{ key: 'maxspeed', value: '30' }],
    },
  ],
  catalogue: {
    signCategory: 'speed',
  },
  image: {
    kind: 'remote',
    sourceUrl: 'https://example.com/sign.svg',
    licence: 'Public Domain',
  },
  svgName: 'DE_274_1',
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

  test('commits value on form submit without native navigation', () => {
    render(<SelectedSignValuePrompt sign={integerValueSign} />)

    const form = screen.getByRole('spinbutton').closest('form')
    expect(form).toBeTruthy()
    fireEvent.submit(form!)

    expect(mockCancelPendingSignValueUpdate).toHaveBeenCalledWith('274.1[47]')
    expect(mockUpdateSignValue).toHaveBeenCalledWith('274.1[47]', '47')
  })
})

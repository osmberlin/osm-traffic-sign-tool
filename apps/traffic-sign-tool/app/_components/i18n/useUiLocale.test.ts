import { DEFAULT_UI_LOCALE } from '@app/src/features/i18n/uiLocale'
import { renderHook, act } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

const setLocale = vi.fn()
const getLocale = vi.fn(() => 'en')
const invalidate = vi.fn().mockResolvedValue(undefined)

vi.mock('@app/paraglide/runtime', () => ({
  getLocale,
  setLocale,
}))

vi.mock('@app/src/router', () => ({
  router: { invalidate },
}))

const loadUseUiLocale = async () => {
  vi.resetModules()
  return import('./useUiLocale')
}

afterEach(() => {
  vi.clearAllMocks()
})

describe('useUiLocale', () => {
  test('getUiLocale falls back to DEFAULT_UI_LOCALE for unknown paraglide locale', async () => {
    getLocale.mockReturnValue('fr')
    const { getUiLocale } = await loadUseUiLocale()
    expect(getUiLocale()).toBe(DEFAULT_UI_LOCALE)
  })

  test('setUiLocale updates paraglide without reload and invalidates router', async () => {
    const { setUiLocale } = await loadUseUiLocale()

    setUiLocale('de')
    await vi.waitFor(() => {
      expect(invalidate).toHaveBeenCalled()
    })

    expect(setLocale).toHaveBeenCalledWith('de', { reload: false })
  })

  test('setUiLocale notifies useUiLocale subscribers', async () => {
    getLocale.mockReturnValue('en')
    const { setUiLocale, useUiLocale } = await loadUseUiLocale()
    const { result } = renderHook(() => useUiLocale())

    expect(result.current).toBe('en')

    getLocale.mockReturnValue('de')
    act(() => {
      setUiLocale('de')
    })

    expect(result.current).toBe('de')
  })
})

import { FloatingLanguageSwitcher } from '@app/app/_components/i18n/FloatingLanguageSwitcher'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

vi.mock('@app/src/features/routing/useCurrentLang', () => ({
  useCurrentLang: () => 'DE',
}))

const navigate = vi.hoisted(() => vi.fn())
const writeCataloguePreference = vi.hoisted(() => vi.fn())

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-router')>()
  return {
    ...actual,
    useNavigate: () => navigate,
  }
})

vi.mock('@app/src/features/routing/cataloguePreference', () => ({
  writeCataloguePreference,
}))

const setUiLocale = vi.hoisted(() => vi.fn())

vi.mock('@app/app/_components/i18n/useUiLocale', () => ({
  useUiLocale: () => 'en',
  setUiLocale,
}))

describe('FloatingLanguageSwitcher', () => {
  test('renders change language trigger', () => {
    render(<FloatingLanguageSwitcher />)
    expect(screen.getByRole('button', { name: /change language/i })).toBeTruthy()
  })

  test('selecting UI language persists locale', async () => {
    const user = userEvent.setup()
    render(<FloatingLanguageSwitcher />)

    await user.click(screen.getAllByRole('button', { name: /change language/i })[0])
    await user.click(screen.getByRole('button', { name: /deutsch/i }))

    expect(setUiLocale).toHaveBeenCalledWith('de')
  })

  test('selecting catalogue writes preference and navigates', async () => {
    const user = userEvent.setup()
    render(<FloatingLanguageSwitcher />)

    await user.click(screen.getAllByRole('button', { name: /change language/i })[0])
    await user.click(screen.getByRole('button', { name: /belgian traffic signs/i }))

    expect(writeCataloguePreference).toHaveBeenCalledWith('BE')
    expect(navigate).toHaveBeenCalledWith({ to: '/$lang', params: { lang: 'BE' } })
  })
})

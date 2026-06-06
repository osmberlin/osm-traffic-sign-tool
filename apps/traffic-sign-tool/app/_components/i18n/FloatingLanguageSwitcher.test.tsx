import { FloatingLanguageSwitcher } from '@app/app/_components/i18n/FloatingLanguageSwitcher'
import { cleanup, render, screen, within } from '@testing-library/react'
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

const pathname = vi.hoisted(() => vi.fn(() => '/DE'))

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
    useRouterState: (options?: {
      select?: (state: { location: { pathname: string } }) => unknown
    }) => {
      const state = { location: { pathname: pathname() } }
      return options?.select ? options.select(state) : state
    },
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
  afterEach(() => {
    pathname.mockReturnValue('/DE')
  })

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
    expect(navigate).toHaveBeenCalledWith({ href: '/BE', search: undefined })
  })

  test('selecting catalogue preserves the current sub-route', async () => {
    pathname.mockReturnValue('/DE/signs-qa')
    const user = userEvent.setup()
    render(<FloatingLanguageSwitcher />)

    await user.click(screen.getAllByRole('button', { name: /change language/i })[0])
    await user.click(screen.getByRole('button', { name: /belgian traffic signs/i }))

    expect(writeCataloguePreference).toHaveBeenCalledWith('BE')
    expect(navigate).toHaveBeenCalledWith({ href: '/BE/signs-qa', search: undefined })
  })

  test('on catalogue picker route no catalogue is pre-selected', async () => {
    pathname.mockReturnValue('/')
    const user = userEvent.setup()
    render(<FloatingLanguageSwitcher />)

    await user.click(screen.getAllByRole('button', { name: /change language/i })[0])

    const catalogueHeading = screen.getByRole('heading', { name: /sign catalogue/i })
    const catalogueSection = catalogueHeading.closest('section')
    expect(catalogueSection).toBeTruthy()
    const selectedCatalogueButtons = within(catalogueSection!)
      .getAllByRole('button')
      .filter((button) => button.getAttribute('aria-current') === 'true')

    expect(selectedCatalogueButtons).toHaveLength(0)
  })

  test('on catalogue picker route selecting the default catalogue still navigates', async () => {
    pathname.mockReturnValue('/')
    const user = userEvent.setup()
    render(<FloatingLanguageSwitcher />)

    await user.click(screen.getAllByRole('button', { name: /change language/i })[0])
    await user.click(screen.getByRole('button', { name: /german traffic signs/i }))

    expect(writeCataloguePreference).toHaveBeenCalledWith('DE')
    expect(navigate).toHaveBeenCalledWith({ to: '/$lang', params: { lang: 'DE' } })
  })
})

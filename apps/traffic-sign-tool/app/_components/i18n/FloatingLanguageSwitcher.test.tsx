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

const writeCataloguePreference = vi.hoisted(() => vi.fn())

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-router')>()
  return {
    ...actual,
    Link: ({
      to,
      params,
      children,
      onClick,
      ...rest
    }: {
      to: string
      params?: { lang?: string }
      children: React.ReactNode
      onClick?: () => void
    }) => (
      <a href={params?.lang ? `/${params.lang}` : to} onClick={onClick} {...rest}>
        {children}
      </a>
    ),
    useRouterState: (options?: {
      select?: (state: { location: { pathname: string; search?: unknown } }) => unknown
    }) => {
      const state = { location: { pathname: pathname(), search: undefined } }
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

  test('selecting catalogue writes preference and links to the target catalogue', async () => {
    const user = userEvent.setup()
    render(<FloatingLanguageSwitcher />)

    await user.click(screen.getAllByRole('button', { name: /change language/i })[0])
    const belgianLink = screen.getByRole('link', { name: /belgian traffic signs/i })

    expect(belgianLink.getAttribute('href')).toBe('/BE')
    await user.click(belgianLink)

    expect(writeCataloguePreference).toHaveBeenCalledWith('BE')
  })

  test('catalogue links preserve the current sub-route', async () => {
    pathname.mockReturnValue('/DE/signs-qa')
    const user = userEvent.setup()
    render(<FloatingLanguageSwitcher />)

    await user.click(screen.getAllByRole('button', { name: /change language/i })[0])

    expect(screen.getByRole('link', { name: /belgian traffic signs/i }).getAttribute('href')).toBe(
      '/BE/signs-qa',
    )
  })

  test('on catalogue picker route no catalogue is pre-selected', async () => {
    pathname.mockReturnValue('/')
    const user = userEvent.setup()
    render(<FloatingLanguageSwitcher />)

    await user.click(screen.getAllByRole('button', { name: /change language/i })[0])

    const catalogueHeading = screen.getByRole('heading', { name: /sign catalogue/i })
    const catalogueSection = catalogueHeading.closest('section')
    expect(catalogueSection).toBeTruthy()
    const selectedCatalogueItems = within(catalogueSection!)
      .getAllByRole('link')
      .filter((link) => link.getAttribute('aria-current') === 'true')

    expect(selectedCatalogueItems).toHaveLength(0)
  })

  test('on catalogue picker route catalogue links target the selected country', async () => {
    pathname.mockReturnValue('/')
    const user = userEvent.setup()
    render(<FloatingLanguageSwitcher />)

    await user.click(screen.getAllByRole('button', { name: /change language/i })[0])
    const germanLink = screen.getByRole('link', { name: /german traffic signs/i })

    expect(germanLink.getAttribute('href')).toBe('/DE')
    await user.click(germanLink)

    expect(writeCataloguePreference).toHaveBeenCalledWith('DE')
  })
})

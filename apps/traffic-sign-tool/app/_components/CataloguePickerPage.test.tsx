import { CataloguePickerPage } from '@app/app/_components/CataloguePickerPage'
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

const writeCataloguePreference = vi.hoisted(() => vi.fn())

vi.mock('@app/app/_components/i18n/CatalogueIconicSign', () => ({
  CatalogueIconicSign: ({ countryPrefix }: { countryPrefix: string }) => (
    <span>{countryPrefix}</span>
  ),
}))

vi.mock('@app/src/features/routing/cataloguePreference', () => ({
  writeCataloguePreference,
}))

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
    useSearch: () => ({}),
  }
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('CataloguePickerPage', () => {
  test('renders catalogue options as links', () => {
    render(<CataloguePickerPage />)
    expect(screen.getByRole('heading', { name: /choose a sign catalogue/i })).toBeTruthy()
    expect(screen.getByRole('link', { name: /german traffic signs/i })).toBeTruthy()
    expect(screen.getByRole('link', { name: /belgian traffic signs/i })).toBeTruthy()
  })

  test('selecting a catalogue writes preference', async () => {
    const user = userEvent.setup()
    render(<CataloguePickerPage />)

    await user.click(screen.getByRole('link', { name: /german traffic signs/i }))

    expect(writeCataloguePreference).toHaveBeenCalledWith('DE')
  })
})

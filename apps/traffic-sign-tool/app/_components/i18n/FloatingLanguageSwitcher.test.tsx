import { FloatingLanguageSwitcher } from '@app/app/_components/i18n/FloatingLanguageSwitcher'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test, vi } from 'vitest'

afterEach(() => {
  cleanup()
})

vi.mock('@app/src/features/routing/useCurrentLang', () => ({
  useCurrentLang: () => 'DE',
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
})

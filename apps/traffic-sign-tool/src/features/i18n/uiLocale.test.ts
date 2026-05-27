import { describe, expect, test } from 'vitest'
import { commentLangMatchesUiLocale, buildGoogleTranslateUrl } from './googleTranslateUrl'
import { DEFAULT_UI_LOCALE, isUiLocale, parseUiLocale } from './uiLocale'

describe('uiLocale', () => {
  test('DEFAULT_UI_LOCALE is en', () => {
    expect(DEFAULT_UI_LOCALE).toBe('en')
  })

  test('isUiLocale accepts supported locales', () => {
    expect(isUiLocale('en')).toBe(true)
    expect(isUiLocale('de')).toBe(true)
    expect(isUiLocale('fr')).toBe(false)
    expect(isUiLocale(null)).toBe(false)
  })

  test('parseUiLocale returns null for invalid values', () => {
    expect(parseUiLocale('de')).toBe('de')
    expect(parseUiLocale('fr')).toBe(null)
  })
})

describe('googleTranslateUrl', () => {
  test('builds translate URL with comment source lang and UI target locale', () => {
    const url = buildGoogleTranslateUrl('Hallo', 'en', 'de')
    expect(url).toContain('translate.google.com')
    expect(url).toContain('sl=de')
    expect(url).toContain('tl=en')
    expect(url).toContain(encodeURIComponent('Hallo'))
  })

  test('uses auto-detect when source lang is omitted', () => {
    const url = buildGoogleTranslateUrl('Hello', 'de')
    expect(url).toContain('sl=auto')
  })

  test('commentLangMatchesUiLocale treats de-DE as de', () => {
    expect(commentLangMatchesUiLocale('de-DE', 'de')).toBe(true)
    expect(commentLangMatchesUiLocale('de', 'en')).toBe(false)
    expect(commentLangMatchesUiLocale(undefined, 'en')).toBe(true)
  })
})

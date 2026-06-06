import { describe, expect, test } from 'vitest'
import { buildIndexPreferenceRedirect, preserveIndexSearch } from './indexRouteRedirect'

describe('preserveIndexSearch', () => {
  test('keeps only defined search params', () => {
    expect(preserveIndexSearch({})).toEqual({})
    expect(preserveIndexSearch({ q: 'bike', focus: 'parking' })).toEqual({
      q: 'bike',
      focus: 'parking',
    })
    expect(preserveIndexSearch({ signs: 'DE:239' })).toEqual({ signs: 'DE:239' })
  })
})

describe('buildIndexPreferenceRedirect', () => {
  test('returns null without a stored preference', () => {
    expect(buildIndexPreferenceRedirect(null, {})).toBeNull()
  })

  test('redirects to the stored catalogue with preserved search', () => {
    expect(buildIndexPreferenceRedirect('BE', { q: 'path', signs: 'BE:D11' })).toEqual({
      to: '/$lang',
      params: { lang: 'BE' },
      replace: true,
      search: { q: 'path', signs: 'BE:D11' },
    })
  })
})

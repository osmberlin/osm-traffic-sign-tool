import { describe, expect, test } from 'vitest'
import { hasDeSearchParams } from './seoHead'

describe('hasDeSearchParams()', () => {
  test('returns false for empty search', () => {
    expect(hasDeSearchParams({})).toBe(false)
  })

  test('returns true when any deSearch field is set', () => {
    expect(hasDeSearchParams({ q: '241' })).toBe(true)
    expect(hasDeSearchParams({ signs: 'DE:250' })).toBe(true)
    expect(hasDeSearchParams({ focus: 'parking' })).toBe(true)
    expect(hasDeSearchParams({ qa: 'missing' })).toBe(true)
    expect(hasDeSearchParams({ comb: 'all' })).toBe(true)
    expect(hasDeSearchParams({ primary: '250' })).toBe(true)
  })
})

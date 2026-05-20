import { describe, expect, test } from 'vitest'
import { getRedirectsForSign } from './getRedirectsForSign.js'

describe('getRedirectsForSign()', () => {
  const countryPrefix = 'DE'

  test('returns all alternative keys that redirect to a sign', () => {
    const result = getRedirectsForSign('"Kfz-Verkehr frei"', countryPrefix)

    // Should include all variants that redirect to this canonical form
    expect(result).toContain('"Kraftfahrzeuge-frei"')
    expect(result).toContain('"KFZ frei"')
    expect(result).toContain('Kraftfahrzeuge-frei')
    expect(result).toContain('KFZ frei')
    expect(result.length).toBeGreaterThan(0)
  })

  test('returns empty array when no redirects exist', () => {
    const result = getRedirectsForSign('999-99', countryPrefix)
    expect(result).toEqual([])
  })

  test('returns empty array when countryPrefix is undefined', () => {
    const result = getRedirectsForSign('"Kfz-Verkehr frei"', undefined)
    expect(result).toEqual([])
  })

  test('finds redirects for numeric signs', () => {
    // Test with a known redirect from the config (e.g., 244 -> 244.1)
    const result = getRedirectsForSign('244.1', countryPrefix)
    expect(result).toContain('244')
  })

  test('finds redirects for additional numeric aliases', () => {
    expect(getRedirectsForSign('241-30', countryPrefix)).toContain('241')
    expect(getRedirectsForSign('242.1', countryPrefix)).toContain('242')
    expect(getRedirectsForSign('325.1', countryPrefix)).toContain('325')
  })
})

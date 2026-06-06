import { describe, expect, test } from 'vitest'
import { buildCatalogueSwitchPath } from './catalogueSwitchNavigation'

describe('buildCatalogueSwitchPath', () => {
  test('switches catalogue home path', () => {
    expect(buildCatalogueSwitchPath('DE', 'BE', '/DE')).toBe('/BE')
  })

  test('preserves sub-route when switching catalogue', () => {
    expect(buildCatalogueSwitchPath('DE', 'BE', '/DE/signs-qa')).toBe('/BE/signs-qa')
  })

  test('falls back to target home when pathname does not match source prefix', () => {
    expect(buildCatalogueSwitchPath('DE', 'BE', '/')).toBe('/BE')
  })
})

import { describe, expect, test } from 'vitest'
import { trafficSignTagToSigns } from '../trafficSignTagToSigns/trafficSignTagToSigns.js'

describe('country catalogue isolation', () => {
  test('BE sign does not resolve under AT prefix', () => {
    const signs = trafficSignTagToSigns('BE:A1a', 'AT')
    expect(signs[0]?.recodgnizedSign).toBe(false)
  })

  test('AT sign does not resolve under BE prefix', () => {
    const signs = trafficSignTagToSigns('AT:52.1', 'BE')
    expect(signs[0]?.recodgnizedSign).toBe(false)
  })

  test('BE sign resolves under BE prefix', () => {
    const signs = trafficSignTagToSigns('BE:A1a', 'BE')
    expect(signs).toHaveLength(1)
    expect(signs[0]?.recodgnizedSign).toBe(true)
    expect(signs[0]?.osmValuePart).toBe('A1a')
  })
})

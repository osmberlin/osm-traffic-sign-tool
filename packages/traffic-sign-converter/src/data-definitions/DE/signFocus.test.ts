import { describe, expect, test } from 'bun:test'
import { catalogueFocusViews, signFocusTags } from '../TrafficSignDataTypes.js'
import { trafficSignDataDE } from './trafficSignDataDE.js'

describe('sign catalogue focus', () => {
  test('uses only known focus keys', () => {
    for (const sign of trafficSignDataDE) {
      const focus = sign.catalogue.focus
      if (!focus) continue
      for (const key of Object.keys(focus)) {
        if (key === 'all') {
          expect(focus.all).toBe(true)
          continue
        }
        expect((catalogueFocusViews as readonly string[]).includes(key)).toBe(true)
        const level = focus[key as keyof typeof focus]
        expect(level === true || level === 'highlight').toBe(true)
      }
    }
  })

  test('has thematic focus on key sign groups', () => {
    const byId = new Map(trafficSignDataDE.map((s) => [s.signId, s]))

    expect(byId.get('357-50')?.catalogue.focus?.bike_foot).toBeTruthy()
    expect(byId.get('357-52')?.catalogue.focus?.bike_foot).toBeTruthy()
    expect(byId.get('385')?.catalogue.focus?.highway).toBeTruthy()
    expect(byId.get('314')?.catalogue.focus?.parking).toBeTruthy()
  })

  test('signFocusTags match thematic catalogue keys', () => {
    expect(signFocusTags).toEqual(['bike_foot', 'parking', 'highway'])
  })
})

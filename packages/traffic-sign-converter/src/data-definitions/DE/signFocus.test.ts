import { describe, expect, test } from 'bun:test'
import { signFocusTags } from '../TrafficSignDataTypes.js'
import { trafficSignDataDE } from './trafficSignDataDE.js'

describe('sign catalogue focus', () => {
  test('uses only known focus tags', () => {
    for (const sign of trafficSignDataDE) {
      for (const focus of sign.catalogue.focus ?? []) {
        expect(signFocusTags).toContain(focus)
      }
    }
  })

  test('has thematic focus on key sign groups', () => {
    const byId = new Map(trafficSignDataDE.map((s) => [s.signId, s]))

    expect(byId.get('237')?.catalogue.focus).toContain('bike_foot')
    expect(byId.get('1020-12')?.catalogue.focus).toContain('bike_foot')
    expect(byId.get('274')?.catalogue.focus).toContain('highway')
    expect(byId.get('1010-12')?.catalogue.focus).toContain('parking')
  })
})

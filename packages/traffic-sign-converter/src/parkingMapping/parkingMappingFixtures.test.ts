import { describe, expect, test } from 'vitest'
import { signsToTags } from '../signsToTags/signsToTags.js'
import { trafficSignTagToSigns } from '../trafficSignTagToSigns/trafficSignTagToSigns.js'
import { buildTrafficSignTagForFixture } from './buildTrafficSignTagForFixture.js'
import { parkingMappingScenarios } from './loadParkingScenarios.js'
import { substituteParkingAreaTags } from './parseAreaTags.js'

describe('parking mapping fixtures', () => {
  describe('recognition', () => {
    test.each(parkingMappingScenarios)('$fixtureId recognizes $trafficSignKey', (fixture) => {
      const signs = trafficSignTagToSigns(buildTrafficSignTagForFixture(fixture), 'DE')
      expect(signs.every((sign) => sign.recodgnizedSign)).toBe(true)
      expect(signs.some((sign) => !sign.recodgnizedSign)).toBe(false)
    })
  })

  describe('area tags on way geometry', () => {
    test.each(parkingMappingScenarios)('$fixtureId matches sourced area tags', (fixture) => {
      const signs = trafficSignTagToSigns(buildTrafficSignTagForFixture(fixture), 'DE')
      const actual = signsToTags(signs, 'DE', 'way')
      const expected = substituteParkingAreaTags(
        fixture.expectedTags.area,
        fixture.sampleSubstitution,
      )

      for (const [key, value] of expected.entries()) {
        expect(actual.get(key), `${fixture.fixtureId} tag ${key}`).toBe(value)
      }
    })
  })
})

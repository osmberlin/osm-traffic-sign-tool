import { describe, expect, test } from 'vitest'
import { countries, countryDefinitions } from '../data-definitions/countryDefinitions.js'
import { signRelations } from '../data-definitions/signRelations.js'
import { trafficSignTagToSigns } from '../trafficSignTagToSigns/trafficSignTagToSigns.js'
import { getSignRelation } from './getSignRelation.js'

describe('signRelations', () => {
  test.each(countries)('%s relations only use catalogue signs', (countryPrefix) => {
    const osmValueParts = new Set(
      countryDefinitions[countryPrefix].map((sign) => sign.osmValuePart),
    )
    for (const relation of signRelations[countryPrefix]) {
      const signs =
        relation.kind === 'incline'
          ? [relation.downhill, relation.uphill]
          : [relation.start, relation.end]
      for (const osmValuePart of signs) {
        expect(osmValueParts.has(osmValuePart), `${countryPrefix}:${osmValuePart}`).toBe(true)
      }
    }
  })

  test('every DE relation works in both directions', () => {
    for (const relation of signRelations.DE) {
      const [first, second] =
        relation.kind === 'incline'
          ? [relation.downhill, relation.uphill]
          : [relation.start, relation.end]
      expect(getSignRelation('DE', first)?.counterpart, first).toBe(second)
      // `274.2` ends both `274.1` and the generic `274.1[47]`; the first relation wins
      if (second !== '274.2') expect(getSignRelation('DE', second)?.counterpart, second).toBe(first)
    }
  })
})

describe('getSignRelation()', () => {
  test.each([
    ['274.1', { kind: 'zone', topic: 'maxspeed', role: 'start', counterpart: '274.2' }],
    ['274.2', { kind: 'zone', topic: 'maxspeed', role: 'end', counterpart: '274.1' }],
    ['274.1[20]', { kind: 'zone', topic: 'maxspeed', role: 'start', counterpart: '274.2-20' }],
    ['274.1[40]', { kind: 'zone', topic: 'maxspeed', role: 'start', counterpart: '274.2[40]' }],
    ['274[50]', { kind: 'section', topic: 'maxspeed', role: 'start', counterpart: '278-50' }],
    ['274[65]', { kind: 'section', topic: 'maxspeed', role: 'start', counterpart: '278[65]' }],
    ['278-130', { kind: 'section', topic: 'maxspeed', role: 'end', counterpart: '274-130' }],
    ['275-60', { kind: 'section', topic: 'minspeed', role: 'start', counterpart: '279-60' }],
    ['314.1', { kind: 'zone', topic: 'parking_fee', role: 'start', counterpart: '314.2' }],
    ['290.2', { kind: 'zone', topic: 'parking_restriction', role: 'end', counterpart: '290.1' }],
    ['325.1', { kind: 'zone', topic: 'living_street', role: 'start', counterpart: '325.2' }],
    ['310', { kind: 'place', topic: 'city_limit', role: 'start', counterpart: '311' }],
    ['108[12]', { kind: 'incline', topic: 'incline', role: 'downhill', counterpart: '110[12]' }],
    ['110-15', { kind: 'incline', topic: 'incline', role: 'uphill', counterpart: '108-15' }],
  ])('%s', (osmValuePart, expected) => {
    expect(getSignRelation('DE', osmValuePart)).toEqual(expected)
  })

  test('accepts a parsed sign', () => {
    const [sign] = trafficSignTagToSigns('DE:244.1', 'DE')
    expect(getSignRelation('DE', sign!)?.counterpart).toBe('244.2')
  })

  test('returns undefined for unrelated, unknown or several signs', () => {
    expect(getSignRelation('DE', '205')).toBeUndefined()
    expect(getSignRelation('DE', 'unknown-sign')).toBeUndefined()
    expect(getSignRelation('DE', '274.1;1020-30')).toBeUndefined()
    expect(getSignRelation('FR', 'B14[30]')).toBeUndefined()
  })
})

import { describe, expect, test } from 'vitest'
import { countryDefinitions } from '../data-definitions/countryDefinitions.js'
import { QUESTION_NIL_ANSWER_ID } from '../data-definitions/TrafficSignDataTypes.js'
import { signsStateByDescriptiveName } from '../utils/signsByDescriptiveName.js'
import { transformToSignState } from '../utils/transformToSignState.js'
import { signsToTags } from './signsToTags.js'

describe('question answers in signsToTags()', () => {
  const data = countryDefinitions.DE

  test('applies sidepath=yes when selected', () => {
    const signs = signsStateByDescriptiveName('DE', data, ['Radweg'])
    expect(signs.length).toBeGreaterThan(0)
    const signKey = signs[0]!.osmValuePart
    const result = signsToTags(signs, 'DE', 'way', {
      [signKey]: { sidepath: 'yes' },
    })
    expect(result.get('is_sidepath')).toBe('yes')
  })

  test('nil answer omits question-derived tags', () => {
    const signs = signsStateByDescriptiveName('DE', data, ['Radweg'])
    expect(signs.length).toBeGreaterThan(0)
    const signKey = signs[0]!.osmValuePart
    const result = signsToTags(signs, 'DE', 'way', {
      [signKey]: { sidepath: QUESTION_NIL_ANSWER_ID },
    })
    expect(result.has('is_sidepath')).toBe(false)
  })

  test('surfaceColor answer emits surface:colour tag', () => {
    const signs = signsStateByDescriptiveName('DE', data, ['Radweg'])
    expect(signs.length).toBeGreaterThan(0)
    const signKey = signs[0]!.osmValuePart
    const result = signsToTags(signs, 'DE', 'way', {
      [signKey]: { surfaceColor: 'red_green' },
    })
    expect(result.get('surface:colour')).toBe('red;green')
  })

  test('surfaceColor on segregated path emits cycleway:surface:colour tag', () => {
    const signs = signsStateByDescriptiveName('DE', data, ['Getrennter Rad- und Gehweg'])
    expect(signs.length).toBeGreaterThan(0)
    const signKey = signs[0]!.osmValuePart
    const result = signsToTags(signs, 'DE', 'way', {
      [signKey]: { surfaceColor: 'red' },
    })
    expect(result.get('cycleway:surface:colour')).toBe('red')
    expect(result.has('surface:colour')).toBe(false)
  })

  test('highway class question emits single highway value with default', () => {
    const signs = signsStateByDescriptiveName('DE', data, ['Getrennter Rad- und Gehweg'])
    const result = signsToTags(signs, 'DE', 'way')
    expect(result.get('highway')).toMatchObject(['path'])
  })

  test('highway class question respects explicit nil', () => {
    const signs = signsStateByDescriptiveName('DE', data, ['Getrennter Rad- und Gehweg'])
    expect(signs.length).toBeGreaterThan(0)
    const signKey = signs[0]!.osmValuePart
    const result = signsToTags(signs, 'DE', 'way', {
      [signKey]: { highwayClass: QUESTION_NIL_ANSWER_ID },
    })
    expect(result.has('highway')).toBe(false)
  })

  test('guidanceMode street-adjacent tags apply to way only, not node', () => {
    const signs = signsStateByDescriptiveName('DE', data, ['Gehweg'])
    expect(signs.length).toBeGreaterThan(0)
    const signKey = signs[0]!.osmValuePart
    const answers = { [signKey]: { guidanceMode: 'streetAdjacent' } }

    const wayTags = signsToTags(signs, 'DE', 'way', answers)
    expect(wayTags.get('footway')).toBe('sidewalk')

    const nodeTags = signsToTags(signs, 'DE', 'node', answers)
    expect(nodeTags.has('footway')).toBe(false)
    expect(nodeTags.get('traffic_sign')).toBe('DE:239')
  })

  test('highway class cycleway removes implicit bicycle=designated', () => {
    const signs = signsStateByDescriptiveName('DE', data, ['Getrennter Rad- und Gehweg'])
    expect(signs.length).toBeGreaterThan(0)
    const signKey = signs[0]!.osmValuePart

    const pathTags = signsToTags(signs, 'DE', 'way', { [signKey]: { highwayClass: 'path' } })
    expect(pathTags.get('highway')).toMatchObject(['path'])
    expect(pathTags.get('bicycle')).toBe('designated')

    const cyclewayTags = signsToTags(signs, 'DE', 'way', {
      [signKey]: { highwayClass: 'cycleway' },
    })
    expect(cyclewayTags.get('highway')).toMatchObject(['cycleway'])
    expect(cyclewayTags.has('bicycle')).toBe(false)
  })

  test('markingColor yellow emits colour tag for DE:299', () => {
    const signs = signsStateByDescriptiveName('DE', data, [
      'Grenzmarkierung für Halt- und Parkverbote',
    ])
    expect(signs.length).toBeGreaterThan(0)
    const signKey = signs[0]!.osmValuePart
    const result = signsToTags(signs, 'DE', 'way', {
      [signKey]: { markingColor: 'yellow' },
    })
    expect(result.get('colour')).toBe('yellow')
    expect(result.get('road_marking')).toBe('restriction')
    expect(result.get('pattern')).toBe('zigzag')
  })

  test('markingColor nil omits colour tag for DE:299', () => {
    for (const descriptiveName of ['Grenzmarkierung für Halt- und Parkverbote'] as const) {
      const signs = signsStateByDescriptiveName('DE', data, [descriptiveName])
      expect(signs.length).toBeGreaterThan(0)
      const signKey = signs[0]!.osmValuePart
      const result = signsToTags(signs, 'DE', 'way', {
        [signKey]: { markingColor: QUESTION_NIL_ANSWER_ID },
      })
      expect(result.has('colour')).toBe(false)
    }
  })

  test('signDirection applies direction tag on node only', () => {
    const signs = signsStateByDescriptiveName('DE', data, ['Radverkehr – Aufstellung rechts'])
    expect(signs.length).toBeGreaterThan(0)
    const signKey = signs[0]!.osmValuePart
    const answers = { [signKey]: { signDirection: 'forward' } }

    const nodeTags = signsToTags(signs, 'DE', 'node', answers)
    expect(nodeTags.get('direction')).toBe('forward')
    expect(nodeTags.get('traffic_sign')).toBe('DE:138-10')

    const wayTags = signsToTags(signs, 'DE', 'way', answers)
    expect(wayTags.has('direction')).toBe(false)
    expect(wayTags.get('hazard')).toBe('cyclists')
  })

  describe('DE:1000-30/31/32/33 bidirectional oneway tagging', () => {
    test('DE:1000-31 separate way recommends oneway=no', () => {
      const sign = data.find((item) => item.osmValuePart === '1000-31')
      expect(sign).toBeDefined()

      const result = signsToTags([transformToSignState('DE', sign!)], 'DE', 'way')
      expect(result.get('oneway')).toBe('no')
      expect(result.has('oneway:bicycle')).toBe(false)
    })

    test('DE:1000-32 separate way recommends oneway=no', () => {
      const signs = signsStateByDescriptiveName('DE', data, [
        'Radverkehr kreuzt von links und rechts',
      ])
      expect(signs.length).toBeGreaterThan(0)

      const result = signsToTags(signs, 'DE', 'way')
      expect(result.get('oneway')).toBe('no')
      expect(result.has('oneway:bicycle')).toBe(false)
    })

    test('DE:1000-32 centerline defaults to cycleway=track and oneway:bicycle=no', () => {
      const signs = signsStateByDescriptiveName('DE', data, [
        'Radverkehr kreuzt von links und rechts',
      ])
      expect(signs.length).toBeGreaterThan(0)

      const result = signsToTags(signs, 'DE', 'way_centerline')
      expect(result.get('cycleway')).toBe('track')
      expect(result.get('oneway:bicycle')).toBe('no')
      expect(result.has('oneway')).toBe(false)
    })

    test('DE:1000-32 centerline contraflow one-way removes cycleway=track', () => {
      const signs = signsStateByDescriptiveName('DE', data, [
        'Radverkehr kreuzt von links und rechts',
      ])
      expect(signs.length).toBeGreaterThan(0)
      const signKey = signs[0]!.osmValuePart

      const result = signsToTags(signs, 'DE', 'way_centerline', {
        [signKey]: { centerlineOnewayContext: 'contraflowOneWay' },
      })
      expect(result.get('oneway:bicycle')).toBe('no')
      expect(result.has('cycleway')).toBe(false)
    })

    test('DE:1000-33 centerline recommends oneway:bicycle=no', () => {
      const signs = signsStateByDescriptiveName('DE', data, ['Radverkehr im Gegenverkehr'])
      expect(signs.length).toBeGreaterThan(0)

      const centerlineTags = signsToTags(signs, 'DE', 'way_centerline')
      expect(centerlineTags.get('oneway:bicycle')).toBe('no')
      expect(centerlineTags.has('oneway')).toBe(false)

      const wayTags = signsToTags(signs, 'DE', 'way')
      expect(wayTags.get('oneway')).toBe('no')
      expect(wayTags.has('oneway:bicycle')).toBe(false)
    })

    test('DE:240 + DE:1000-30 with sidepath keeps oneway=no on separate way', () => {
      const signs = signsStateByDescriptiveName('DE', data, [
        'Gemeinsamer Fuß- und Radweg',
        'Beide Richtungen',
      ])
      const modifier = signs.find((item) => item.osmValuePart === '1000-30')
      expect(modifier).toBeDefined()

      const result = signsToTags(signs, 'DE', 'way', {
        '240': { sidepath: 'yes' },
      })
      expect(result.get('highway')).toMatchObject(['path'])
      expect(result.get('oneway')).toBe('no')
      expect(result.get('is_sidepath')).toBe('yes')
      expect(result.get('traffic_sign')).toBe('DE:240,1000-30')
    })
  })
})

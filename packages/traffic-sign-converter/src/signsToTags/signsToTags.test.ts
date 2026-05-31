import { describe, expect, test } from 'vitest'
import { countryDefinitions } from '../data-definitions/countryDefinitions.js'
import type { SignStateType } from '../data-definitions/TrafficSignDataTypes.js'
import { combineSignIdSignValue } from '../utils/combineSignIdSignValue.js'
import { signsStateByDescriptiveName } from '../utils/signsByDescriptiveName.js'
import { signsToOptionalTags, signsToOptionalTagsBySign } from './signsToOptionalTags.js'
import { signsToTags } from './signsToTags.js'

describe('signsToTags()', () => {
  const data = countryDefinitions.DE

  describe('highway tag', () => {
    test('Collects unique values with highway-class defaults', () => {
      const signs = signsStateByDescriptiveName('DE', data, [
        'Gehweg',
        'Gemeinsamer Fuß- und Radweg',
        'Getrennter Rad- und Gehweg',
      ])
      const result = signsToTags(signs, 'DE', 'way')
      expect(result.get('highway')).toMatchObject(['footway', 'path'])
    })

    test('No empty list', () => {
      const signs = signsStateByDescriptiveName('DE', data, ['Zulässige Höchstgeschwindigkeit'])
      const result = signsToTags(signs, 'DE', 'way')
      expect(result.has('highway')).toBeFalsy()
    })

    test('Handle valueTemplate', () => {
      const signs = signsStateByDescriptiveName('DE', data, ['Tempo ??-Zone'])
      const result = signsToTags(signs, 'DE', 'way')
      expect(result.get('zone:maxspeed')).toBe('DE:47')
    })
  })

  describe('access tag', () => {
    test('Merged access tags', () => {
      const signs = signsStateByDescriptiveName('DE', data, ['Fahrradstraße', 'Anlieger frei'])
      const result = signsToTags(signs, 'DE', 'way')
      expect(result.get('vehicle')).toBe('destination')
    })
  })

  describe('DE:245 Bussonderfahrstreifen', () => {
    test('separate way: highway=service, vehicle=no, bus=designated', () => {
      const signs = signsStateByDescriptiveName('DE', data, ['Bussonderfahrstreifen'])
      const result = signsToTags(signs, 'DE', 'way')
      expect(result.get('highway')).toStrictEqual(['service'])
      expect(result.get('vehicle')).toBe('no')
      expect(result.get('bus')).toBe('designated')
      expect(result.get('traffic_sign')).toBe('DE:245')
    })

    test('separate way: highway=busway when selected', () => {
      const signs = signsStateByDescriptiveName('DE', data, ['Bussonderfahrstreifen'])
      const result = signsToTags(signs, 'DE', 'way', { '245': { highwayClass: 'busway' } })
      expect(result.get('highway')).toStrictEqual(['busway'])
      expect(result.get('vehicle')).toBe('no')
      expect(result.get('bus')).toBe('designated')
    })

    test('separate way: optional lane tags with guidance', () => {
      const signs = signsStateByDescriptiveName('DE', data, ['Bussonderfahrstreifen'])
      const optionalTagsBySign = signsToOptionalTagsBySign(signs, 'way')
      const entry = optionalTagsBySign.get('245')
      expect(entry?.tags.get('lanes:bus')).toBe('*')
      expect(entry?.tags.get('bus:lanes')).toBe('yes|yes|designated')
      expect(entry?.guidance?.lang).toBe('de')
      expect(entry?.guidance?.link).toContain('Busfahrstreifen')
    })

    test('no centerline recommendations', () => {
      const signs = signsStateByDescriptiveName('DE', data, ['Bussonderfahrstreifen'])
      const result = signsToTags(signs, 'DE', 'way_centerline')
      expect(result.size).toBe(0)
    })
  })

  describe('unique tags', () => {
    test('One sign with unique tags', () => {
      const signs = signsStateByDescriptiveName('DE', data, ['Fahrradstraße'])
      const result = signsToTags(signs, 'DE', 'way')
      expect(result.get('bicycle_road')).toBe('yes')
      expect(result.get('bicycle')).toBe('designated')
    })

    test('Tag 2 overwrites Tag 1', () => {
      const signs = [
        {
          recodgnizedSign: true,
          kind: 'traffic_sign',
          tagRecommendationsByGeometry: [
            { geometries: ['way'], uniqueTags: [{ key: 'foo', value: 'bar' }] },
          ],
        },
        {
          recodgnizedSign: true,
          kind: 'traffic_sign',
          tagRecommendationsByGeometry: [
            { geometries: ['way'], uniqueTags: [{ key: 'foo', value: 'bar2' }] },
          ],
        },
      ] as SignStateType[]
      const result = signsToTags(signs, 'DE', 'way')
      expect(result.get('foo')).toBe('bar2')
    })

    test('highway tags on unique tags get ignored', () => {
      const signs = [
        {
          recodgnizedSign: true,
          kind: 'traffic_sign',
          tagRecommendationsByGeometry: [
            {
              geometries: ['way'],
              highwayValues: ['winner1'],
              uniqueTags: [{ key: 'highway', value: 'gets-ignored' }],
            },
          ],
        },
        {
          recodgnizedSign: true,
          kind: 'traffic_sign',
          tagRecommendationsByGeometry: [{ geometries: ['way'], highwayValues: ['winner2'] }],
        },
      ] as SignStateType[]
      const result = signsToTags(signs, 'DE', 'way')
      expect(result.get('highway')).toStrictEqual(['winner1', 'winner2'])
    })

    test('acces tag overwrite unique tags', () => {
      const signs = [
        {
          recodgnizedSign: true,
          kind: 'traffic_sign',
          tagRecommendationsByGeometry: [
            {
              geometries: ['way'],
              accessTags: [{ key: 'vehicle', value: 'winner' }],
              uniqueTags: [{ key: 'vehicle', value: 'gets-ignored' }],
            },
          ],
        },
        {
          recodgnizedSign: true,
          kind: 'traffic_sign',
          tagRecommendationsByGeometry: [
            {
              geometries: ['way'],
              accessTags: [{ key: 'vehicle', value: 'winner2' }],
              uniqueTags: [{ key: 'bicycle', value: 'this-is-intended' }],
            },
          ],
        },
      ] as SignStateType[]
      const result = signsToTags(signs, 'DE', 'way')
      expect(result.get('vehicle')).toBe('winner2')
      expect(result.get('bicycle')).toBe('this-is-intended')
    })
  })

  describe('conditional tag', () => {
    test('Single sign with conditional tag', () => {
      const signs = signsStateByDescriptiveName('DE', data, [
        'Überholverbot für Kraftfahrzeuge aller Art',
      ])
      const result = signsToTags(signs, 'DE', 'way')
      expect(result.get('overtaking')).toBe('no')
    })

    test('Sign group with conditional sign with prompt', () => {
      const signs = signsStateByDescriptiveName('DE', data, [
        'Überholverbot für Kraftfahrzeuge aller Art',
        'Zeitliche Beschräkung',
      ])
      const result = signsToTags(signs, 'DE', 'way')
      expect(result.get('overtaking')).toBeUndefined()
      expect(result.get('overtaking:conditional')).toBe('no @ (16:00-18:00)')
    })

    test('uses dual format for traffic_sign and conditional values', () => {
      const signs = signsStateByDescriptiveName('DE', data, [
        'Zulässige Höchstgeschwindigkeit',
        'Zeitliche Beschräkung',
      ])
      const speedSign = signs.find((sign) => sign.recodgnizedSign && sign.kind === 'traffic_sign')!
      speedSign.signValue = 80
      speedSign.osmValuePart = combineSignIdSignValue(speedSign.signId, 80)
      const timeSign = signs.find((sign) => sign.recodgnizedSign && sign.signId === '1040-30')!
      timeSign.signValue = '06:00-18:00'
      timeSign.osmValuePart = combineSignIdSignValue(timeSign.signId, '06:00-18:00')

      const result = signsToTags(signs, 'DE', 'way')
      expect(result.get('maxspeed:conditional')).toBe('80 @ (06:00-18:00)')
      expect(result.get('traffic_sign')).toBe('DE:274-5[80],1040-30[6-18]')
    })

    test('normalizes midnight ranges in conditional output', () => {
      const signs = signsStateByDescriptiveName('DE', data, [
        'Zulässige Höchstgeschwindigkeit',
        'Zeitliche Beschräkung',
      ])
      const speedSign = signs.find((sign) => sign.recodgnizedSign && sign.kind === 'traffic_sign')!
      speedSign.signValue = 80
      speedSign.osmValuePart = combineSignIdSignValue(speedSign.signId, 80)
      const timeSign = signs.find((sign) => sign.recodgnizedSign && sign.signId === '1040-30')!
      timeSign.signValue = '22-6'
      timeSign.osmValuePart = combineSignIdSignValue(timeSign.signId, '22-6')

      const result = signsToTags(signs, 'DE', 'way')
      expect(result.get('maxspeed:conditional')).toBe('80 @ (22:00-06:00)')
      expect(result.get('traffic_sign')).toBe('DE:274-5[80],1040-30[22-6]')
    })

    test('normalizes opening_hours-like modifier values for both outputs', () => {
      const signs = signsStateByDescriptiveName('DE', data, [
        'Überholverbot für Kraftfahrzeuge aller Art',
        'Zeitliche Beschräkung: werktags, von-bis',
      ])
      const timeSign = signs.find((sign) => sign.recodgnizedSign && sign.signId === '1042-31')!
      timeSign.signValue = 'Mo-Sa 1:00-12:30'
      timeSign.osmValuePart = combineSignIdSignValue(timeSign.signId, 'Mo-Sa 1:00-12:30')

      const result = signsToTags(signs, 'DE', 'way')
      expect(result.get('overtaking:conditional')).toBe('no @ (Mo-Sa 01:00-12:30)')
      expect(result.get('traffic_sign')).toBe('DE:276,1042-31[Mo-Sa 1-12:30]')
    })
  })

  describe('https://github.com/osmberlin/osm-traffic-sign-tool/issues/67', () => {
    test('handle the exception_modifier (Verbot außer Lieferverkehr)', () => {
      const signs = signsStateByDescriptiveName('DE', data, [
        'Verbot für Kraftfahrzeuge mit einem zulässigen Gesamtgewicht über 3,5 t…',
        'Lieferverkehr frei',
      ])
      const result = signsToTags(signs, 'DE', 'way')
      expect(result).toMatchObject(
        new Map([
          ['hgv', 'delivery'],
          ['traffic_sign', 'DE:253,1026-35'],
        ]),
      )
    })
    test('handle the condition_modifier (Verbot ab 7.5 t)', () => {
      const signs = signsStateByDescriptiveName('DE', data, [
        'Verbot für Kraftfahrzeuge mit einem zulässigen Gesamtgewicht über 3,5 t…',
        'Massenangabe 7,5 t',
      ])
      const result = signsToTags(signs, 'DE', 'way')
      expect(result).toMatchObject(
        new Map([
          ['hgv', 'no'],
          ['hgv:conditional', 'no @ (maxweightrating>7.5)'],
          ['traffic_sign', 'DE:253,1053-33'],
        ]),
      )
    })
    // UNSUPPORTED FOR NOW
    // See https://github.com/osmberlin/osm-traffic-sign-tool/issues/67#issuecomment-2676036906
    test.skip('handle the combination of condition_modifier and exception_modifier (Verbot für Lieferverkehr ab 7,5 t)', () => {
      const signs = signsStateByDescriptiveName('DE', data, [
        'Verbot für Kraftfahrzeuge mit einem zulässigen Gesamtgewicht über 3,5 t…',
        'Massenangabe 7,5 t',
        'Lieferverkehr frei',
      ])
      const result = signsToTags(signs, 'DE', 'way')
      expect(result).toMatchObject(
        new Map([
          ['hgv:conditional', 'delivery @ (maxweightrating>7.5)'],
          ['traffic_sign', 'DE:253,1026-35,1053-33'],
        ]),
      )
    })
  })
})

import { describe, expect, test } from 'vitest'
import { countryDefinitions } from '../data-definitions/countryDefinitions.js'
import type { SignStateType } from '../data-definitions/TrafficSignDataTypes.js'
import { signsStateByDescriptiveName } from '../utils/signsByDescriptiveName.js'
import { signToTags } from './signToTags.js'

describe('signToTags()', () => {
  const data = countryDefinitions.DE

  describe('highway tag', () => {
    test('Collects unique values', () => {
      const signs = signsStateByDescriptiveName('DE', data, [
        'Gehweg',
        'Gemeinsamer Fuß- und Radweg',
        'Getrennter Rad- und Gehweg',
      ])
      const result = signToTags(signs, 'DE')
      expect(result.get('highway')).toMatchObject(['footway', 'path', 'cycleway'])
    })

    test('No empty list', () => {
      const signs = signsStateByDescriptiveName('DE', data, ['Zulässige Höchstgeschwindigkeit'])
      const result = signToTags(signs, 'DE')
      expect(result.has('highway')).toBeFalsy()
    })

    test('Handle valueTemplate', () => {
      const signs = signsStateByDescriptiveName('DE', data, ['Tempo ??-Zone'])
      const result = signToTags(signs, 'DE')
      expect(result.get('zone:maxspeed')).toBe('DE:47')
    })
  })

  describe('access tag', () => {
    test('Merged access tags', () => {
      const signs = signsStateByDescriptiveName('DE', data, ['Fahrradstraße', 'Anlieger frei'])
      const result = signToTags(signs, 'DE')
      expect(result.get('vehicle')).toBe('destination')
    })
  })

  describe('unique tags', () => {
    test('One sign with unique tags', () => {
      const signs = signsStateByDescriptiveName('DE', data, ['Fahrradstraße'])
      const result = signToTags(signs, 'DE')
      expect(result.get('bicycle_road')).toBe('yes')
      expect(result.get('bicycle')).toBe('designated')
    })

    test('Tag 2 overwrites Tag 1', () => {
      const signs = [
        {
          recodgnizedSign: true,
          kind: 'traffic_sign',
          tagRecommendations: { uniqueTags: [{ key: 'foo', value: 'bar' }] },
        },
        {
          recodgnizedSign: true,
          kind: 'traffic_sign',
          tagRecommendations: { uniqueTags: [{ key: 'foo', value: 'bar2' }] },
        },
      ] as SignStateType[]
      const result = signToTags(signs, 'DE')
      expect(result.get('foo')).toBe('bar2')
    })

    test('highway tags on unique tags get ignored', () => {
      const signs = [
        {
          recodgnizedSign: true,
          kind: 'traffic_sign',
          tagRecommendations: {
            highwayValues: ['winner1'],
            uniqueTags: [{ key: 'highway', value: 'gets-ignored' }],
          },
        },
        {
          recodgnizedSign: true,
          kind: 'traffic_sign',
          tagRecommendations: { highwayValues: ['winner2'] },
        },
      ] as SignStateType[]
      const result = signToTags(signs, 'DE')
      expect(result.get('highway')).toStrictEqual(['winner1', 'winner2'])
    })

    test('acces tag overwrite unique tags', () => {
      const signs = [
        {
          recodgnizedSign: true,
          kind: 'traffic_sign',
          tagRecommendations: {
            accessTags: [{ key: 'vehicle', value: 'winner' }],
            uniqueTags: [{ key: 'vehicle', value: 'gets-ignored' }],
          },
        },
        {
          recodgnizedSign: true,
          kind: 'traffic_sign',
          tagRecommendations: {
            accessTags: [{ key: 'vehicle', value: 'winner2' }],
            uniqueTags: [{ key: 'bicycle', value: 'this-is-intended' }],
          },
        },
      ] as SignStateType[]
      const result = signToTags(signs, 'DE')
      expect(result.get('vehicle')).toBe('winner2')
      expect(result.get('bicycle')).toBe('this-is-intended')
    })
  })

  describe('conditional tag', () => {
    test('Single sign with conditional tag', () => {
      const signs = signsStateByDescriptiveName('DE', data, [
        'Überholverbot für Kraftfahrzeuge aller Art',
      ])
      const result = signToTags(signs, 'DE')
      expect(result.get('overtaking')).toBe('no')
    })

    test('Sign group with conditional sign with prompt', () => {
      const signs = signsStateByDescriptiveName('DE', data, [
        'Überholverbot für Kraftfahrzeuge aller Art',
        'Zeitliche Beschräkung',
      ])
      const result = signToTags(signs, 'DE')
      expect(result.get('overtaking')).toBeUndefined()
      expect(result.get('overtaking:conditional')).toBe('no @ (16-18)')
    })
  })

  describe('https://github.com/osmberlin/osm-traffic-sign-tool/issues/67', () => {
    test('handle the exception_modifier (Verbot außer Lieferverkehr)', () => {
      const signs = signsStateByDescriptiveName('DE', data, [
        'Verbot für Kraftfahrzeuge mit einem zulässigen Gesamtgewicht über 3,5 t…',
        'Lieferverkehr frei',
      ])
      const result = signToTags(signs, 'DE')
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
      const result = signToTags(signs, 'DE')
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
      const result = signToTags(signs, 'DE')
      expect(result).toMatchObject(
        new Map([
          ['hgv:conditional', 'delivery @ (maxweightrating>7.5)'],
          ['traffic_sign', 'DE:253,1026-35,1053-33'],
        ]),
      )
    })
  })
})

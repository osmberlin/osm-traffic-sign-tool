import { describe, expect, test } from 'vitest'
import type { SignType } from '../data/TrafficSignDataTypes.js'
import { signsByDescriptiveName } from '../data/utils/signsByDescriptiveName.js'
import { signToTags } from './signToTags.js'

describe('signToTags()', () => {
  describe('highway tag', () => {
    test('Collects unique values', () => {
      const signs = signsByDescriptiveName(['Gehweg', 'Radfahrer frei'])
      // const result = new Map([['highway', ['footway', 'path']]])
      const result = signToTags(signs)
      expect(result.get('highway')).toMatchObject(['footway', 'path'])
    })
  })

  describe('access tag', () => {
    test('Merged access tags', () => {
      const signs = signsByDescriptiveName(['Fahrradstraße', 'Anlieger frei'])
      const result = signToTags(signs)
      expect(result.get('vehicle')).toBe('destination')
    })
  })

  describe('unique tags', () => {
    test('One sign with unique tags', () => {
      const signs = signsByDescriptiveName(['Fahrradstraße'])
      const result = signToTags(signs)
      expect(result.get('bicycle_road')).toBe('yes')
      expect(result.get('bicycle')).toBe('designated')
    })

    test('Tag 2 overwrites Tag 1', () => {
      const signs = [
        {
          kind: 'traffic_sign',
          tagRecommendations: { uniqueTags: [{ key: 'foo', value: 'bar' }] },
        },
        {
          kind: 'traffic_sign',
          tagRecommendations: { uniqueTags: [{ key: 'foo', value: 'bar2' }] },
        },
      ] as SignType[]
      const result = signToTags(signs)
      expect(result.get('foo')).toBe('bar2')
    })

    test('highway tags on unique tags get ignored', () => {
      const signs = [
        {
          kind: 'traffic_sign',
          tagRecommendations: {
            highwayValues: ['winner1'],
            uniqueTags: [{ key: 'highway', value: 'gets-ignored' }],
          },
        },
        { kind: 'traffic_sign', tagRecommendations: { highwayValues: ['winner2'] } },
      ] as SignType[]
      const result = signToTags(signs)
      expect(result.get('highway')).toStrictEqual(['winner1', 'winner2'])
    })

    test('acces tag overwrite unique tags', () => {
      const signs = [
        {
          kind: 'traffic_sign',
          tagRecommendations: {
            accessTags: [{ key: 'vehicle', value: 'winner' }],
            uniqueTags: [{ key: 'vehicle', value: 'gets-ignored' }],
          },
        },
        {
          kind: 'traffic_sign',
          tagRecommendations: {
            accessTags: [{ key: 'vehicle', value: 'winner2' }],
            uniqueTags: [{ key: 'bicycle', value: 'this-is-intended' }],
          },
        },
      ] as SignType[]
      const result = signToTags(signs)
      expect(result.get('vehicle')).toBe('winner2')
      expect(result.get('bicycle')).toBe('this-is-intended')
    })
  })

  describe('conditional tag', () => {
    test('Single sign with conditional tag', () => {
      const signs = signsByDescriptiveName(['Überholverbot für Kraftfahrzeuge aller Art'])
      const result = signToTags(signs)
      expect(result.get('overtaking')).toBe('no')
    })

    test('Sign group with conditional sign with prompt', () => {
      const signs = signsByDescriptiveName([
        'Überholverbot für Kraftfahrzeuge aller Art',
        'Zeitliche Beschräkung',
      ])
      const result = signToTags(signs)
      expect(result.get('overtaking')).toBeUndefined()
      expect(result.get('overtaking:conditional')).toBe('no @ 16-18')
    })
  })
})

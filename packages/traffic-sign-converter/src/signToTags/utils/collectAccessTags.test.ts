import { describe, expect, test } from 'vitest'
import type { SignType } from '../../data/TrafficSignDataTypes.js'
import { signsByDescriptiveName } from '../../data/utils/signsByDescriptiveName.js'
import { collectAccessTags } from './collectAccessTags.js'

describe('collectAccessTags()', () => {
  describe('Real signs', () => {
    test('Fahrradstraße', () => {
      const signs = signsByDescriptiveName(['Fahrradstraße'])
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'vehicle', value: 'no' }])
    })

    test('Fahrradstraße+Anlieger frei', () => {
      const signs = signsByDescriptiveName(['Fahrradstraße', 'Anlieger frei'])
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'vehicle', value: 'destination' }])
    })

    test('Verbot für Krafträder, Kleinkrafträder und Mofas', () => {
      const signs = signsByDescriptiveName([
        'Verbot für Krafträder, auch mit Beiwagen, Kleinkrafträder und Mofas',
      ])
      expect(collectAccessTags(signs)).toMatchObject([
        { key: 'motorcycle', value: 'no' },
        { key: 'moped', value: 'no' },
        { key: 'mofa', value: 'no' },
      ])
    })

    test('Verbot für Krafträder, Kleinkrafträder und Mofas + Mofas frei', () => {
      const signs = signsByDescriptiveName([
        'Verbot für Krafträder, auch mit Beiwagen, Kleinkrafträder und Mofas',
        'Mofas frei',
      ])
      expect(collectAccessTags(signs)).toMatchObject([
        { key: 'motorcycle', value: 'no' },
        { key: 'moped', value: 'no' },
        { key: 'mofa', value: 'yes' },
      ])
    })

    test('(Fiktive Kombination) Verbot für Krafträder, Kleinkrafträder und Mofas + Alles wieder "yes"', () => {
      const signs = signsByDescriptiveName([
        'Verbot für Krafträder, auch mit Beiwagen, Kleinkrafträder und Mofas',
        'Krafträder auch mit Beiwagen, Krafträder und Mofas frei',
      ])
      expect(collectAccessTags(signs)).toMatchObject([
        { key: 'motorcycle', value: 'yes' },
        { key: 'moped', value: 'yes' },
        { key: 'mofa', value: 'yes' },
      ])
    })

    test('Verbot für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge + Kraftomnibus frei', () => {
      const signs = signsByDescriptiveName([
        'Verbot für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge',
        'Kraftomnibus frei',
      ])
      expect(collectAccessTags(signs)).toMatchObject([
        { key: 'motorcar', value: 'no' },
        { key: 'bus', value: 'yes' },
        { key: 'tourist_bus', value: 'yes' },
      ])
    })

    test('Only Anlieger frei => No Tag', () => {
      const signs = signsByDescriptiveName(['Anlieger frei'])
      expect(collectAccessTags(signs)).toMatchObject([])
    })
  })

  describe('Artificial signs', () => {
    test('One Sign, full Tag', () => {
      const signs = [
        {
          kind: 'traffic_sign',
          tagRecommendations: { accessTags: [{ key: 'foo', value: 'bar' }] },
        },
      ] as SignType[]
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'foo', value: 'bar' }])
    })

    test('One Sign, two Tags', () => {
      const signs = [
        {
          kind: 'traffic_sign',
          tagRecommendations: {
            accessTags: [
              { key: 'foo', value: 'bar' },
              { key: 'foo2', value: 'bar2' },
            ],
          },
        },
      ] as SignType[]
      expect(collectAccessTags(signs)).toMatchObject([
        { key: 'foo', value: 'bar' },
        { key: 'foo2', value: 'bar2' },
      ])
    })

    test('Two Signs, same key, second wins', () => {
      const signs = [
        {
          kind: 'traffic_sign',
          tagRecommendations: { accessTags: [{ key: 'foo', value: 'bar' }] },
        },
        {
          kind: 'traffic_sign',
          tagRecommendations: { accessTags: [{ key: 'foo', value: 'bar2' }] },
        },
      ] as SignType[]
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'foo', value: 'bar2' }])
    })

    test('Two Signs, different keys', () => {
      const signs = [
        {
          kind: 'traffic_sign',
          tagRecommendations: { accessTags: [{ key: 'foo', value: 'bar' }] },
        },
        {
          kind: 'traffic_sign',
          tagRecommendations: { accessTags: [{ key: 'foo2', value: 'bar2' }] },
        },
      ] as SignType[]
      expect(collectAccessTags(signs)).toMatchObject([
        { key: 'foo', value: 'bar' },
        { key: 'foo2', value: 'bar2' },
      ])
    })

    test('One sign, one modifer', () => {
      const signs = [
        {
          kind: 'traffic_sign',
          tagRecommendations: { accessTags: [{ key: 'foo', value: 'bar' }] },
        },
        { kind: 'modifier_sign', tagRecommendations: { accessValue: 'aaa' } },
      ] as SignType[]
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'foo', value: 'aaa' }])
    })

    test('One sign, two modifer', () => {
      const signs = [
        {
          kind: 'traffic_sign',
          tagRecommendations: { accessTags: [{ key: 'foo', value: 'bar' }] },
        },
        { kind: 'modifier_sign', tagRecommendations: { accessValue: 'aaa' } },
        { kind: 'modifier_sign', tagRecommendations: { accessValue: 'bbb' } },
      ] as SignType[]
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'foo', value: 'bbb' }])
    })
  })
})

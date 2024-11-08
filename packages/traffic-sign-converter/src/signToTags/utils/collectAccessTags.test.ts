import { describe, expect, test } from 'vitest'
import type { SignStateType } from '../../data/TrafficSignDataTypes.js'
import { signsStateByDescriptiveName } from '../../data/utils/signsByDescriptiveName.js'
import { collectAccessTags } from './collectAccessTags.js'

describe('collectAccessTags()', () => {
  describe('Real signs', () => {
    test('Fahrradstraße', () => {
      const signs = signsStateByDescriptiveName(['Fahrradstraße'])
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'vehicle', value: 'no' }])
    })

    test('Fahrradstraße+Anlieger frei', () => {
      const signs = signsStateByDescriptiveName(['Fahrradstraße', 'Anlieger frei'])
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'vehicle', value: 'destination' }])
    })

    test('Verbot für Krafträder, Kleinkrafträder und Mofas', () => {
      const signs = signsStateByDescriptiveName([
        'Verbot für Krafträder, auch mit Beiwagen, Kleinkrafträder und Mofas',
      ])
      expect(collectAccessTags(signs)).toMatchObject([
        { key: 'motorcycle', value: 'no' },
        { key: 'moped', value: 'no' },
        { key: 'mofa', value: 'no' },
      ])
    })

    test('Verbot für Krafträder, Kleinkrafträder und Mofas + Mofas frei', () => {
      const signs = signsStateByDescriptiveName([
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
      const signs = signsStateByDescriptiveName([
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
      const signs = signsStateByDescriptiveName([
        'Verbot für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge',
        'Kraftomnibus frei',
      ])
      expect(collectAccessTags(signs)).toMatchObject([
        { key: 'motorcar', value: 'no' },
        { key: 'bus', value: 'yes' },
        { key: 'tourist_bus', value: 'yes' },
      ])
    })

    test('Verbot für Fahrzeuge aller Art + Radfahrer, Anlieger frei', () => {
      const signs = signsStateByDescriptiveName([
        'Verbot für Fahrzeuge aller Art',
        'Radfahrer und Anlieger frei',
      ])
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'vehicle', value: 'destination' }])
    })
  })

  describe('Artificial signs', () => {
    test('One Sign, full Tag', () => {
      const signs = [
        {
          recodgnizedSign: true,
          kind: 'traffic_sign',
          tagRecommendations: { accessTags: [{ key: 'foo', value: 'bar' }] },
        },
      ] as SignStateType[]
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'foo', value: 'bar' }])
    })

    test('One Sign, two Tags', () => {
      const signs = [
        {
          recodgnizedSign: true,
          kind: 'traffic_sign',
          tagRecommendations: {
            accessTags: [
              { key: 'foo', value: 'bar' },
              { key: 'foo2', value: 'bar2' },
            ],
          },
        },
      ] as SignStateType[]
      expect(collectAccessTags(signs)).toMatchObject([
        { key: 'foo', value: 'bar' },
        { key: 'foo2', value: 'bar2' },
      ])
    })

    test('Two Signs, same key, second wins', () => {
      const signs = [
        {
          recodgnizedSign: true,
          kind: 'traffic_sign',
          tagRecommendations: { accessTags: [{ key: 'foo', value: 'bar' }] },
        },
        {
          recodgnizedSign: true,
          kind: 'traffic_sign',
          tagRecommendations: { accessTags: [{ key: 'foo', value: 'bar2' }] },
        },
      ] as SignStateType[]
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'foo', value: 'bar2' }])
    })

    test('Two Signs, different keys', () => {
      const signs = [
        {
          recodgnizedSign: true,
          kind: 'traffic_sign',
          tagRecommendations: { accessTags: [{ key: 'foo', value: 'bar' }] },
        },
        {
          recodgnizedSign: true,
          kind: 'traffic_sign',
          tagRecommendations: { accessTags: [{ key: 'foo2', value: 'bar2' }] },
        },
      ] as SignStateType[]
      expect(collectAccessTags(signs)).toMatchObject([
        { key: 'foo', value: 'bar' },
        { key: 'foo2', value: 'bar2' },
      ])
    })

    test('One sign, one modifer', () => {
      const signs = [
        {
          recodgnizedSign: true,
          kind: 'traffic_sign',
          tagRecommendations: { accessTags: [{ key: 'foo', value: 'bar' }] },
        },
        {
          recodgnizedSign: true,
          kind: 'modifier_sign',
          tagRecommendations: { accessValue: 'aaa' },
        },
      ] as SignStateType[]
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'foo', value: 'aaa' }])
    })

    test('One sign, two modifer', () => {
      const signs = [
        {
          recodgnizedSign: true,
          kind: 'traffic_sign',
          tagRecommendations: { accessTags: [{ key: 'foo', value: 'bar' }] },
        },
        {
          recodgnizedSign: true,
          kind: 'modifier_sign',
          tagRecommendations: { accessValue: 'aaa' },
        },
        {
          recodgnizedSign: true,
          kind: 'modifier_sign',
          tagRecommendations: { accessValue: 'bbb' },
        },
      ] as SignStateType[]
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'foo', value: 'bbb' }])
    })
  })

  describe('One sign without access "slots", modifier sign adds general access=*', () => {
    test('agricultural', () => {
      const signs = signsStateByDescriptiveName([
        'Gemeinsamer Fuß- und Radweg',
        'Landwirtschaftlicher Verkehr frei',
      ])
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'access', value: 'agricultural' }])
    })

    test('agricultural', () => {
      const signs = signsStateByDescriptiveName(['Fußgängerbereich', 'Anlieger frei'])
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'access', value: 'destination' }])
    })

    test('Only Anlieger frei => Custom A', () => {
      const signs = signsStateByDescriptiveName(['Anlieger frei'])
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'access', value: 'destination' }])
    })
  })
})

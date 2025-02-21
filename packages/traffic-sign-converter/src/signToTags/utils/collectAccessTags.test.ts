import { describe, expect, test } from 'vitest'
import { countryDefinitions } from '../../data-definitions/countryDefinitions.js'
import type { SignStateType } from '../../data-definitions/TrafficSignDataTypes.js'
import { signsStateByDescriptiveName } from '../../utils/signsByDescriptiveName.js'
import { collectAccessTags } from './collectAccessTags.js'
import { collectConditionalTags } from './collectConditionalTags.js'

describe('collectAccessTags()', () => {
  const data = countryDefinitions.DE

  describe('Real signs', () => {
    test('Fahrradstraße', () => {
      const signs = signsStateByDescriptiveName(data, ['Fahrradstraße'])
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'vehicle', value: 'no' }])
    })

    test('Fahrradstraße+Anlieger frei', () => {
      const signs = signsStateByDescriptiveName(data, ['Fahrradstraße', 'Anlieger frei'])
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'vehicle', value: 'destination' }])
    })

    test('Verbot für Krafträder, Kleinkrafträder und Mofas', () => {
      const signs = signsStateByDescriptiveName(data, [
        'Verbot für Krafträder, auch mit Beiwagen, Kleinkrafträder und Mofas',
      ])
      expect(collectAccessTags(signs)).toMatchObject([
        { key: 'motorcycle', value: 'no' },
        { key: 'moped', value: 'no' },
        { key: 'mofa', value: 'no' },
      ])
    })

    test('Verbot für Krafträder, Kleinkrafträder und Mofas + Mofas frei', () => {
      const signs = signsStateByDescriptiveName(data, [
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
      const signs = signsStateByDescriptiveName(data, [
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
      const signs = signsStateByDescriptiveName(data, [
        'Verbot für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge',
        'Kraftomnibus frei',
      ])
      expect(collectAccessTags(signs)).toMatchObject([
        { key: 'motorcar', value: 'bus;tourist_bus' },
      ])
    })

    test('Verbot für Fahrzeuge aller Art + Radfahrer, Anlieger frei', () => {
      const signs = signsStateByDescriptiveName(data, [
        'Verbot für Fahrzeuge aller Art',
        'Anlieger frei',
        'Land- und forstwirtschaftlicher Verkehr frei',
      ])
      expect(collectAccessTags(signs)).toMatchObject([
        { key: 'vehicle', value: 'destination;agricultural;forestry' },
      ])
    })

    test('https://trafficsigns.osm-verkehrswende.org/DE?signs=DE:250,1020-30,1026-38', () => {
      const signs = signsStateByDescriptiveName(data, [
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

    test('One sign (non "no"), one modifer', () => {
      const signs = [
        {
          recodgnizedSign: true,
          kind: 'traffic_sign',
          tagRecommendations: { accessTags: [{ key: 'foo', value: 'non-no' }] },
        },
        {
          recodgnizedSign: true,
          kind: 'exception_modifier',
          tagRecommendations: { modifierValue: 'added' },
        },
      ] as SignStateType[]
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'foo', value: 'non-no;added' }])
    })

    test('One sign ("no"), one modifer', () => {
      const signs = [
        {
          recodgnizedSign: true,
          kind: 'traffic_sign',
          tagRecommendations: { accessTags: [{ key: 'foo', value: 'no' }] },
        },
        {
          recodgnizedSign: true,
          kind: 'exception_modifier',
          tagRecommendations: { modifierValue: 'replaced' },
        },
      ] as SignStateType[]
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'foo', value: 'replaced' }])
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
          kind: 'exception_modifier',
          tagRecommendations: { modifierValue: 'aaa' },
        },
        {
          recodgnizedSign: true,
          kind: 'exception_modifier',
          tagRecommendations: { modifierValue: 'bbb' },
        },
      ] as SignStateType[]
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'foo', value: 'bar;aaa;bbb' }])
    })
  })

  describe('One sign without access "slots", modifier sign adds general access=*', () => {
    test('agricultural', () => {
      const signs = signsStateByDescriptiveName(data, [
        'Gemeinsamer Fuß- und Radweg',
        'Landwirtschaftlicher Verkehr frei',
      ])
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'access', value: 'agricultural' }])
      expect(collectConditionalTags(signs)).toMatchObject([])
    })

    test('agricultural', () => {
      const signs = signsStateByDescriptiveName(data, ['Fußgängerbereich', 'Anlieger frei'])
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'access', value: 'destination' }])
      expect(collectConditionalTags(signs)).toMatchObject([])
    })

    test('Only Anlieger frei => Custom A', () => {
      const signs = signsStateByDescriptiveName(data, ['Anlieger frei'])
      expect(collectAccessTags(signs)).toMatchObject([{ key: 'access', value: 'destination' }])
      expect(collectConditionalTags(signs)).toMatchObject([])
    })
  })

  describe('Check that access and conditional tags do not mix', () => {
    test('no access when conditionalValues given', () => {
      const signs = signsStateByDescriptiveName(data, [
        'Verbot für Fahrzeuge über die angegebene Breite einschließlich Ladung',
        'Anlieger frei',
      ])
      expect(collectAccessTags(signs)).toMatchObject([])
      expect(collectConditionalTags(signs)).toMatchObject([
        { key: 'maxwidth', value: '2' },
        { key: 'maxwidth:conditional', value: 'none @ (destination)' },
      ])
    })
  })
})

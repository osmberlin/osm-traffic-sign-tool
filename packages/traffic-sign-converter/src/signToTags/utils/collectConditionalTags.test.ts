import { describe, expect, test } from 'vitest'
import type { SignStateType } from '../../data/TrafficSignDataTypes.js'
import { signsStateByDescriptiveName } from '../../data/utils/signsByDescriptiveName.js'
import { combineSignIdSignValue } from '../../signIdSignValueUtils/combineSignIdSignValue.js'
import { collectAccessTags } from './collectAccessTags.js'
import { collectConditionalTags } from './collectConditionalTags.js'
import { collectUniqueTags } from './collectUniqueTags.js'

describe('collectConditionalTags()', () => {
  // https://osmtools.de/traffic_signs/?signs=276
  test('Single sign with conditional tag', () => {
    const signs = signsStateByDescriptiveName(['Überholverbot für Kraftfahrzeuge aller Art'])
    expect(collectConditionalTags(signs)).toMatchObject([{ key: 'overtaking', value: 'no' }])
  })

  // https://osmtools.de/traffic_signs/?signs=276,1040-30%5B16:00-18:00%5D
  test('Sign group with conditional sign with prompt', () => {
    const signs = signsStateByDescriptiveName([
      'Überholverbot für Kraftfahrzeuge aller Art',
      'Zeitliche Beschräkung',
    ])
    expect(collectConditionalTags(signs)).toMatchObject([
      {
        key: 'overtaking:conditional',
        value: 'no @ 16-18',
      },
    ])
  })

  test('Sign group with conditional sign with static value', () => {
    const signs = signsStateByDescriptiveName([
      'Überholverbot für Kraftfahrzeuge aller Art',
      'Zeitliche Beschräkung: werktags',
    ])
    expect(collectConditionalTags(signs)).toMatchObject([
      {
        key: 'overtaking:conditional',
        value: 'no @ Mo-Sa;PH off',
      },
    ])
  })

  test('Use the updated custom value', () => {
    const signs = signsStateByDescriptiveName(['Zulässige Höchstgeschwindigkeit'])
    const sign = signs[0]!
    const customValue = 999
    const updated = [
      {
        ...sign,
        osmValuePart: combineSignIdSignValue(sign.signId, customValue),
        signValue: customValue,
      } as SignStateType,
    ]
    expect(collectConditionalTags(updated)).toMatchObject([
      {
        key: 'maxspeed',
        value: String(customValue),
      },
    ])
  })

  test('Handle valueTemplate (One Sign)', () => {
    const signs = signsStateByDescriptiveName(['Tempo 30-Zone'])
    expect(collectConditionalTags(signs)).toMatchObject([
      {
        key: 'maxspeed',
        value: '30',
      },
    ])
    expect(collectUniqueTags(signs)).toMatchObject([
      {
        key: 'source:maxspeed',
        value: 'DE:zone',
      },
      {
        key: 'zone:maxspeed',
        value: 'DE:30',
      },
    ])
  })

  test('Handle valueTemplate (with modifier sign)', () => {
    const signs = signsStateByDescriptiveName(['Tempo 30-Zone', 'Zeitliche Beschräkung'])
    expect(collectConditionalTags(signs)).toMatchObject([
      {
        key: 'maxspeed:conditional',
        value: '30 @ 16-18',
      },
    ])
    expect(collectUniqueTags(signs)).toMatchObject([
      {
        key: 'source:maxspeed',
        value: 'DE:zone',
      },
      {
        key: 'zone:maxspeed',
        value: 'DE:30',
      },
    ])
  })

  describe('Check that access and conditional tags do not mix', () => {
    test('set access when no conditionalValues given', () => {
      const signs = signsStateByDescriptiveName([
        'Verbot für Fahrzeuge aller Art',
        'Radfahrer und Anlieger frei',
      ])
      expect(collectAccessTags(signs)).toMatchObject([
        {
          key: 'vehicle',
          value: 'destination',
        },
      ])
      expect(collectConditionalTags(signs)).toMatchObject([])
    })
  })

  describe('Handle different modifer signs', () => {
    test('handle `exception_modifier`', () => {
      const signs = signsStateByDescriptiveName([
        'Verbot für Fahrzeuge aller Art',
        'Radfahrer und Anlieger frei',
      ])
      expect(collectAccessTags(signs)).toMatchObject([
        {
          key: 'vehicle',
          value: 'destination',
        },
      ])
      expect(collectConditionalTags(signs)).toMatchObject([])
    })

    test('handle `condition_modifier`', () => {
      const signs = signsStateByDescriptiveName([
        'Verbot für Fahrzeuge über angegebenem tatsächlichen Gewicht',
        'Anlieger frei',
      ])
      expect(collectAccessTags(signs)).toMatchObject([])
      expect(collectConditionalTags(signs)).toMatchObject([
        { key: 'maxweight', value: '5.5' },
        { key: 'maxweight:conditional', value: 'none @ (destination)' },
      ])
    })
  })
})

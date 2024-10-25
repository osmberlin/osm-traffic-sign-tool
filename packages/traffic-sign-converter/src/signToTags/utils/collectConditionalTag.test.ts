import { describe, expect, test } from 'vitest'
import type { SignStateType } from '../../data/TrafficSignDataTypes.js'
import { signsStateByDescriptiveName } from '../../data/utils/signsByDescriptiveName.js'
import { combineSignIdSignValue } from '../../signIdSignValueUtils/combineSignIdSignValue.js'
import { collectConditionalTag } from './collectConditionalTag.js'

describe('collectConditionalTag()', () => {
  // https://osmtools.de/traffic_signs/?signs=276
  test('Single sign with conditional tag', () => {
    const signs = signsStateByDescriptiveName(['Überholverbot für Kraftfahrzeuge aller Art'])
    expect(collectConditionalTag(signs)).toMatchObject({ key: 'overtaking', value: 'no' })
  })

  // https://osmtools.de/traffic_signs/?signs=276,1040-30%5B16:00-18:00%5D
  test('Sign group with conditional sign with prompt', () => {
    const signs = signsStateByDescriptiveName([
      'Überholverbot für Kraftfahrzeuge aller Art',
      'Zeitliche Beschräkung',
    ])
    expect(collectConditionalTag(signs)).toMatchObject({
      key: 'overtaking:conditional',
      value: 'no @ 16-18',
    })
  })

  test('Sign group with conditional sign with static value', () => {
    const signs = signsStateByDescriptiveName([
      'Überholverbot für Kraftfahrzeuge aller Art',
      'Zeitliche Beschräkung: werktags',
    ])
    expect(collectConditionalTag(signs)).toMatchObject({
      key: 'overtaking:conditional',
      value: 'no @ Mo-Sa;PH off',
    })
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
    expect(collectConditionalTag(updated)).toMatchObject({
      key: 'maxspeed',
      value: String(customValue),
    })
  })
})

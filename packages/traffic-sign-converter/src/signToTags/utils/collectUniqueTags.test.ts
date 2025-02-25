import { describe, expect, test } from 'vitest'
import { countryDefinitions } from '../../data-definitions/countryDefinitions.js'
import type { SignStateType } from '../../data-definitions/TrafficSignDataTypes.js'
import { combineSignIdSignValue } from '../../utils/combineSignIdSignValue.js'
import { signsStateByDescriptiveName } from '../../utils/signsByDescriptiveName.js'
import { collectUniqueTags } from './collectUniqueTags.js'

describe('collectUniqueTags()', () => {
  const data = countryDefinitions.DE

  test('unique tag with value', () => {
    const signs = signsStateByDescriptiveName('DE', data, [
      'Überholverbot für Kraftfahrzeuge über 3,5 t',
    ])
    expect(collectUniqueTags(signs)).toMatchObject([{ key: 'overtaking:hgv', value: 'no' }])
  })

  test('unique tag with valueTemplate', () => {
    const signs = signsStateByDescriptiveName('DE', data, ['Tempo ??-Zone'])
    expect(collectUniqueTags(signs)).toMatchObject([
      { key: 'source:maxspeed', value: 'DE:zone47' },
      { key: 'zone:maxspeed', value: 'DE:47' },
    ])
  })

  test('unique tag with valueTemplate', () => {
    const signs = signsStateByDescriptiveName('DE', data, ['Tempo ??-Zone'])
    const sign = signs[0]!
    const customValue = 999
    const updated = [
      {
        ...sign,
        osmValuePart: combineSignIdSignValue(sign.signId, customValue),
        signValue: customValue,
      } as SignStateType,
    ]
    expect(collectUniqueTags(updated)).toMatchObject([
      { key: 'source:maxspeed', value: 'DE:zone999' },
      { key: 'zone:maxspeed', value: 'DE:999' },
    ])
  })
})

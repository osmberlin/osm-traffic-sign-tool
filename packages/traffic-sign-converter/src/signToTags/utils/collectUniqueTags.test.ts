import { describe, expect, test } from 'vitest'
import { countryDefinitions } from '../../data-definitions/countryDefinitions.js'
import type { SignStateType } from '../../data-definitions/TrafficSignDataTypes.js'
import { combineSignIdSignValue } from '../../utils/combineSignIdSignValue.js'
import { signsStateByDescriptiveName } from '../../utils/signsByDescriptiveName.js'
import { collectUniqueTags } from './collectUniqueTags.js'

describe('collectUniqueTags()', () => {
  const data = countryDefinitions.DE

  test('uniqute tag with value', () => {
    const signs = signsStateByDescriptiveName(data, ['Überholverbot für Kraftfahrzeuge über 3,5 t'])
    expect(collectUniqueTags(signs)).toMatchObject([{ key: 'overtaking:hgv', value: 'no' }])
  })

  test('uniqute tag with valueTemplate', () => {
    const signs = signsStateByDescriptiveName(data, ['Tempo 30-Zone'])
    expect(collectUniqueTags(signs)).toMatchObject([
      { key: 'source:maxspeed', value: 'DE:zone' },
      { key: 'zone:maxspeed', value: 'DE:30' },
    ])
  })

  test('uniqute tag with valueTemplate', () => {
    const signs = signsStateByDescriptiveName(data, ['Tempo 30-Zone'])
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
      { key: 'source:maxspeed', value: 'DE:zone' },
      { key: 'zone:maxspeed', value: 'DE:999' },
    ])
  })
})

import { describe, expect, test } from 'vitest'
import { countryDefinitions } from '../data-definitions/countryDefinitions.js'
import { signsStateByDescriptiveName } from '../utils/signsByDescriptiveName.js'
import { signsToComments } from './signsToComments.js'

describe('signsToComments()', () => {
  const data = countryDefinitions.DE

  test('Two groups, Empty is ignored', () => {
    const signs = signsStateByDescriptiveName('DE', data, [
      'Gehweg',
      'Radfahrer frei',
      'Personenkraftwagen frei',
    ])
    const result = signsToComments(signs, 'way')
    expect(result.size).toBe(0)
    expect(result.has('239')).toBeFalsy()
    expect(result.has('1022-10')).toBeFalsy()
    expect(result.has('1024-10')).toBeFalsy()
  })
})

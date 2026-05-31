import { describe, expect, test } from 'vitest'
import { countryDefinitions } from '../data-definitions/countryDefinitions.js'
import { signsStateByDescriptiveName } from '../utils/signsByDescriptiveName.js'
import { signsToOptionalTags } from './signsToOptionalTags.js'

describe('signsToOptionalTags()', () => {
  const data = countryDefinitions.DE

  test('returns optional colour tag for cycleway signs', () => {
    const signs = signsStateByDescriptiveName('DE', data, ['Radweg'])
    const result = signsToOptionalTags(signs, 'DE', 'way')
    expect(result.get('colour')).toBe('white')
  })
})

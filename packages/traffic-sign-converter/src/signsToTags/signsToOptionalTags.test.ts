import { describe, expect, test } from 'vitest'
import { countryDefinitions } from '../data-definitions/countryDefinitions.js'
import { signsStateByDescriptiveName } from '../utils/signsByDescriptiveName.js'
import { signsToOptionalTags } from './signsToOptionalTags.js'

describe('signsToOptionalTags()', () => {
  const data = countryDefinitions.DE

  test('returns optional bus lane tags for bus lane signs', () => {
    const signs = signsStateByDescriptiveName('DE', data, ['Bussonderfahrstreifen'])
    const result = signsToOptionalTags(signs, 'DE', 'way')
    expect(result.get('lanes:bus')).toBe('*')
  })
})

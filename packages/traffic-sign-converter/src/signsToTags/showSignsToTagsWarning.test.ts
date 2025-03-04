import { describe, expect, test } from 'vitest'
import { countryDefinitions } from '../data-definitions/countryDefinitions.js'
import { signsStateByDescriptiveName } from '../utils/signsByDescriptiveName.js'
import { showSignsToTagsWarning } from './showSignsToTagsWarning.js'

describe('showSignsToTagsWarning()', () => {
  const data = countryDefinitions.DE

  test('All groups have one or less modifier signs => no warning', () => {
    const signs = signsStateByDescriptiveName('DE', data, [
      'Verkehrsberuhigter Bereich',
      'Gehweg',
      'Radfahrer frei',
    ])
    const result = showSignsToTagsWarning(signs)
    expect(result).toBe(false)
  })

  test('Any group with more than two modifier signs => show warning', () => {
    const signs = signsStateByDescriptiveName('DE', data, [
      'Verkehrsberuhigter Bereich',
      'Gehweg',
      'Radfahrer frei',
      'Personenkraftwagen frei',
    ])
    const result = showSignsToTagsWarning(signs)
    expect(result).toBe(true)
  })
})

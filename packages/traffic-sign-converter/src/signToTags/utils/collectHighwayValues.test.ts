import { expect, test } from 'vitest'
import { countryDefinitions } from '../../data-definitions/countryDefinitions.js'
import { signsStateByDescriptiveName } from '../../utils/signsByDescriptiveName.js'
import { collectHighwayValues } from './collectHighwayValues.js'

test('collectHighwayValues', () => {
  const data = countryDefinitions.DE

  const signs = signsStateByDescriptiveName('DE', data, ['Fahrradstraße', 'Anlieger frei'])
  expect(collectHighwayValues(signs)).toMatchObject(['cycleway', 'residential', 'service'])
})

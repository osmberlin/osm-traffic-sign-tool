import { expect, test } from 'vitest'
import { signsStateByDescriptiveName } from '../../data/utils/signsByDescriptiveName.js'
import { collectHighwayValues } from './collectHighwayValues.js'

test('collectHighwayValues', () => {
  const signs = signsStateByDescriptiveName(['Fahrradstraße', 'Anlieger frei'])
  expect(collectHighwayValues(signs)).toMatchObject(['cycleway', 'residential', 'service'])
})

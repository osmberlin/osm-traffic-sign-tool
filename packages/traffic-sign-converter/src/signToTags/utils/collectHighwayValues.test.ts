import { expect, test } from 'vitest'
import { signsStateByDescriptiveName } from '../../data/utils/signsByDescriptiveName.js'
import { collectHighwayValues } from './collectHighwayValues.js'

test('collectHighwayValues', () => {
  const signs = signsStateByDescriptiveName(['Gehweg', 'Radfahrer frei'])
  expect(collectHighwayValues(signs)).toMatchObject(['footway', 'path'])
})

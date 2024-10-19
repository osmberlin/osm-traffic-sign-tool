import { expect, test } from 'vitest'
import { signsByDescriptiveName } from '../../data/utils/signsByDescriptiveName.js'
import { collectHighwayValues } from './collectHighwayValues.js'

test('collectHighwayValues', () => {
  const signs = signsByDescriptiveName(['Gehweg', 'Radfahrer frei'])
  expect(collectHighwayValues(signs)).toMatchObject(['footway', 'path'])
})

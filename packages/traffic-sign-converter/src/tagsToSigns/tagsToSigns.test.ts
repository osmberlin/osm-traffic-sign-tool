import { expect, test } from 'vitest'
import { tagsToSigns } from './tagsToSigns.js'

test('osmToTrafficSign', () => {
  const result = tagsToSigns('DE', ['highway=footway', 'foot=designated'])
  expect(result[0]?.osmValuePart).toBe('239')
})

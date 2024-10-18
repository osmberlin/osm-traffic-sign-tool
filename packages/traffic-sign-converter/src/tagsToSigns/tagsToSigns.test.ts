import { expect, test } from 'vitest'
import { tagsToSigns } from './tagsToSigns.js'

test('osmToTrafficSign', () => {
  expect(tagsToSigns(['highway=footway', 'foot=designated'])).toMatchObject(['239'])
})

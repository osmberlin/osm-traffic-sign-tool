import { expect, test } from 'vitest'
import { osmToTrafficSign } from './osmToTrafficSign.js'

test('osmToTrafficSign', () => {
  expect(osmToTrafficSign(['highway=footway', 'foot=designated'])).toMatchObject(['DE:239'])
})

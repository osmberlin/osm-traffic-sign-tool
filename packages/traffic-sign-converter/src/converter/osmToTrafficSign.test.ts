import { expect, test } from 'vitest'
import { osmToTrafficSign } from './osmToTrafficSign.js'

test('osmToTrafficSign', () => {
  expect(osmToTrafficSign(['IGNORE'])).toBe('DEMO')
})

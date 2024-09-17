import { expect, test } from 'vitest'
import { osmToTrafficSign } from './osmToTrafficSign.js'

test('osmToTrafficSign', () => {
  expect(osmToTrafficSign(['DE:123,DEMO'])).toBe('DEMO')
})

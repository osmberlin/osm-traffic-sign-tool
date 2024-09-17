import { expect, test } from 'vitest'
import { trafficSignToOsm } from './trafficSignToOsm.js'

test('trafficSignToOsm', () => {
  const output = trafficSignToOsm('DE:239')
  expect(output?.key).toBe('DE:239')
})

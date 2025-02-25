import { describe, expect, test } from 'vitest'
import { getSignBySignIdAndCheckValue } from './getSignBySignIdAndCheckValue.js'
import { getSignsMap } from './getSignsMap.js'

describe('getSignBySignIdAndCheckValue()', () => {
  const signsMap = getSignsMap('DE')

  test('Pick the one of one', () => {
    const sign = getSignBySignIdAndCheckValue(signsMap, '237', undefined)
    expect(sign?.osmValuePart).toMatch('237')
  })

  test('Pick the non value sign of two', () => {
    const sign = getSignBySignIdAndCheckValue(signsMap, '274.1', undefined)
    expect(sign?.osmValuePart).toMatch('274.1')
  })

  test('Pick the "with value" sign of two', () => {
    const sign = getSignBySignIdAndCheckValue(signsMap, '274.1', 44)
    expect(sign?.osmValuePart).toMatch('274.1[47]')
  })
})

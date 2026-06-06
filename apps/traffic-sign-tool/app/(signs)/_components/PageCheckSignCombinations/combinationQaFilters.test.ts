import { describe, expect, test } from 'vitest'
import { getCombinationConfirmationDate } from './combinationQaFilters'

describe('combinationQaFilters', () => {
  test('getCombinationConfirmationDate reads confirmedModifiers on primary sign', () => {
    const primarySign = {
      compatibility: {
        confirmedModifiers: {
          '1010-12': '2026-06-06',
        },
      },
    }

    expect(getCombinationConfirmationDate(primarySign, '1010-12')).toBe('2026-06-06')
    expect(getCombinationConfirmationDate(primarySign, '1020-12')).toBeUndefined()
    expect(getCombinationConfirmationDate(primarySign, undefined)).toBeUndefined()
    expect(getCombinationConfirmationDate(undefined, '1010-12')).toBeUndefined()
  })
})

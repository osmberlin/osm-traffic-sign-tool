import { describe, expect, test } from 'vitest'
import { signsStateByDescriptiveName } from '../data/utils/signsByDescriptiveName.js'
import { signToComments } from './signToComments.js'

describe('signToComments()', () => {
  test('Two groups, Empty is ignored', () => {
    const signs = signsStateByDescriptiveName([
      'Gehweg',
      'Radfahrer frei',
      'Personenkraftwagen frei',
    ])
    const result = signToComments(signs)
    expect(result.size).toBe(2)
    expect(result.has('239')).toBeTruthy()
    expect(result.has('1022-10')).toBeFalsy()
    expect(result.has('1024-10')).toBeTruthy()
  })
})

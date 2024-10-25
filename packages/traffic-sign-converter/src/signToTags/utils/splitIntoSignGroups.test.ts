import { describe, expect, test } from 'vitest'
import { signsStateByDescriptiveName } from '../../data/utils/signsByDescriptiveName.js'
import { splitIntoSignGroups } from './splitIntoSignGroups.js'

describe('splitIntoSignGroups()', () => {
  test('sign + modifier sign', () => {
    const signs = signsStateByDescriptiveName(['Gehweg', 'Radfahrer frei'])
    const result = splitIntoSignGroups(signs)
    const groupLength = result.length
    expect(groupLength).toBe(1)
    const firstGroup = result[0]
    const firstGroupLength = firstGroup?.length
    expect(firstGroupLength).toBe(2)
    const firstGroupFirstSign = firstGroup?.[0]
    expect(firstGroupFirstSign?.descriptiveName).toBe('Gehweg')
    const firstGroupSecondSign = firstGroup?.[1]
    expect(firstGroupSecondSign?.descriptiveName).toBe('Radfahrer frei')
  })

  test('sign + modifier sign + sign + modifier sign + modifier sign', () => {
    const signs = signsStateByDescriptiveName([
      'Gehweg',
      'Radfahrer frei',
      'Radweg',
      'Anlieger frei',
      'Mofas frei',
    ])
    const result = splitIntoSignGroups(signs)
    const groupLength = result.length
    expect(groupLength).toBe(2)
    // Fist
    const firstGroup = result[0]
    const firstGroupLength = firstGroup?.length
    expect(firstGroupLength).toBe(2)
    const firstGroupFirstSign = firstGroup?.[0]
    expect(firstGroupFirstSign?.descriptiveName).toBe('Gehweg')
    const firstGroupsecondSign = firstGroup?.[1]
    expect(firstGroupsecondSign?.descriptiveName).toBe('Radfahrer frei')
    // Second
    const secondGroup = result[1]
    const secondGroupLength = secondGroup?.length
    expect(secondGroupLength).toBe(3)
    const secondGroupFirstSign = secondGroup?.[0]
    expect(secondGroupFirstSign?.descriptiveName).toBe('Radweg')
    const secondGroupThirdSign = secondGroup?.[2]
    expect(secondGroupThirdSign?.descriptiveName).toBe('Mofas frei')
  })
})

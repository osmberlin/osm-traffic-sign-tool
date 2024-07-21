import { describe, expect, test } from 'vitest'
import { removeDuplicates } from './removeDuplicates'

describe('removeDuplicates()', () => {
  test('does nothing when not needed', () => {
    const input = ['foo', 'bar']
    const result = removeDuplicates(input)
    expect(result).toMatchObject(input)
  })

  test('removes duplicates', () => {
    const input = ['foo', 'foo']
    const result = removeDuplicates(input)
    expect(result).toMatchObject(['foo'])
  })

  test('removes duplicate just by key; ignores "value"; first item "wins"', () => {
    const input = [
      ['foo', ['a', 'b']],
      ['foo', 'c'],
    ]
    const result = removeDuplicates(input)
    expect(result).toMatchObject([['foo', ['a', 'b']]])
  })
})

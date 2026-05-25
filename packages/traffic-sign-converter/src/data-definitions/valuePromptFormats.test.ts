import { describe, expect, test } from 'vitest'
import {
  getValuePromptInputAttributes,
  valuePromptFormats,
  valuePromptInputFormats,
} from './valuePromptFormats.js'

describe('valuePromptFormats', () => {
  test('valuePromptInputFormats covers every format', () => {
    for (const format of valuePromptFormats) {
      expect(valuePromptInputFormats[format]).toBeDefined()
      expect(getValuePromptInputAttributes(format)).toEqual(valuePromptInputFormats[format])
    }
  })
})

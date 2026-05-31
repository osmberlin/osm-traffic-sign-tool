import { describe, expect, test } from 'vitest'
import { sidepathQuestion } from './questionCatalog.js'
import {
  classifySignQuestionsQa,
  countSignsByQuestionsQa,
  filterSignsByQuestionsQa,
  signHasQuestions,
} from './questionsQa.js'
import type { SignType } from './TrafficSignDataTypes.js'

const baseSign = {
  osmValuePart: 'test',
  signId: 'test',
  name: 'Test',
  descriptiveName: 'Test',
  description: null,
  catalogue: { signCategory: 'traffic_sign' as const },
  image: {
    kind: 'remote' as const,
    sourceUrl: 'https://example.com',
    licence: 'Public Domain' as const,
  },
  kind: 'traffic_sign' as const,
  tagRecommendationsByGeometry: [{ geometries: ['way'] }],
} satisfies SignType

describe('questionsQa', () => {
  test('signHasQuestions and classifySignQuestionsQa', () => {
    const withQuestions: SignType = {
      ...baseSign,
      questions: [sidepathQuestion()],
    }
    const withoutQuestions: SignType = { ...baseSign }

    expect(signHasQuestions(withQuestions)).toBe(true)
    expect(signHasQuestions(withoutQuestions)).toBe(false)
    expect(classifySignQuestionsQa(withQuestions)).toBe('withQuestions')
    expect(classifySignQuestionsQa(withoutQuestions)).toBe('withoutQuestions')
  })

  test('filter and count', () => {
    const signs: SignType[] = [
      { ...baseSign, osmValuePart: 'a', questions: [sidepathQuestion()] },
      { ...baseSign, osmValuePart: 'b' },
      { ...baseSign, osmValuePart: 'c', questions: [sidepathQuestion()] },
    ]

    expect(filterSignsByQuestionsQa(signs, 'with').map((s) => s.osmValuePart)).toEqual(['a', 'c'])
    expect(filterSignsByQuestionsQa(signs, 'without').map((s) => s.osmValuePart)).toEqual(['b'])
    expect(countSignsByQuestionsQa(signs)).toEqual({
      all: 3,
      with: 2,
      without: 1,
    })
  })
})

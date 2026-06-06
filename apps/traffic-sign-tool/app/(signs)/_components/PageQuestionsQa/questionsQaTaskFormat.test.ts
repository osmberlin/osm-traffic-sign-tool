import { sidepathQuestion } from '@osm-traffic-signs/converter'
import type { SignType } from '@osm-traffic-signs/converter'
import { beforeAll, describe, expect, test } from 'vitest'
import {
  buildGithubIssueUrl,
  collectQuestionTaskEntries,
  formatQuestionsQaTaskResults,
} from './questionsQaTaskFormat'

beforeAll(() => {
  Object.defineProperty(globalThis, 'localStorage', {
    value: {
      getItem: () => null,
      setItem: () => undefined,
      removeItem: () => undefined,
      clear: () => undefined,
    },
    writable: true,
  })
})

const baseSign = {
  osmValuePart: '237',
  signId: '237',
  name: 'Zeichen 237',
  descriptiveName: 'Radweg',
  description: null,
  kind: 'traffic_sign' as const,
  tagRecommendationsByGeometry: [{ geometries: ['way'] }],
  catalogue: { signCategory: 'traffic_sign' as const },
  image: {
    kind: 'remote' as const,
    sourceUrl: 'https://example.com',
    licence: 'Public Domain' as const,
  },
  questions: [sidepathQuestion()],
} satisfies SignType

describe('questionsQaTaskFormat', () => {
  test('collectQuestionTaskEntries and format', () => {
    const tasks = new Map([
      ['237', { suggestionNotes: 'Add default for surface colour' }],
      ['999', { suggestionNotes: '' }],
    ])

    const signs: SignType[] = [
      baseSign,
      { ...baseSign, osmValuePart: '999', signId: '999', questions: undefined },
    ]

    const entries = collectQuestionTaskEntries(signs, tasks)
    expect(entries).toHaveLength(1)
    expect(entries[0]?.osmValuePart).toBe('237')

    const text = formatQuestionsQaTaskResults(entries)
    expect(text).toContain('**You**')
    expect(text).toContain('German traffic signs')
    expect(text).toContain('Sign questions QA')
    expect(text).toContain('.cursor/skills/update-sign-questions/SKILL.md')
    expect(text).toContain('"questionId": "sidepath"')
    expect(text).not.toContain('Questions & answers')
    expect(text).toContain('Add default for surface colour')
    expect(text).toContain('```json')
  })

  test('buildGithubIssueUrl', () => {
    const entries = [
      {
        osmValuePart: '237',
        signId: '237',
        descriptiveName: 'Radweg',
        questions: [sidepathQuestion()],
        suggestionNotes: 'Test',
      },
    ]
    const url = buildGithubIssueUrl(entries)
    expect(url).toContain('github.com/osmberlin/osm-traffic-sign-tool/issues/new')
    expect(url).toContain('template=question-qa-catalogue-update.md')

    const customBody = 'Custom issue body'
    const customUrl = buildGithubIssueUrl(entries, 'DE', customBody)
    expect(new URL(customUrl).searchParams.get('body')).toBe(customBody)
  })
})

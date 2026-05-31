import { describe, expect, test } from 'vitest'
import { countryDefinitions } from '../data-definitions/countryDefinitions.js'
import {
  pathInfrastructureQuestions,
  surfaceColorQuestion,
} from '../data-definitions/questionCatalog.js'
import { transformToSignState } from '../utils/transformToSignState.js'
import {
  collectSignQuestionGroups,
  dedupeEquivalentAnswersForUrl,
  getQuestionEquivalenceKey,
  syncEquivalentQuestionAnswers,
} from './groupSignQuestions.js'

describe('groupSignQuestions', () => {
  const data = countryDefinitions.DE

  const signsByOsmValuePart = (parts: string[]) =>
    parts.map((part) => {
      const sign = data.find((entry) => entry.osmValuePart === part)
      if (!sign) {
        throw new Error(`Missing sign ${part}`)
      }

      return transformToSignState('DE', sign)
    })

  test('groups identical highwayClass questions across 241 variants', () => {
    const signs = signsByOsmValuePart(['241-30', '241-31'])
    const groups = collectSignQuestionGroups(signs)
    const highwayGroup = groups.find((group) => group.question.questionId === 'highwayClass')

    expect(highwayGroup?.signOsmValueParts).toEqual(['241-30', '241-31'])
  })

  test('does not group surfaceColor when tag keys differ', () => {
    const pathQuestion = pathInfrastructureQuestions().find((q) => q.questionId === 'surfaceColor')!
    const cycleQuestion = surfaceColorQuestion()

    expect(getQuestionEquivalenceKey(pathQuestion)).not.toBe(
      getQuestionEquivalenceKey(cycleQuestion),
    )
  })

  test('syncEquivalentQuestionAnswers copies one answer to all signs in a group', () => {
    const signs = signsByOsmValuePart(['241-30', '241-31'])

    const synced = syncEquivalentQuestionAnswers({ '241-30': { highwayClass: 'cycleway' } }, signs)

    expect(synced['241-30']?.highwayClass).toBe('cycleway')
    expect(synced['241-31']?.highwayClass).toBe('cycleway')
  })

  test('dedupeEquivalentAnswersForUrl keeps a single sign entry', () => {
    const signs = signsByOsmValuePart(['241-30', '241-31'])

    const deduped = dedupeEquivalentAnswersForUrl(
      {
        '241-30': { highwayClass: 'path' },
        '241-31': { highwayClass: 'path' },
      },
      signs,
    )

    const entries = ['241-30', '241-31'].filter(
      (signKey) => deduped[signKey]?.highwayClass === 'path',
    )
    expect(entries).toEqual(['241-30'])
  })
})

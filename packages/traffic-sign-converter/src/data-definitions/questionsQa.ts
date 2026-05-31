import type { SignType } from './TrafficSignDataTypes.js'

export type SignQuestionsQaCategory = 'withQuestions' | 'withoutQuestions'

export const questionsQaFilters = ['all', 'with', 'without'] as const
export type QuestionsQaFilter = (typeof questionsQaFilters)[number]

export const signHasQuestions = (sign: SignType): boolean => Boolean(sign.questions?.length)

export const classifySignQuestionsQa = (sign: SignType): SignQuestionsQaCategory =>
  signHasQuestions(sign) ? 'withQuestions' : 'withoutQuestions'

export const matchesQuestionsQaFilter = (sign: SignType, filter: QuestionsQaFilter): boolean => {
  if (filter === 'all') {
    return true
  }

  const category = classifySignQuestionsQa(sign)

  switch (filter) {
    case 'with':
      return category === 'withQuestions'
    case 'without':
      return category === 'withoutQuestions'
    default:
      return true
  }
}

export const filterSignsByQuestionsQa = (
  signs: SignType[],
  filter: QuestionsQaFilter,
): SignType[] => signs.filter((sign) => matchesQuestionsQaFilter(sign, filter))

export type QuestionsQaCounts = Record<QuestionsQaFilter, number>

export const countSignsByQuestionsQa = (signs: SignType[]): QuestionsQaCounts => {
  const counts: QuestionsQaCounts = {
    all: signs.length,
    with: 0,
    without: 0,
  }

  for (const sign of signs) {
    if (signHasQuestions(sign)) {
      counts.with++
    } else {
      counts.without++
    }
  }

  return counts
}

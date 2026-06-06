import type {
  CountryPrefixType,
  QuestionAnswersBySign,
  SignQuestion,
  SignStateType,
} from '@osm-traffic-signs/converter'
import { syncEquivalentQuestionAnswers } from '@osm-traffic-signs/converter'
import { parseAnswersParam } from './answersParam'

const STORAGE_VERSION = 1

export const answersStorageKey = (countryPrefix: CountryPrefixType) =>
  `tst:${countryPrefix}:answers`

type StoredAnswers = {
  version: number
  answers: QuestionAnswersBySign
}

const isStoredAnswers = (value: unknown): value is StoredAnswers =>
  typeof value === 'object' &&
  value !== null &&
  'version' in value &&
  'answers' in value &&
  typeof (value as StoredAnswers).answers === 'object'

export const readAnswersCache = (countryPrefix: CountryPrefixType): QuestionAnswersBySign => {
  if (typeof localStorage === 'undefined') {
    return {}
  }

  try {
    const raw = localStorage.getItem(answersStorageKey(countryPrefix))
    if (!raw) {
      return {}
    }

    const parsed: unknown = JSON.parse(raw)
    if (!isStoredAnswers(parsed) || parsed.version !== STORAGE_VERSION) {
      return {}
    }

    return parsed.answers
  } catch {
    return {}
  }
}

export const writeAnswersCache = (
  countryPrefix: CountryPrefixType,
  answers: QuestionAnswersBySign,
) => {
  if (typeof localStorage === 'undefined') {
    return
  }

  const payload: StoredAnswers = {
    version: STORAGE_VERSION,
    answers,
  }

  localStorage.setItem(answersStorageKey(countryPrefix), JSON.stringify(payload))
}

const signHasQuestion = (sign: SignStateType, questionId: string): boolean =>
  sign.recodgnizedSign &&
  'questions' in sign &&
  Boolean(sign.questions?.some((question: SignQuestion) => question.questionId === questionId))

export const pruneAnswersForSigns = (
  answers: QuestionAnswersBySign,
  signs: SignStateType[],
): QuestionAnswersBySign => {
  const pruned: QuestionAnswersBySign = {}

  for (const sign of signs) {
    const signAnswers = answers[sign.osmValuePart]
    if (!signAnswers) {
      continue
    }

    const nextSignAnswers: Record<string, string> = {}
    for (const [questionId, answerId] of Object.entries(signAnswers)) {
      if (typeof answerId === 'string' && signHasQuestion(sign, questionId)) {
        nextSignAnswers[questionId] = answerId
      }
    }

    if (Object.keys(nextSignAnswers).length > 0) {
      pruned[sign.osmValuePart] = nextSignAnswers
    }
  }

  return pruned
}

export const mergeAnswersFromCache = (
  urlAnswers: QuestionAnswersBySign,
  signs: SignStateType[],
  cache: QuestionAnswersBySign,
): QuestionAnswersBySign => {
  const merged = pruneAnswersForSigns({ ...cache, ...urlAnswers }, signs)

  for (const sign of signs) {
    if (!sign.recodgnizedSign || !sign.questions?.length) {
      continue
    }

    merged[sign.osmValuePart] ??= {}

    for (const question of sign.questions) {
      const signAnswers = merged[sign.osmValuePart]
      if (
        signAnswers[question.questionId] === undefined &&
        cache[sign.osmValuePart]?.[question.questionId]
      ) {
        signAnswers[question.questionId] = cache[sign.osmValuePart][question.questionId]
      }
    }
  }

  return pruneAnswersForSigns(syncEquivalentQuestionAnswers(merged, signs), signs)
}

/** URL answers merged with country-scoped localStorage cache for the active sign selection. */
export const resolveMergedAnswers = (
  countryPrefix: CountryPrefixType,
  signs: SignStateType[],
  rawAnswers: string | QuestionAnswersBySign | undefined,
): QuestionAnswersBySign => {
  const urlAnswers = parseAnswersParam(rawAnswers)
  return mergeAnswersFromCache(urlAnswers, signs, readAnswersCache(countryPrefix))
}

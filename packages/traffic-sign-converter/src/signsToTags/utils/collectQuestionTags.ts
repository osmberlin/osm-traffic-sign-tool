import type { GeometryType } from '../../data-definitions/geometryTypes.js'
import type {
  QuestionAnswer,
  QuestionAnswersBySign,
  SignQuestion,
  SignStateType,
  SignType,
} from '../../data-definitions/TrafficSignDataTypes.js'
import { QUESTION_NIL_ANSWER_ID } from '../../data-definitions/TrafficSignDataTypes.js'
import { resolveQuestionAnswer } from '../../questions/resolveQuestionAnswer.js'

const DEFAULT_QUESTION_GEOMETRIES: GeometryType[] = ['way', 'way_centerline', 'area']

const geometriesFromSignRecommendations = (sign: SignType): GeometryType[] => {
  if (sign.tagRecommendationsByGeometry === 'none') {
    return []
  }

  return [
    ...new Set(
      sign.tagRecommendationsByGeometry.flatMap((recommendation) => recommendation.geometries),
    ),
  ].filter((geometry) => geometry !== 'node' && geometry !== 'relation')
}

/** Resolve which geometries a question answer may emit tags for. */
export const getQuestionAnswerGeometries = (
  sign: SignType,
  question: SignQuestion,
  answer: QuestionAnswer,
): GeometryType[] => {
  if (answer.geometries?.length) {
    return answer.geometries
  }

  if (question.geometries?.length) {
    return question.geometries
  }

  const fromRecommendations = geometriesFromSignRecommendations(sign)
  if (fromRecommendations.length > 0) {
    return fromRecommendations
  }

  return DEFAULT_QUESTION_GEOMETRIES
}

export const questionAnswerAppliesToGeometry = (
  sign: SignStateType,
  question: SignQuestion,
  answer: QuestionAnswer,
  geometry: GeometryType,
): boolean => {
  if (!sign.recodgnizedSign) {
    return false
  }

  return getQuestionAnswerGeometries(sign, question, answer).includes(geometry)
}

export const collectQuestionTags = (
  signs: SignStateType[],
  geometry: GeometryType,
  answers: QuestionAnswersBySign | undefined,
) => {
  const merged: Map<string, { key: string; value: string }> = new Map()

  for (const sign of signs) {
    if (!sign.recodgnizedSign || !('questions' in sign) || !sign.questions?.length) {
      continue
    }

    for (const question of sign.questions) {
      const { effectiveAnswerId, answer } = resolveQuestionAnswer(
        question,
        answers,
        sign.osmValuePart,
      )

      if (
        effectiveAnswerId === QUESTION_NIL_ANSWER_ID ||
        !answer?.tags?.length ||
        !questionAnswerAppliesToGeometry(sign, question, answer, geometry)
      ) {
        continue
      }

      for (const tag of answer.tags) {
        merged.set(tag.key, tag)
      }
    }
  }

  return Array.from(merged.values())
}

const tagMatchesRemoval = (
  current: string | string[] | undefined,
  removal: { key: string; value: string },
): boolean => {
  if (current === undefined) {
    return false
  }

  if (Array.isArray(current)) {
    return current.includes(removal.value)
  }

  return current === removal.value
}

export const collectQuestionTagRemovals = (
  signs: SignStateType[],
  geometry: GeometryType,
  answers: QuestionAnswersBySign | undefined,
): { key: string; value: string }[] => {
  const merged: Map<string, { key: string; value: string }> = new Map()

  for (const sign of signs) {
    if (!sign.recodgnizedSign || !('questions' in sign) || !sign.questions?.length) {
      continue
    }

    for (const question of sign.questions) {
      const { effectiveAnswerId, answer } = resolveQuestionAnswer(
        question,
        answers,
        sign.osmValuePart,
      )

      if (
        effectiveAnswerId === QUESTION_NIL_ANSWER_ID ||
        !answer?.removeTags?.length ||
        !questionAnswerAppliesToGeometry(sign, question, answer, geometry)
      ) {
        continue
      }

      for (const tag of answer.removeTags) {
        merged.set(tag.key, tag)
      }
    }
  }

  return Array.from(merged.values())
}

export const applyQuestionTagRemovals = (
  tagMap: Map<string, string | string[]>,
  removals: { key: string; value: string }[],
) => {
  for (const removal of removals) {
    if (tagMatchesRemoval(tagMap.get(removal.key), removal)) {
      tagMap.delete(removal.key)
    }
  }
}

export const collectQuestionHighwayValues = (
  signs: SignStateType[],
  geometry: GeometryType,
  answers: QuestionAnswersBySign | undefined,
): string[] => {
  const values: string[] = []

  for (const sign of signs) {
    if (!sign.recodgnizedSign || !('questions' in sign) || !sign.questions?.length) {
      continue
    }

    for (const question of sign.questions) {
      if (!question.affectsHighway) {
        continue
      }

      const { effectiveAnswerId, answer } = resolveQuestionAnswer(
        question,
        answers,
        sign.osmValuePart,
      )

      if (
        effectiveAnswerId === QUESTION_NIL_ANSWER_ID ||
        !answer?.highwayValue ||
        !questionAnswerAppliesToGeometry(sign, question, answer, geometry)
      ) {
        continue
      }

      values.push(answer.highwayValue)
    }
  }

  return values
}

export const signHasHighwayQuestion = (sign: SignStateType): boolean =>
  sign.recodgnizedSign &&
  'questions' in sign &&
  Boolean(sign.questions?.some((question) => question.affectsHighway))

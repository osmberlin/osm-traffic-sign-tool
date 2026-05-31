import type { QuestionAnswersBySign } from '@osm-traffic-signs/converter'

/** `signKey.questionId.answerId` entries, comma-separated (e.g. `240.sidepath.yes,240.surfaceColor.red`). */
const COMPACT_ENTRY_SEPARATOR = ','

const signAnswersFromRecord = (record: Record<string, unknown>): QuestionAnswersBySign => {
  const answers: QuestionAnswersBySign = {}

  for (const [signKey, questionAnswers] of Object.entries(record)) {
    if (
      typeof questionAnswers !== 'object' ||
      questionAnswers === null ||
      Array.isArray(questionAnswers)
    ) {
      continue
    }

    const normalized: Record<string, string> = {}
    for (const [questionId, answerId] of Object.entries(questionAnswers)) {
      if (typeof answerId === 'string') {
        normalized[questionId] = answerId
      }
    }

    if (Object.keys(normalized).length > 0) {
      answers[signKey] = normalized
    }
  }

  return answers
}

const parseCompactAnswersParam = (input: string): QuestionAnswersBySign => {
  const trimmed = input.trim()
  if (!trimmed) {
    return {}
  }

  const answers: QuestionAnswersBySign = {}

  for (const entry of trimmed.split(COMPACT_ENTRY_SEPARATOR)) {
    const segment = entry.trim()
    if (!segment) {
      continue
    }

    const lastDot = segment.lastIndexOf('.')
    const secondLastDot = segment.lastIndexOf('.', lastDot - 1)
    if (lastDot <= 0 || secondLastDot <= 0) {
      return {}
    }

    const signKey = segment.slice(0, secondLastDot)
    const questionId = segment.slice(secondLastDot + 1, lastDot)
    const answerId = segment.slice(lastDot + 1)

    if (!signKey || !questionId || !answerId) {
      return {}
    }

    answers[signKey] ??= {}
    answers[signKey][questionId] = answerId
  }

  return answers
}

const serializeCompactAnswersParam = (answers: QuestionAnswersBySign): string => {
  const entries: string[] = []

  for (const signKey of Object.keys(answers).sort()) {
    const questionAnswers = answers[signKey]!
    for (const questionId of Object.keys(questionAnswers).sort()) {
      entries.push(`${signKey}.${questionId}.${questionAnswers[questionId]}`)
    }
  }

  return entries.join(COMPACT_ENTRY_SEPARATOR)
}

/**
 * Normalizes router search `answers` before Zod validation.
 * TanStack `parseSearchWith(JSON.parse)` may still yield an object for old JSON URLs.
 */
export const coerceAnswersSearchParam = (raw: unknown): string | undefined => {
  if (raw === undefined || raw === null || raw === '') {
    return undefined
  }

  if (typeof raw === 'string') {
    const trimmed = raw.trim()
    return trimmed.length > 0 ? trimmed : undefined
  }

  if (typeof raw === 'object' && !Array.isArray(raw)) {
    const migrated = serializeCompactAnswersParam(
      signAnswersFromRecord(raw as Record<string, unknown>),
    )
    return migrated.length > 0 ? migrated : undefined
  }

  return undefined
}

export const parseAnswersParam = (input: string | undefined): QuestionAnswersBySign => {
  if (!input) {
    return {}
  }

  return parseCompactAnswersParam(input)
}

/** Compact string for URL search; avoids `"` which browsers re-encode in the location bar. */
export const serializeAnswersParam = (
  answers: QuestionAnswersBySign | undefined,
): string | undefined => {
  if (!answers || Object.keys(answers).length === 0) {
    return undefined
  }

  return serializeCompactAnswersParam(answers)
}

export const answersSearchEqual = (left: string | undefined, right: string | undefined): boolean =>
  left === right

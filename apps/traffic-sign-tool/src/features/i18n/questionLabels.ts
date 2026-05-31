import * as m from '@app/paraglide/messages'
import type { QuestionAnswer } from '@osm-traffic-signs/converter'

const promptShortLabels: Record<string, () => string> = {
  'sidepath.prompt': m.question_sidepath_title,
  'surfaceColor.prompt': m.question_surfaceColor_title,
  'guidanceMode.prompt': m.question_guidanceMode_title,
  'highwayClass.prompt': m.question_highwayClass_title,
  'signDirection.prompt': m.question_signDirection_title,
}

const answerLabels: Record<string, () => string> = {
  'sidepath.answer.nil': m.question_sidepath_answer_nil,
  'sidepath.answer.yes': m.question_sidepath_answer_yes,
  'sidepath.answer.no': m.question_sidepath_answer_no,
  'surfaceColor.answer.nil': m.question_surfaceColor_answer_nil,
  'surfaceColor.answer.red': m.question_surfaceColor_answer_red,
  'surfaceColor.answer.green': m.question_surfaceColor_answer_green,
  'surfaceColor.answer.red_green': m.question_surfaceColor_answer_red_green,
  'guidanceMode.answer.nil': m.question_guidanceMode_answer_nil,
  'guidanceMode.answer.streetAdjacent': m.question_guidanceMode_answer_streetAdjacent,
  'guidanceMode.answer.independent': m.question_guidanceMode_answer_independent,
  'highwayClass.answer.nil': m.question_highwayClass_answer_nil,
  'highwayClass.answer.path': m.question_highwayClass_answer_path,
  'highwayClass.answer.cycleway': m.question_highwayClass_answer_cycleway,
  'highwayClass.answer.residential': m.question_highwayClass_answer_residential,
  'highwayClass.answer.service': m.question_highwayClass_answer_service,
  'highwayClass.answer.busway': m.question_highwayClass_answer_busway,
  'signDirection.answer.nil': m.question_signDirection_answer_nil,
  'signDirection.answer.forward': m.question_signDirection_answer_forward,
  'signDirection.answer.backward': m.question_signDirection_answer_backward,
}

export const getQuestionPromptShortLabel = (questionI18nKey: string): string =>
  promptShortLabels[questionI18nKey]?.() ?? questionI18nKey

export const getQuestionAnswerLabel = (answerI18nKey: string): string =>
  answerLabels[answerI18nKey]?.() ?? answerI18nKey

/** Label without trailing OSM tag hint in parentheses, e.g. "Rot (surface:colour=red)" → "Rot". */
export const getQuestionAnswerShortLabel = (answerI18nKey: string): string =>
  getQuestionAnswerLabel(answerI18nKey)
    .replace(/\s*\([^)]*\)\s*$/, '')
    .trim()

export const formatQuestionAnswerTags = (answer: QuestionAnswer | undefined): string | null => {
  if (!answer || answer.answerId === 'nil') {
    return null
  }

  const parts: string[] = []

  if (answer.highwayValue) {
    parts.push(`highway=${answer.highwayValue}`)
  }

  answer.tags?.forEach((tag) => {
    parts.push(`${tag.key}=${tag.value}`)
  })

  answer.removeTags?.forEach((tag) => {
    parts.push(`-${tag.key}=${tag.value}`)
  })

  return parts.length > 0 ? parts.join(', ') : null
}

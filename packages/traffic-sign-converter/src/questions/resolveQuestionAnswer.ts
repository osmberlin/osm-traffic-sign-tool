import {
  QUESTION_NIL_ANSWER_ID,
  type QuestionAnswersBySign,
  type SignQuestion,
} from '../data-definitions/TrafficSignDataTypes.js'

export const resolveEffectiveAnswerId = (
  question: SignQuestion,
  selectedAnswerId: string | undefined,
): string => {
  if (selectedAnswerId !== undefined) {
    return selectedAnswerId
  }

  if (question.defaultAnswerId) {
    return question.defaultAnswerId
  }

  return QUESTION_NIL_ANSWER_ID
}

export const getSelectedAnswerId = (
  answers: QuestionAnswersBySign | undefined,
  signOsmValuePart: string,
  questionId: string,
): string | undefined => answers?.[signOsmValuePart]?.[questionId]

export const resolveQuestionAnswer = (
  question: SignQuestion,
  answers: QuestionAnswersBySign | undefined,
  signOsmValuePart: string,
) => {
  const selectedAnswerId = getSelectedAnswerId(answers, signOsmValuePart, question.questionId)
  const effectiveAnswerId = resolveEffectiveAnswerId(question, selectedAnswerId)
  const answer = question.answers.find((item) => item.answerId === effectiveAnswerId)

  return {
    selectedAnswerId,
    effectiveAnswerId,
    answer,
  }
}

export const isExplicitNilSelection = (
  question: SignQuestion,
  answers: QuestionAnswersBySign | undefined,
  signOsmValuePart: string,
): boolean => {
  const selected = getSelectedAnswerId(answers, signOsmValuePart, question.questionId)
  return selected === QUESTION_NIL_ANSWER_ID
}

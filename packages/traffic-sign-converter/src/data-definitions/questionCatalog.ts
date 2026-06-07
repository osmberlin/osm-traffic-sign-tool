import {
  QUESTION_NIL_ANSWER_ID,
  type QuestionAnswer,
  type SignQuestion,
} from './TrafficSignDataTypes.js'

const nilAnswer = (questionId: string): QuestionAnswer => ({
  answerId: QUESTION_NIL_ANSWER_ID,
  answerI18nKey: `${questionId}.answer.nil`,
})

/** `is_sidepath=yes|no` with explicit unset option. */
export const sidepathQuestion = (): SignQuestion => ({
  questionId: 'sidepath',
  questionI18nKey: 'sidepath.prompt',
  answers: [
    nilAnswer('sidepath'),
    {
      answerId: 'yes',
      answerI18nKey: 'sidepath.answer.yes',
      tags: [{ key: 'is_sidepath', value: 'yes' }],
    },
    {
      answerId: 'no',
      answerI18nKey: 'sidepath.answer.no',
      tags: [{ key: 'is_sidepath', value: 'no' }],
    },
  ],
})

/** Cycle infrastructure surface marking. Internal id uses US spelling (`surfaceColor`). */
export const surfaceColorQuestion = (
  tagKey: 'surface:colour' | 'cycleway:surface:colour' = 'surface:colour',
): SignQuestion => ({
  questionId: 'surfaceColor',
  questionI18nKey: 'surfaceColor.prompt',
  answers: [
    nilAnswer('surfaceColor'),
    {
      answerId: 'red',
      answerI18nKey: 'surfaceColor.answer.red',
      tags: [{ key: tagKey, value: 'red' }],
    },
    {
      answerId: 'green',
      answerI18nKey: 'surfaceColor.answer.green',
      tags: [{ key: tagKey, value: 'green' }],
    },
    {
      answerId: 'red_green',
      answerI18nKey: 'surfaceColor.answer.red_green',
      tags: [{ key: tagKey, value: 'red;green' }],
    },
  ],
})

/** Road marking line colour (`colour=*`). */
export const markingColorQuestion = (): SignQuestion => ({
  questionId: 'markingColor',
  questionI18nKey: 'markingColor.prompt',
  answers: [
    nilAnswer('markingColor'),
    {
      answerId: 'white',
      answerI18nKey: 'markingColor.answer.white',
      tags: [{ key: 'colour', value: 'white' }],
    },
    {
      answerId: 'yellow',
      answerI18nKey: 'markingColor.answer.yellow',
      tags: [{ key: 'colour', value: 'yellow' }],
    },
  ],
})

/** Street-adjacent vs independently routed path/cycleway. */
export const guidanceModeQuestion = (): SignQuestion => ({
  questionId: 'guidanceMode',
  questionI18nKey: 'guidanceMode.prompt',
  answers: [
    nilAnswer('guidanceMode'),
    {
      answerId: 'streetAdjacent',
      answerI18nKey: 'guidanceMode.answer.streetAdjacent',
      tags: [{ key: 'footway', value: 'sidewalk' }],
    },
    {
      answerId: 'independent',
      answerI18nKey: 'guidanceMode.answer.independent',
      tags: [{ key: 'is_sidepath', value: 'no' }],
    },
  ],
})

/** Pick one highway class when multiple values were previously listed as an array. */
export const highwayClassQuestion = (
  highwayValues: readonly string[],
  defaultHighway?: string,
  options?: {
    cyclewayRemovesBicycleDesignated?: boolean
    referenceUrls?: Partial<Record<string, string>>
  },
): SignQuestion => ({
  questionId: 'highwayClass',
  questionI18nKey: 'highwayClass.prompt',
  defaultAnswerId: defaultHighway ?? highwayValues[0] ?? null,
  affectsHighway: true,
  answers: [
    nilAnswer('highwayClass'),
    ...highwayValues.map((highwayValue) => ({
      answerId: highwayValue,
      answerI18nKey: `highwayClass.answer.${highwayValue}`,
      highwayValue,
      ...(options?.referenceUrls?.[highwayValue]
        ? { referenceUrl: options.referenceUrls[highwayValue] }
        : {}),
      ...(highwayValue === 'cycleway' && options?.cyclewayRemovesBicycleDesignated
        ? { removeTags: [{ key: 'bicycle', value: 'designated' }] }
        : {}),
    })),
  ],
})

const DIRECTION_WAY_RELATIVE_WIKI_URL =
  'https://wiki.openstreetmap.org/wiki/DE:Key:direction#Vorwärts_und_rückwärts'

/** Node `direction=forward|backward` relative to the attached way (DE:Key:direction). */
export const signDirectionQuestion = (): SignQuestion => ({
  questionId: 'signDirection',
  questionI18nKey: 'signDirection.prompt',
  geometries: ['node'],
  answers: [
    nilAnswer('signDirection'),
    {
      answerId: 'forward',
      answerI18nKey: 'signDirection.answer.forward',
      tags: [{ key: 'direction', value: 'forward' }],
      referenceUrl: DIRECTION_WAY_RELATIVE_WIKI_URL,
    },
    {
      answerId: 'backward',
      answerI18nKey: 'signDirection.answer.backward',
      tags: [{ key: 'direction', value: 'backward' }],
      referenceUrl: DIRECTION_WAY_RELATIVE_WIKI_URL,
    },
  ],
})

export const pathInfrastructureQuestions = (): SignQuestion[] => [
  sidepathQuestion(),
  surfaceColorQuestion('cycleway:surface:colour'),
]

export const cycleInfrastructureQuestions = (): SignQuestion[] => [
  sidepathQuestion(),
  surfaceColorQuestion(),
]

/** Node tagging for hazard signs mapped as `traffic_sign` on a way node (see DE:Key:traffic_sign). */
export const hazardSignNodeQuestions = (): SignQuestion[] => [signDirectionQuestion()]

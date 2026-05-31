import type { SignQuestion, SignStateType } from '@osm-traffic-signs/converter'

export const hasSignQuestions = (sign: SignStateType | { questions?: SignQuestion[] }): boolean =>
  'questions' in sign && Boolean(sign.questions?.length)

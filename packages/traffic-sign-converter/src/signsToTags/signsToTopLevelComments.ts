import type { SignComentType, SignStateType } from '../data-definitions/TrafficSignDataTypes.js'

export const signsToTopLevelComments = (signs: SignStateType[]) => {
  const signCommentsMap: Map<string, SignComentType[]> = new Map()

  for (const sign of signs) {
    if (sign.recognized === false) continue

    if (sign.comments?.length) {
      signCommentsMap.set(sign.osmValuePart, sign.comments)
    }
  }

  return signCommentsMap
}

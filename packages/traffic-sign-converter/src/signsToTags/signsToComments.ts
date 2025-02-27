import type { SignComentType, SignStateType } from '../data-definitions/TrafficSignDataTypes.js'

export const signsToComments = (signs: SignStateType[]) => {
  const signCommentsMap: Map<string, SignComentType[]> = new Map()

  for (const sign of signs) {
    if (sign.recodgnizedSign === false) continue

    if (sign.comments?.length) {
      signCommentsMap.set(sign.osmValuePart, sign.comments)
    }
  }

  return signCommentsMap
}

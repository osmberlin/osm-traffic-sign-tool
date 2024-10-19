import type { SignStateType, SignType } from '../TrafficSignDataTypes.js'

export const transformToSignState = (sign: SignType) => {
  return { ...sign, key: sign.osmValuePart, recodgnizedSign: true } satisfies SignStateType
}

import type { SignStateType, SignType } from '../TrafficSignDataTypes.js'

export const transformToSignState = (sign: SignType) => {
  return { ...sign, recodgnizedSign: true } satisfies SignStateType
}

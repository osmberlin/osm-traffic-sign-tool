import type { SignStateType, SignType } from '../data-definitions/TrafficSignDataTypes.js'

export const transformToSignState = (sign: SignType) => {
  return { ...sign, recodgnizedSign: true } satisfies SignStateType
}

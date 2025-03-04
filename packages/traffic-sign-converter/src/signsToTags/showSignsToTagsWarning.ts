import type { SignStateType } from '../data-definitions/TrafficSignDataTypes.js'
import { splitIntoSignGroups } from './utils/splitIntoSignGroups.js'

export const showSignsToTagsWarning = (signs: SignStateType[]) => {
  const signGroups = splitIntoSignGroups(signs)
  return signGroups.some((group) => group.filter((s) => s.kind !== 'traffic_sign').length > 1)
}

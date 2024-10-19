import type { SignType } from '../../data/TrafficSignDataTypes.js'

// TODO: Group by main sign + modifiers because modifiers only apply to the main sign
export const splitIntoSignGroups = (signs: SignType[]) => {
  return [signs]
}

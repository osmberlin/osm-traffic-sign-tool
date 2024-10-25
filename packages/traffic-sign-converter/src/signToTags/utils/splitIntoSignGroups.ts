import type { SignStateType } from '../../data/TrafficSignDataTypes.js'

// TODO: Group by main sign + modifiers because modifiers only apply to the main sign
export const splitIntoSignGroups = (signs: SignStateType[]) => {
  const groups: SignStateType[][] = []
  let currentGroup: SignStateType[] = []

  signs.forEach((sign) => {
    if (sign.kind === 'traffic_sign') {
      if (currentGroup.length > 0) {
        groups.push(currentGroup)
      }
      currentGroup = [sign]
    } else if (sign.kind === 'modifier_sign') {
      currentGroup.push(sign)
    }
  })

  if (currentGroup.length > 0) {
    groups.push(currentGroup)
  }

  return groups
}

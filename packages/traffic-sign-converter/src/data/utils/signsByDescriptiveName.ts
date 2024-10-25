import { trafficSignData } from '../trafficSignData.js'
import { transformToSignState } from './transformToSignState.js'

/** @description Looks at the start of the `descriptiveName` property */
export const signsByDescriptiveName = (names: string[]) => {
  const signs = names
    .map((name) => {
      const exactMatch = trafficSignData.find((s) => s.descriptiveName == name)
      const startsWithMatch = trafficSignData.find((s) => s.descriptiveName.startsWith(name))
      return exactMatch || startsWithMatch
    })
    .filter(Boolean)

  if (signs.length !== names.length) {
    console.info('ERROR', {
      nameCount: names.length,
      signCount: signs.length,
      missing: names.filter((n) => !signs.some((s) => s.descriptiveName === n)),
    })
  }

  return signs
}

export const signsStateByDescriptiveName = (names: string[]) => {
  const signs = signsByDescriptiveName(names)
  return signs.map((sign) => transformToSignState(sign))
}

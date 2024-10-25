import { trafficSignData } from '../data/trafficSignData.js'
import type { SignType } from '../data/TrafficSignDataTypes.js'

export const tagsToSigns = (osmTags: string[]) => {
  const signCandidates: SignType[] = []

  for (const sign of trafficSignData) {
    const identifyingTags: string[] =
      sign.identifyingTags?.map((tag) => `${tag.key}=${tag.value}`) || []

    if (osmTags.every((tag) => identifyingTags.includes(tag))) {
      signCandidates.push(sign)
    }
  }

  return signCandidates
}

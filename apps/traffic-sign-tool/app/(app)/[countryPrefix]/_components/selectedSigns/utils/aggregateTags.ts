import {
  CountryPrefixesType,
  signToTrafficSignTagValue,
  TrafficSignState,
} from '@osm-traffic-signs/converter'
import { addRestrictionTags } from './addRestrictionTags'
import { collectTags } from './collectTags'
import { removeDuplicates } from './removeDuplicates'

export type AggregatedTags = [string, Readonly<string | string[]>][]
export const aggregateTags = (
  selectedSigns: TrafficSignState[],
  countryPrefix: CountryPrefixesType | undefined,
) => {
  const aggregatedTags = collectTags(selectedSigns)

  // Create the aggregated traffic_sign tag
  // First cleanup existing tags, than add a fresh one with all signs
  const existingTrafficSignIndex = aggregatedTags.findIndex(([tag, _]) => tag === 'traffic_sign')
  if (existingTrafficSignIndex) {
    delete aggregatedTags[existingTrafficSignIndex]
  }
  const trafficSignValue = signToTrafficSignTagValue(selectedSigns, countryPrefix)
  aggregatedTags.push(['traffic_sign', trafficSignValue])

  addRestrictionTags(aggregatedTags, selectedSigns)

  // Update restrictions conditionally
  // TODO is this something we still need to do? Or is this comment obsolte?

  // Sort keys A-Z
  aggregatedTags.sort((a, b) => a[0].localeCompare(b[0]))

  const uniqueAggregatedTags = removeDuplicates<AggregatedTags>(aggregatedTags)

  return uniqueAggregatedTags
}

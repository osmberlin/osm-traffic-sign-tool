import type { TrafficSign } from '@/data/types'
import { addRestrictionTags } from './addRestrictionTags'
import { collectTags } from './collectTags'
import { createTrafficSignTagValue } from './createTrafficSignTagValue'
import { removeDuplicates } from './removeDuplicates'

export type AggregatedTags = [string, string | string[]][]
export const aggregateTags = (selectedSigns: TrafficSign[]) => {
	const aggregatedTags = collectTags(selectedSigns)

	// Create the aggregated traffic_sign tag
	// First cleanup existing tags, than add a fresh one with all signs
	const existingTrafficSignIndex = aggregatedTags.findIndex(([tag, _]) => tag === 'traffic_sign')
	if (existingTrafficSignIndex) {
		delete aggregatedTags[existingTrafficSignIndex]
	}
	const trafficSignValue = createTrafficSignTagValue(selectedSigns)
	aggregatedTags.push(['traffic_sign', trafficSignValue])

	addRestrictionTags(aggregatedTags, selectedSigns)

	// Update restrictions conditionally
	// TODO is this something we still need to do? Or is this comment obsolte?

	// Sort keys A-Z
	aggregatedTags.sort((a, b) => a[0].localeCompare(b[0]))

	const uniqueAggregatedTags: AggregatedTags = removeDuplicates<AggregatedTags>(aggregatedTags)

	return uniqueAggregatedTags
}

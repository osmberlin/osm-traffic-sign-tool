import { createTrafficSignTagValue } from './utils/createTrafficSignTagValue'
import { removeDuplicates } from './utils/removeDuplicates'
import { addRestrictionTags } from './utils/addRestrictionTags'
import { collectTags } from './utils/collectTags'
import type { TrafficSignMap } from '@/data/types'

export type AggregatedTags = [string, string | string[]][]
export type AggregatedComments = string[]

export const aggregateTags = (
	selectedSigns: TrafficSignMap[]
): [AggregatedTags, AggregatedComments] => {
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

	// Collect comments
	const aggregatedComments = selectedSigns
		.map(([_, sign]) => sign.tagsComment && sign.tagsComment)
		.filter(Boolean)

	// Sort keys A-Z
	aggregatedTags.sort((a, b) => a[0].localeCompare(b[0]))

	const uniqueAggregatedTags = removeDuplicates<AggregatedTags>(aggregatedTags)

	return [uniqueAggregatedTags, aggregatedComments]
}

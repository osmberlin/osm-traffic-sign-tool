import type { TrafficSignWithWikiEntry } from '@/data/trafficSigns'
import { createTrafficSignValue } from './utils/createTrafficSignValue'

export type AggregatedTags = [string, string | string[]][]
export type AggregatedComments = string[]

export const aggregateTags = (
	selectedSigns: TrafficSignWithWikiEntry[]
): [AggregatedTags, AggregatedComments] => {
	const aggregatedTags: AggregatedTags = []

	// Create aggregated list of tag
	selectedSigns.forEach(
		([_, sign]) =>
			sign.osmTags && Object.entries(sign.osmTags).forEach((tag) => aggregatedTags.push(tag))
	)

	// Create the aggregated traffic_sign tag
	// First cleanup existing tags, than add a fresh one with all signs
	const existingTrafficSignIndex = aggregatedTags.findIndex(([tag, _]) => tag === 'traffic_sign')
	if (existingTrafficSignIndex) {
		delete aggregatedTags[existingTrafficSignIndex]
	}
	const trafficSignValue = createTrafficSignValue(selectedSigns)
	aggregatedTags.push(['traffic_sign', trafficSignValue])

	// Handle restriction: Collect keys, add all given values to those key (or 'no')
	const restrictionKeys: string[] = selectedSigns
		.map(([_, sign]) => sign.restrictionKeys)
		.flat()
		.filter(Boolean)

	const restrictionValues: string[] = selectedSigns
		.map(([_, sign]) => sign.restrictionValue)
		.filter(Boolean)

	restrictionKeys.forEach((restrictionKey) =>
		aggregatedTags.push([restrictionKey, restrictionValues.join(',') || 'no'])
	)

	// Collect comments
	const aggregatedComments = selectedSigns
		.map(([_, sign]) => sign.tagsComment && sign.tagsComment)
		.filter(Boolean)

	// Sort keys A-Z
	aggregatedTags.sort((a, b) => a[0].localeCompare(b[0]))

	// Remove duplicates
	const seen: Record<string, true> = {}
	const uniqueAggregatedTags = aggregatedTags.filter((item) => {
		if (seen[item[0]]) {
			return false
		} else {
			seen[item[0]] = true
			return true
		}
	})

	return [uniqueAggregatedTags, aggregatedComments]
}

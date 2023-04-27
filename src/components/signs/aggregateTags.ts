import type { TrafficSign } from '@/data/trafficSigns'

export type AggregatedTags = [string, string | string[]][]
export type AggregatedComments = string[]

export const aggregateTags = (
	selectedSigns: [string, TrafficSign][]
): [AggregatedTags, AggregatedComments] => {
	const aggregatedTags: AggregatedTags = []
	const selectedSignIds = Object.keys(Object.fromEntries(selectedSigns))

	// Create aggregated list of tag
	selectedSigns.forEach(
		([_, sign]) =>
			sign.osmTags && Object.entries(sign.osmTags).forEach((tag) => aggregatedTags.push(tag))
	)

	// Create the aggregated traffic_sign tag
	const osmTagTrafficSign = selectedSignIds?.map((id) => id.replace('DE:', '')).join(',')
	if (osmTagTrafficSign) {
		// First cleanup existing tags, than add a fresh one with all signs
		const existingTrafficSignIndex = aggregatedTags.findIndex(([tag, _]) => tag === 'traffic_sign')
		if (existingTrafficSignIndex) {
			delete aggregatedTags[existingTrafficSignIndex]
		}
		aggregatedTags.push(['traffic_sign', `DE:${osmTagTrafficSign}`])
	}

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

	// Comments
	const aggregatedComments = selectedSigns
		.map(([_, sign]) => sign.tagsComment && sign.tagsComment)
		.filter(Boolean)

	return [aggregatedTags, aggregatedComments]
}

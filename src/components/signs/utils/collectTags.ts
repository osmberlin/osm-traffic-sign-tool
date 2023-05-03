import type { TrafficSignWithWikiEntry } from '@/data/trafficSigns'
import type { AggregatedTags } from '../aggregateTags'

export const collectTags = (selectedSigns: TrafficSignWithWikiEntry[]) => {
	const tags: AggregatedTags = []

	selectedSigns.forEach(
		([_, sign]) => sign.osmTags && Object.entries(sign.osmTags).forEach((tag) => tags.push(tag))
	)

	return tags
}

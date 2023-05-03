import type { TrafficSignWithWikiEntry } from '@/data/trafficSigns'
import type { AggregatedTags } from '../aggregateTags'

export const collectTags = (selectedSigns: TrafficSignWithWikiEntry[]) => {
	const tags: AggregatedTags = []

	selectedSigns.forEach(([_, sign]) => {
		// Handle `osmTags`
		if (sign.osmTags) {
			Object.entries(sign.osmTags).forEach((tag) => tags.push(tag))
		}

		// Handle `key`, `value`
		if (sign.key && sign.value) {
			tags.push([sign.key, sign.value])
		}

		// Handle `valuePrompt` Default
		if (sign.key && sign.valuePrompt) {
			tags.push([sign.key, sign.urlValue ?? sign.valuePrompt.defaultValue])
		}
	})

	return tags
}

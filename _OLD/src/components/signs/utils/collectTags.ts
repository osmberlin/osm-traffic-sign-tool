import type { TrafficSign } from '@/data/types'
import type { AggregatedTags } from './aggregateTags'

export const collectTags = (selectedSigns: TrafficSign[]) => {
	const tags: AggregatedTags = []

	selectedSigns.forEach((sign) => {
		// Handle `osmTags`
		if (sign.osmTags) {
			Object.entries(sign.osmTags).forEach((tag) => tags.push(tag))
		}

		// Handle `key`, `value`
		if (sign.key && 'value' in sign) {
			tags.push([sign.key, sign.value])
		}

		// Handle `valuePrompt` Default
		if (sign.key && 'valuePrompt' in sign) {
			tags.push([sign.key, sign.signValue ?? sign.valuePrompt.defaultValue])
		}
	})

	return tags
}

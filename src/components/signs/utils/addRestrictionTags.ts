import type { TrafficSignWithWikiEntry } from '@/data/trafficSigns'
import type { AggregatedTags } from '../aggregateTags'

export const addRestrictionTags = (
	aggregatedTags: AggregatedTags,
	selectedSigns: TrafficSignWithWikiEntry[]
) => {
	// Handle restriction: Collect keys, add all given values to those key (or 'no')
	const restrictionKeys: string[] = selectedSigns
		.map(([_, sign]) => sign.restrictionKeys)
		.flat()
		.filter(Boolean)

	const restrictionValues: string[] = selectedSigns
		.map(([_, sign]) => sign.restrictionValue)
		.filter(Boolean)

	const conditialValues = selectedSigns
		.map(([_, sign]) => sign.conditional && sign.value)
		.filter(Boolean)

	restrictionKeys.forEach((restrictionKey) => {
		const value = restrictionValues.join(',') || 'no'
		if (conditialValues.length) {
			const conditionals = conditialValues.join(' AND ')
			aggregatedTags.push([`${restrictionKey}:conditional`, `${value} @ (${conditionals})`])
		} else {
			aggregatedTags.push([restrictionKey, value])
		}
	})
}

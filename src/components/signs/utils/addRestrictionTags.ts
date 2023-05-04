import type { TrafficSignMap } from '@/data/types'
import type { AggregatedTags } from '../aggregateTags'

export const addRestrictionTags = (
	aggregatedTags: AggregatedTags,
	selectedSigns: TrafficSignMap[]
) => {
	// Handle restriction: Collect keys, add all given values to those key (or 'no')
	const restrictionKeys: string[] = selectedSigns
		.map(([_, sign]) => 'restrictionKeys' in sign && sign.restrictionKeys)
		.flat()
		.filter(Boolean)

	const restrictionValues: string[] = selectedSigns
		.map(([_, sign]) => 'restrictionValue' in sign && sign.restrictionValue)
		.filter(Boolean)

	const conditialValues = selectedSigns
		.map(([_, sign]) => sign.conditional && 'value' in sign && sign.value)
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

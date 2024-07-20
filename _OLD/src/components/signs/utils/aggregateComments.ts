import type { TrafficSign } from '@/data/types'

export type AggregatedComments = [string, string, string][]
export const aggregateComments = (selectedSigns: TrafficSign[]) => {
	const aggregatedComments: AggregatedComments = selectedSigns
		.map((sign) => {
			const title = [sign.name, sign.description].join(' – ')
			const keyComment = sign.tagsComment ? [sign.urlKey, title, sign.tagsComment] : undefined
			return keyComment as [string, string, string] | undefined
		})
		.filter(Boolean)

	return aggregatedComments
}

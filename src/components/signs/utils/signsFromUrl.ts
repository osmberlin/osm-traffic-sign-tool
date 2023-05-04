import { trafficSigns } from '@/data/trafficSigns'
import type { TrafficSignMap } from '@/data/types'

export const splitUrlString = (urlString: string) => {
	// TODO: This code is dirty and should be an regex…
	return {
		urlKey: urlString.split('[').at(0),
		urlValue: urlString.split('[').at(1)?.replace(']', '')
	}
}

export const buildUrlString = ({
	urlKey,
	urlValue
}: {
	urlKey: string
	urlValue: string | undefined
}) => {
	return urlValue ? `${urlKey}[${urlValue}]` : urlKey
}

export const signsFromUrl = (selectedSignIds: string[] | null) => {
	// TODO: Clean this up once we have a merged and clean trafficSign object

	const selectedSigns: TrafficSignMap[] = []
	const selectedSignsKeyValue = selectedSignIds?.map((s) => splitUrlString(s))

	Object.entries(trafficSigns).forEach(([key, values]) => {
		// The URL stores sign-values as DE:123[5.5]
		// But we only match on "DE:123"
		const { urlKey: cleanUrlKey } = splitUrlString(key)

		const selectedSignKeyValue = selectedSignsKeyValue?.find(({ urlKey }) => urlKey == cleanUrlKey)

		if (typeof selectedSignKeyValue === 'object') {
			const { urlKey, urlValue } = selectedSignKeyValue
			values.urlString = buildUrlString({ urlKey: urlKey ?? key, urlValue })
			values.urlKey = urlKey ?? key
			values.urlValue = urlValue
			selectedSigns.push([key, values])
		}
	})

	return selectedSigns
}

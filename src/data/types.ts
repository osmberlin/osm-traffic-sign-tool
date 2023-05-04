export type TrafficSigns = {
	[key: string]: TrafficSign
}

export type TrafficSignMap = [string, TrafficSign]

export type TrafficSign = {
	/** @desc DE:123[5.5] — The value that we store in the URL, it includes the `valuePrompt`-value */
	urlString: string
	/** @desc DE:123 — The sign key without the value part  */
	urlKey?: string
	/** @desc 5.5 — For signs that have `valuePrompt`, this is the value given by the URL */
	urlValue?: string
	name: string
	descriptiveName: string | null
	description: string | null
	osmTags?: {
		[key: string]: string | string[]
	}
	impliedKey?: string // TODO understand how this worked in the old app
	links?: string[]
	tagsComment?: string
	mostUsed?: boolean
	key?: string
	value?: string
	image?: {
		svgPath: string
		svgSourceUrl: string
		sourceUrl: string
		licence: 'Public Domain'
	}
	valuePrompt?: {
		prompt: string
		defaultValue: string
		format: 'integer' | 'float' | 'opening_hours'
	}
	restrictionKeys?: string[]
	restrictionValue?: string
	category: 'traffic_sign' | 'modifier_sign' | 'modifier_sign_restriction'
	segregated?: string
	conditional?: boolean
	validations?: { requiredKey?: string; shouldBeHighwayValue?: string }
}

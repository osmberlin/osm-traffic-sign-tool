import type { Prettify } from '@/components/typeUtils'

export type TrafficSigns = {
	[key: string]: TrafficSign
}

export type TrafficSignMap = [string, TrafficSign]

export type TrafficSign = Prettify<
	(TrafficSignCategoryTrafficSign | TrafficSignCategoryModifier) & TrafficSignKeyValue & Both
>

type Both = {
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
	links?: string[]
	tagsComment?: string
	// TODO: Remove `?` once all objects have an image
	image?: {
		svgPath: string
		svgSourceUrl: string
		sourceUrl: string
		licence: 'Public Domain'
	}
	validations?: { requiredKey?: string; shouldBeHighwayValue?: string }
	mostUsed?: boolean
}

type TrafficSignCategoryTrafficSign =
	| {
			category: 'traffic_sign'
			impliedKey?: 'access' | 'conditional'
	  }
	| {
			category: 'traffic_sign'
			restrictionKeys?: string[]
	  }

type TrafficSignCategoryModifier = {
	category: 'modifier_sign' | 'modifier_sign_restriction'
	impliedKey?: never
	restrictionValue?: string
}

type ValuePrompt<T> = {
	prompt: string
	defaultValue: string
	format: T
}

type TrafficSignKeyValue =
	| {
			// Nothing at all
			conditional?: never
			key?: never
			value?: never
	  }
	| {
			// key + value
			conditional?: never
			key: string
			value: string
	  }
	| {
			// key + valuePrompt
			conditional?: never
			key: string
			valuePrompt: ValuePrompt<'integer' | 'float'>
	  }
	| {
			// valuePrompt opening ours
			conditional: true
			key?: never
			valuePrompt: ValuePrompt<'opening_hours'>
	  }
	| {
			// fixed days, `wet`
			conditional: true
			key?: never
			value: string
	  }

import type { Prettify } from '@/components/typeUtils'

export type TrafficSigns = {
	[key: string]: TrafficSign
}

export type TrafficSign = Prettify<
	Base &
		UrlFromApp &
		(TrafficSignCategoryTrafficSign | TrafficSignCategoryModifier) &
		TrafficSignKeyValue &
		TagsAndValidations &
		Image
>

type UrlFromApp = {
	/** @desc DE:123[5.5] — The value that we store in the URL, it includes the `valuePrompt`-value */
	urlKey: string
	/** @desc DE:123 — The sign key without the value part  */
	signKey: string
	/** @desc 5.5 — For signs that have `valuePrompt`, this is the value given by the URL */
	signValue: string | undefined
}

type Base = {
	name: string
	descriptiveName: string | null
	description: string | null
	mostUsed?: boolean
}

type TagsAndValidations = {
	osmTags?: {
		[key: string]: string | string[]
	}
	tagsComment?: string
	validations?: {
		requiredKey?: string
		shouldBeHighwayValue?: string
	}
}

type Image = {
	image:
		| {
				svgPath: string
				sourceUrl: string
				licence: 'Public Domain'
		  }
		| {
				svgPath: undefined
				sourceUrl: undefined
				licence: undefined
		  }
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
	category: 'modifier_sign' | 'modifier_sign_restriction' | 'traffic_sign' // used only once for "Landwirtschaftlicher Verkehr frei"
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
			// valuePrompt time restrions from-to or Array<from-to>
			conditional: true
			key?: never
			valuePrompt: ValuePrompt<'time_restriction'>
	  }
	| {
			// fixed days, `wet`
			conditional: true
			key?: never
			value: string
	  }

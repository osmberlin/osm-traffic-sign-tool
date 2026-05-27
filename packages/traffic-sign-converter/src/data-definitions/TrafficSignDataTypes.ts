import type { Prettify } from '../types/types.js'
import type {
  NumericValuePromptFormat,
  OpeningHoursValuePromptFormat,
  ValuePromptFormat,
} from './valuePromptFormats.js'

export type RedirectMapping = { from: string; to: string }

export type SignStateType = Prettify<
  | (TrafficSignType & {
      recodgnizedSign: true
      matchdByAlternativeKey?: string
      svgName: string
    })
  | (ModifierSignType & {
      recodgnizedSign: true
      matchdByAlternativeKey?: string
      svgName: string
    })
  | (UnkownSignType & {
      recodgnizedSign: false
      matchdByAlternativeKey?: string
      svgName: null
    })
>

export type SignType = TrafficSignType | ModifierSignType

export type UnkownSignType = {
  osmValuePart: string
  signId: null
  signValue: string
  kind: 'traffic_sign' | 'exception_modifier' | 'condition_modifier'
  descriptiveName: string
  redirects?: never
}

export type TrafficSignType = SharedId &
  SharedContent & {
    kind: 'traffic_sign'
    // maxspeed, maxweight
    signValue?: number
    valuePrompt?: ValuePrompt<NumericValuePromptFormat>
    tagRecommendations: TagRecommendationsTrafficSign
  } & SharedComments &
  SharedQuestions &
  SharedCompatibility &
  SharedCatalogue<TrafficSignCatalogueCategory> &
  SharedIdentifiyingTags &
  SharedImage &
  SharedTaggingSuggestionsQa

export type ModifierSignType = Prettify<
  SharedId &
    SharedContent & {
      kind: 'exception_modifier' | 'condition_modifier'
      signValue?: string | number
      valuePrompt?:
        | ValuePrompt<NumericValuePromptFormat>
        | ValuePrompt<OpeningHoursValuePromptFormat>
      tagRecommendations: TagRecommendationsModifierSign
    } & SharedComments &
    SharedQuestions &
    SharedCompatibility &
    SharedCatalogue<ModifierSignCatalogueCategory> &
    SharedIdentifiyingTags &
    SharedImage &
    SharedTaggingSuggestionsQa
>

type SharedId = {
  osmValuePart: string
  signId: string
  redirects?: RedirectMapping[]
}
type SharedContent = {
  name: string
  descriptiveName: string
  description: string | null
}
type SharedCompatibility = {
  compatibility?: {
    canReceiveModifiers?: boolean
    /** @desc Value of `signId` */
    incompatibleModifiers?: string[]
  }
}
export const trafficSignCatalogueCategories = [
  'traffic_sign',
  'object_sign',
  'surface_sign',
  'hazard_sign',
  'signpost',
  'speed',
] as const

export const modifierSignCatalogueCategories = [
  'exception_modifier',
  'condition_modifier',
  'direction_modifier',
] as const

export type TrafficSignCatalogueCategory = (typeof trafficSignCatalogueCategories)[number]
export type ModifierSignCatalogueCategory = (typeof modifierSignCatalogueCategories)[number]

/** Sign-picker section order; must list every catalogue category exactly once. */
export const signCategories = [
  'traffic_sign',
  'exception_modifier',
  'condition_modifier',
  'direction_modifier',
  'speed',
  'hazard_sign',
  'surface_sign',
  'object_sign',
  'signpost',
] as const satisfies readonly (TrafficSignCatalogueCategory | ModifierSignCatalogueCategory)[]

export type SignCategory = (typeof signCategories)[number]

export const signFocusTags = ['bike_foot', 'parking', 'highway'] as const
export type SignFocusTag = (typeof signFocusTags)[number]

export const catalogueFocusViews = ['default', ...signFocusTags] as const
export type CatalogueFocusView = (typeof catalogueFocusViews)[number]

/** Listed in tab. `'highlight'` = listed + featured ("Häufig verwendet") in that tab. */
export type CatalogueFocusLevel = true | 'highlight'

/** Per-view catalogue contract. Omit = Standard only (`default: true`, not featured). */
export type CatalogueFocus = Partial<Record<CatalogueFocusView, CatalogueFocusLevel>> & {
  /** Only in Alle tab (no Standard / thematic). */
  all?: true
}

export const focusAreas = ['default', ...signFocusTags, 'all'] as const
export type FocusArea = (typeof focusAreas)[number]

export const taggingSuggestionsQaStatuses = ['none'] as const
export type TaggingSuggestionsQaStatus = (typeof taggingSuggestionsQaStatuses)[number]

type SharedTaggingSuggestionsQa = {}

type TagRecommendationsNone = 'none'

export type TagRecommendationsTrafficSignObject = {
  highwayValues?: string[]
  accessTags?: { key: string; value: string }[]
  uniqueTags?: (
    | { key: string; value: string }
    | {
        key: string
        /** @description Format: `"FOO:"` will result in `"FOO:30"` for `signValue=30` */
        valueTemplate?: `${string}$` | `$${string}` | `${string}$${string}`
      }
  )[]
  conditionalTags?: {
    key: string
    value: string
  }[]
}

export type TagRecommendationsModifierSignObject = {
  highwayValues?: string[]
  accessTags?: { key: string; value: string }[]
  modifierValue?: string
  uniqueTags?: { key: string; value: string }[]
  modifierValueFromValuePrompt?: boolean
}

export type TagRecommendationsTrafficSign =
  | TagRecommendationsNone
  | TagRecommendationsTrafficSignObject
export type TagRecommendationsModifierSign =
  | TagRecommendationsNone
  | TagRecommendationsModifierSignObject

type SharedCatalogue<T> = {
  catalogue: {
    signCategory: T
    focus?: CatalogueFocus
  }
}
export type ValuePrompt<T extends ValuePromptFormat = ValuePromptFormat> = {
  prompt: string
  defaultValue: string
  format: T
}

export type SignComentType = {
  tagReference?: string | null
  important?: true | undefined
  /** BCP-47 language of the comment text (e.g. `de`, `en`). */
  lang?: string
  comment: string
}

type SharedComments = {
  comments?: SignComentType[]
}
type SharedQuestions = {
  questions?: {
    question: string
    answers: {
      label: string
      tags: { key: string; value: string }[]
    }[]
  }[]
}
type SharedIdentifiyingTags = { identifyingTags?: { key: string; value: string }[] }

type SharedImageLicence = 'Public Domain' | 'CC-0'

type SharedImageSourceRemote = {
  kind: 'remote'
  sourceUrl: string
  licence: SharedImageLicence
}

type SharedImageSourceLocal = {
  kind: 'local'
  sourceLocalPath: string
  licence: SharedImageLicence
}

type SharedImage = {
  image: SharedImageSourceRemote | SharedImageSourceLocal
}

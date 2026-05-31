import type { Prettify } from '../types/types.js'
import type { GeometryType } from './geometryTypes.js'
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
    tagRecommendationsByGeometry: TagRecommendationsTrafficSign
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
      tagRecommendationsByGeometry: TagRecommendationsModifierSign
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

type SharedTaggingSuggestionsQa = {
  taggingSuggestionsQa?: TaggingSuggestionsQaStatus
}

type TagRecommendationsNone = 'none'

export type TagRecommendationTag = { key: string; value: string }

export type OptionalTagGuidance = {
  /** BCP-47 language of the guidance text (e.g. `de`, `en`). */
  lang?: string
  comment: string
  link?: string
}

/** Optional tags only, or tags plus decision guidance for the UI. */
export type OptionalTagsRecommendation =
  | TagRecommendationTag[]
  | {
      tags: TagRecommendationTag[]
      guidance?: OptionalTagGuidance
    }

export type OptionalTagsBySignEntry = {
  tags: Map<string, string | string[]>
  guidance?: OptionalTagGuidance
}

export type TagRecommendationsTrafficSignObject = {
  geometries: GeometryType[]
  highwayValues?: string[]
  accessTags?: TagRecommendationTag[]
  uniqueTags?: (
    | TagRecommendationTag
    | {
        key: string
        /** @description Format: `"FOO:"` will result in `"FOO:30"` for `signValue=30` */
        valueTemplate?: `${string}$` | `$${string}` | `${string}$${string}`
      }
  )[]
  /** Tags that may apply in some cases; shown separately in the UI (see issue #119). */
  optionalTags?: OptionalTagsRecommendation
  conditionalTags?: TagRecommendationTag[]
  comments?: SignComentType[]
}

export type TagRecommendationsModifierSignObject = {
  geometries: GeometryType[]
  highwayValues?: string[]
  accessTags?: TagRecommendationTag[]
  modifierValue?: string
  uniqueTags?: TagRecommendationTag[]
  optionalTags?: OptionalTagsRecommendation
  modifierValueFromValuePrompt?: boolean
  comments?: SignComentType[]
}

export type TagRecommendationByGeometry = TagRecommendationsTrafficSignObject
export type ModifierTagRecommendationByGeometry = TagRecommendationsModifierSignObject

export type TagRecommendationsTrafficSign =
  | TagRecommendationsNone
  | TagRecommendationsTrafficSignObject[]
export type TagRecommendationsModifierSign =
  | TagRecommendationsNone
  | TagRecommendationsModifierSignObject[]

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
export const QUESTION_NIL_ANSWER_ID = 'nil' as const

export type QuestionAnswerTag = TagRecommendationTag

export type QuestionAnswer = {
  answerId: string
  answerI18nKey: string
  /** OSM tags applied when this answer is selected (omit for nil / highway-only answers). */
  tags?: QuestionAnswerTag[]
  /** OSM tags removed when this answer is selected (e.g. implicit on chosen highway class). */
  removeTags?: QuestionAnswerTag[]
  /** When set, this answer selects a single `highway=*` value (used by highway-class questions). */
  highwayValue?: string
  /** Geometries where this answer applies. Falls back to question, then sign recommendations. */
  geometries?: GeometryType[]
  /** Optional external reference (e.g. OSM wiki) shown beside the answer label. */
  referenceUrl?: string
}

export type SignQuestion = {
  questionId: string
  questionI18nKey: string
  /** Suggested initial answer for tag output; user can always pick `nil`. */
  defaultAnswerId?: string | null
  /** When true, resolved answer replaces `highwayValues` from recommendations. */
  affectsHighway?: boolean
  /** Geometries where any answer applies. Falls back to sign recommendations. */
  geometries?: GeometryType[]
  answers: QuestionAnswer[]
}

/** Selected answers keyed by sign `osmValuePart`, then `questionId` → `answerId`. */
export type QuestionAnswersBySign = Record<string, Record<string, string>>

type SharedQuestions = {
  /**
   * Discrete tagging choices (sidepath, surface colour, highway class, …).
   * Use `valuePrompt` for free-form / numeric input instead.
   */
  questions?: SignQuestion[]
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

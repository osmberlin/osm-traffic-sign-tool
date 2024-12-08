import type { Prettify } from '../types/types.js'

export type SignStateType = Prettify<
  | (TrafficSignType & {
      recodgnizedSign: true
      matchdByAlternativeKey?: string
    })
  | (ModifierSignType & {
      recodgnizedSign: true
      matchdByAlternativeKey?: string
    })
  | (UnkownSignType & {
      recodgnizedSign: false
      matchdByAlternativeKey?: string
    })
>

export type SignType = TrafficSignType | ModifierSignType

export type UnkownSignType = {
  osmValuePart: string
  signId: null
  signValue: string
  kind: 'traffic_sign' | 'exception_modifier' | 'condition_modifier'
  descriptiveName: string
}

export type TrafficSignType = SharedId &
  SharedContent & {
    kind: 'traffic_sign'
    // maxspeed, maxweight
    signValue?: number
    valuePrompt?: ValuePrompt<'integer' | 'float'>
    tagRecommendations: {
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
  } & SharedComments &
  SharedQuestions &
  SharedCompatibility &
  SharedCatalogue<
    'traffic_sign' | 'object_sign' | 'surface_sign' | 'hazard_sign' | 'train_sign' | 'signpost'
  > &
  SharedIdentifiyingTags &
  SharedImage

export type ModifierSignType = Prettify<
  SharedId &
    SharedContent & {
      kind: 'exception_modifier' | 'condition_modifier'
      signValue?: string | number
      valuePrompt?:
        | ValuePrompt<'integer' | 'float'>
        | ValuePrompt<'opening_hours'>
        | ValuePrompt<'time_restriction'>
      tagRecommendations: {
        highwayValues?: string[]
        accessTags?: { key: string; value: string }[]
        modifierValue?: string
        uniqueTags?: { key: string; value: string }[]
        modifierValueFromValuePrompt?: boolean
      }
    } & SharedComments &
    SharedQuestions &
    SharedCompatibility &
    SharedCatalogue<'exception_modifier' | 'condition_modifier'> &
    SharedIdentifiyingTags &
    SharedImage
>

type SharedId = {
  osmValuePart: string
  signId: string
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
type SharedCatalogue<T> = {
  catalogue: {
    visibility?: 'highlight' | 'search_only'
    signCategory: T
  }
}
type ValuePrompt<T> = {
  prompt: string
  defaultValue: string
  format: T
}

export type SignComentType = {
  tagReference?: string | null
  important?: true | undefined
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

type SharedImage = {
  image: {
    sourceUrl: string
    licence: 'Public Domain'
  }
}

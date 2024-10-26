import type { Prettify } from './utils/types.js'

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
  kind: 'traffic_sign' | 'modifier_sign'
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
      uniqueTags?: { key: string; value: string }[]
      conditionalTags?: { key: string; value: string }[]
    }
  } & SharedComments &
  SharedQuestions &
  SharedCatalogue<'traffic_sign'> &
  SharedIdentifiyingTags &
  SharedImage

export type ModifierSignType = SharedId &
  SharedContent & {
    kind: 'modifier_sign'
    signValue?: string | number
    valuePrompt?:
      | ValuePrompt<'integer' | 'float'>
      | ValuePrompt<'opening_hours'>
      | ValuePrompt<'time_restriction'>
    tagRecommendations: {
      highwayValues?: string[]
      accessTags?: { key: string; value: string }[]
      accessValue?: string
      uniqueTags?: { key: string; value: string }[]
      conditionalValue?: string
      conditionalValueFromValuePrompt?: boolean
    }
  } & SharedComments &
  SharedQuestions &
  SharedCatalogue<'modifier_sign' | 'modifier_sign_restriction'> &
  SharedIdentifiyingTags &
  SharedImage

type SharedId = {
  osmValuePart: string
  signId: string
}
type SharedContent = {
  name: string
  descriptiveName: string
  description: string | null
}
type SharedCatalogue<T> = {
  catalogue: {
    mostUsed?: true
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

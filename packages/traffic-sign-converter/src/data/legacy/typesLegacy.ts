import type { Prettify } from '../utils/types.js'

export type LegacyTrafficSignState = Prettify<
  (
    | (LegacyTrafficSignDataType & {
        recodgnizedSign: true
        matchdByAlternativeKey?: string
      })
    | (LegacyUnkownTrafficSignType & {
        recodgnizedSign: false
        matchdByAlternativeKey?: string
      })
  ) & { key: string }
>

export type LegacyTrafficSignDataType = Prettify<
  Base &
    (TrafficSignCategoryTrafficSign | TrafficSignCategoryModifier) &
    TrafficSignKeyValue &
    TagsAndValidations &
    Image &
    TrafficSignToOsm
>

export type LegacyUnkownTrafficSignType = {
  osmValuePart: string
  signId: null
  signValue: string
  category: 'traffic_sign' | 'modifier_sign'
}

type Base = {
  /** @desc 123[5.5] — The value that is used in OSM but without the country prefix */
  osmValuePart: string
  /** @desc 123 — The official (or unofficial) sign key without the value part  */
  signId: string
  /** @desc 5.5 — For signs that have `valuePrompt`, this is the value given by the URL */
  signValue: string | null
  name: string
  descriptiveName: string | null
  description: string | null
  mostUsed?: true
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

type TrafficSignToOsm = {
  identifyingTags?: Record<string, string>
}

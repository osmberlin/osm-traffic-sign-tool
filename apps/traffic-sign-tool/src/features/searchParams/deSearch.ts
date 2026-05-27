import {
  CountryPrefixType,
  focusAreas,
  type FocusArea,
  SignStateType,
  signsToTrafficSignTagValue,
  taggingSuggestionsQaFilters,
  type TaggingSuggestionsQaFilter,
  trafficSignTagToSigns,
} from '@osm-traffic-signs/converter'
import { z } from 'zod'

export const combinationQaFilters = ['actionable', 'blocked', 'all'] as const
export type CombinationQaFilter = (typeof combinationQaFilters)[number]

export const deSearchSchema = z.object({
  // routerSearch uses JSON.parse on param values; bare numbers (e.g. q=241) become number
  q: z.coerce.string().optional(),
  signs: z.string().optional(),
  focus: z.string().optional(),
  qa: z.enum(taggingSuggestionsQaFilters).optional(),
  comb: z.enum(combinationQaFilters).optional(),
  /** Selected primary sign `osmValuePart` on check-sign-combinations */
  primary: z.coerce.string().optional(),
})

export { taggingSuggestionsQaFilters, type TaggingSuggestionsQaFilter }
export { focusAreas, type FocusArea }

const focusAreaSet = new Set<string>(focusAreas)

const parseEnumParam = <const T extends readonly string[]>(
  value: string | undefined,
  allowed: T,
  fallback: T[number],
): T[number] =>
  value && (allowed as readonly string[]).includes(value) ? (value as T[number]) : fallback

const serializeEnumParam = <T extends string>(value: T, defaultValue: T): T | undefined =>
  value === defaultValue ? undefined : value

export const parseFocusParam = (value: string | undefined): FocusArea[] => {
  if (!value) {
    return []
  }

  const parsed = value
    .split(',')
    .map((part) => part.trim())
    .filter((part): part is FocusArea => focusAreaSet.has(part))

  return [...new Set(parsed)]
}

export const serializeFocusParam = (focuses: FocusArea[]): string | undefined => {
  if (focuses.length === 0) {
    return undefined
  }

  const sorted = [...new Set(focuses)].sort()
  return sorted.join(',')
}

export const parseTaggingQaParam = (value?: string) =>
  parseEnumParam(value, taggingSuggestionsQaFilters, 'all')

export const serializeTaggingQaParam = (filter: TaggingSuggestionsQaFilter) =>
  serializeEnumParam(filter, 'all')

export const parseCombinationQaParam = (value?: string) =>
  parseEnumParam(value, combinationQaFilters, 'actionable')

export const serializeCombinationQaParam = (filter: CombinationQaFilter) =>
  serializeEnumParam(filter, 'actionable')

export type DeSearchSchema = z.infer<typeof deSearchSchema>

export const parseSignsParam = (
  input: string | undefined,
  countryPrefix: CountryPrefixType | undefined,
): SignStateType[] => {
  if (!input) {
    return []
  }

  const migratedInput = input.replaceAll('|', ';')
  return trafficSignTagToSigns(migratedInput, countryPrefix) satisfies SignStateType[]
}

export const serializeSignsParam = (
  trafficSigns: SignStateType[],
  countryPrefix: CountryPrefixType | undefined,
) => {
  const serialized = signsToTrafficSignTagValue(trafficSigns, countryPrefix)
  return serialized || undefined
}

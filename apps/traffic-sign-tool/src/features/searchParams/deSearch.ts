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

export const deSearchSchema = z.object({
  // routerSearch uses JSON.parse on param values; bare numbers (e.g. q=241) become number
  q: z.coerce.string().optional(),
  signs: z.string().optional(),
  focus: z.string().optional(),
  qa: z.enum(taggingSuggestionsQaFilters).optional(),
})

export { taggingSuggestionsQaFilters, type TaggingSuggestionsQaFilter }

export { focusAreas, type FocusArea }

const focusAreaSet = new Set<string>(focusAreas)

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

export const parseTaggingQaParam = (
  value: string | undefined,
): TaggingSuggestionsQaFilter => {
  if (!value) {
    return 'all'
  }

  if (taggingSuggestionsQaFilters.includes(value as TaggingSuggestionsQaFilter)) {
    return value as TaggingSuggestionsQaFilter
  }

  return 'all'
}

export const serializeTaggingQaParam = (
  filter: TaggingSuggestionsQaFilter,
): TaggingSuggestionsQaFilter | undefined => {
  if (filter === 'all') {
    return undefined
  }

  return filter
}

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

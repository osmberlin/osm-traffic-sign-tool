import {
  CountryPrefixType,
  SignStateType,
  signsToTrafficSignTagValue,
  trafficSignTagToSigns,
} from '@osm-traffic-signs/converter'
import { z } from 'zod'

export const deSearchSchema = z.object({
  // routerSearch uses JSON.parse on param values; bare numbers (e.g. q=241) become number
  q: z.coerce.string().optional(),
  signs: z.string().optional(),
})

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

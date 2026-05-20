import {
  CountryPrefixType,
  SignStateType,
  signsToTrafficSignTagValue,
  trafficSignTagToSigns,
} from '@osm-traffic-signs/converter'
import { z } from 'zod'

export const deSearchSchema = z.object({
  q: z.string().optional(),
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

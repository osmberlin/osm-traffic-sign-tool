'use client'
import { CountryPrefixSchema } from '@osm-traffic-signs/converter'
import { useParams } from 'next/navigation'

export const useCountryPrefixOptional = () => {
  const countryPrefix = useParams()?.countryPrefix
  const zod = CountryPrefixSchema.safeParse(countryPrefix)
  if (zod.success) {
    return zod.data
  }
  return undefined
}

export const useCountryPrefix = () => {
  const countryPrefix = useParams()?.countryPrefix
  return CountryPrefixSchema.parse(countryPrefix)
}

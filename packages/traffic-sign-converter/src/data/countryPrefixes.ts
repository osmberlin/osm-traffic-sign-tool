import { z } from 'zod'

export const countryPrefixes = ['DE'] as const

export type CountryPrefixType = (typeof countryPrefixes)[number]

export const CountryPrefixSchema = z.enum(countryPrefixes)

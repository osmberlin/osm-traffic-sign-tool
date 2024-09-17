import { z } from 'zod'

const trafficSignCategories = [
  'traffic_sign',
  'modifier_sign',
  'modifier_sign_restriction',
] as const

const trafficSignImageLicences = ['Public Domain'] as const

// We are using `strictObject` (which is the same as `object().strict()`) so the parser throws when the format does not match strictly
export const trafficSignSchema = z.strictObject({
  key: z.string(),
  name: z.string(),
  descriptiveName: z.string().nullable(),
  description: z.string().nullable(),
  osmTags: z.record(z.string(), z.string()),
  impliedKey: z.string(),
  identifyingTags: z.record(z.string(), z.string()),
  category: z.enum(trafficSignCategories),
  tags: z.array(z.string()),
  image: z.strictObject({
    svgPath: z.string(),
    sourceUrl: z.string().url(),
    licence: z.enum(trafficSignImageLicences),
  }),
})

export const trafficSignsSchema = z.array(trafficSignSchema)

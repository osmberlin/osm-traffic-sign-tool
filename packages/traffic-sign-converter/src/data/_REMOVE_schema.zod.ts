import { z } from 'zod'

const trafficSignCategories = [
  'traffic_sign',
  'modifier_sign',
  'modifier_sign_restriction',
] as const

const trafficSignImageLicences = ['Public Domain'] as const

// We are using `strictObject` (which is the same as `object().strict()`) so the parser throws when the format does not match strictly
export const trafficSignSchema = z.strictObject({
  osmValuePart: z.string(),
  signId: z.string(),
  signValue: z.string().nullable(),
  name: z.string(),
  descriptiveName: z.string().nullable(),
  description: z.string().nullable(),
  restrictionKeys: z.array(z.string()).optional(),
  restrictionValue: z.string().optional(),
  osmTags: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
  key: z.string().optional(),
  value: z.string().optional(),
  validations: z
    .object({
      requiredKey: z.string(),
      shouldBeHighwayValue: z.string().optional(),
    })
    .optional(),
  // TODO data: what does `conditional` do?
  conditional: z.literal(true).optional(),
  // TODO zod: Make valuePrompt required when signValue is present
  valuePrompt: z
    .object({
      prompt: z.string(),
      defaultValue: z.string(),
      format: z.enum(['float', 'integer', 'time_restriction', 'opening_hours']),
    })
    .optional(),
  impliedKey: z.string().optional(),
  tagsComment: z.string().optional(),
  mostUsed: z.union([z.literal(true), z.undefined()]),
  category: z.enum(trafficSignCategories),
  tags: z.array(z.string()).optional(),
  image: z.strictObject({
    svgPath: z.string(),
    sourceUrl: z.string().url(),
    licence: z.enum(trafficSignImageLicences),
  }),
  identifyingTags: z.record(z.string(), z.string()).optional(),
})

export type TrafficSignType = z.infer<typeof trafficSignSchema>

export const trafficSignsSchema = z.array(trafficSignSchema)

import { trafficSignsSchema } from './schema.zod.js'

export const parseTrafficSigns = (input: Object) => {
  return trafficSignsSchema.parse(input)
}

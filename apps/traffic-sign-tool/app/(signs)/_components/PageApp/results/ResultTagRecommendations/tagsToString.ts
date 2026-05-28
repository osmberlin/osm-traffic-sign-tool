import { toTag } from '@osm-traffic-signs/converter'

export const tagsToString = (tags: Map<string, string | string[]>) => {
  return Array.from(tags)
    .map(([key, value]) =>
      toTag({
        key,
        value: Array.isArray(value) ? value.join(';') : value,
      }),
    )
    .join('\n')
}

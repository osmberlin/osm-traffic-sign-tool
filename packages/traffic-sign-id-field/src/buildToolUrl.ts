import type { CountryPrefixType } from '@osm-traffic-signs/converter'

const TOOL_ORIGIN = 'https://trafficsigns.osm-verkehrswende.org'

type BuildToolUrlOptions = {
  countryPrefix: CountryPrefixType
  tagValue: string
}

export const buildToolUrl = ({ countryPrefix, tagValue }: BuildToolUrlOptions) => {
  const trimmed = tagValue.trim()
  if (!trimmed) {
    return `${TOOL_ORIGIN}/${countryPrefix}`
  }

  const params = new URLSearchParams({ signs: trimmed })
  return `${TOOL_ORIGIN}/${countryPrefix}?${params.toString()}`
}

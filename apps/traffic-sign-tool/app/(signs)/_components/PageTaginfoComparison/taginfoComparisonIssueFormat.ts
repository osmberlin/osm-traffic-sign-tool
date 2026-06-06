import {
  GEOMETRY_TYPES,
  signsToComments,
  signsToTags,
  trafficSignTagToSigns,
  type CountryPrefixType,
  type SignComentType,
} from '@osm-traffic-signs/converter'

const GITHUB_REPO = 'osmberlin/osm-traffic-sign-tool'

export const buildTaginfoToolRecommendations = (
  value: string,
  countryPrefix: CountryPrefixType,
) => {
  const signs = trafficSignTagToSigns(value, countryPrefix)
  const byGeometry: Record<
    string,
    { tags: Record<string, string | string[]>; comments: Record<string, SignComentType[]> }
  > = {}

  for (const geometry of GEOMETRY_TYPES) {
    const geometries = geometry === 'way' ? (['way', 'way_centerline'] as const) : [geometry]
    const tags: Record<string, string | string[]> = {}

    for (const currentGeometry of geometries) {
      for (const [tagKey, tagValue] of signsToTags(signs, countryPrefix, currentGeometry)) {
        tags[tagKey] = tagValue
      }
    }

    const comments = Object.fromEntries(signsToComments(signs, geometry))
    if (Object.keys(tags).length > 0 || Object.keys(comments).length > 0) {
      byGeometry[geometry] = { tags, comments }
    }
  }

  return byGeometry
}

export const formatTaginfoSignIssueBody = (
  value: string,
  usageCount: number,
  countryPrefix: CountryPrefixType,
): string => {
  const recommendations = buildTaginfoToolRecommendations(value, countryPrefix)

  return [
    `## My feedback for traffic_sign value ${value}`,
    '',
    'WRITE HERE',
    '',
    '## Taginfo usage',
    '',
    `${usageCount.toLocaleString()} objects in OSM (snapshot)`,
    '',
    '## Tool tag recommendations',
    '',
    '```',
    JSON.stringify(recommendations, null, 2),
    '```',
    '',
    '---',
    '',
  ].join('\n')
}

export const buildTaginfoSignGithubIssueUrl = (
  value: string,
  usageCount: number,
  countryPrefix: CountryPrefixType,
): string => {
  const title = `Taginfo comparison feedback: ${value}`
  const body = formatTaginfoSignIssueBody(value, usageCount, countryPrefix)
  const params = new URLSearchParams({ title, body })

  return `https://github.com/${GITHUB_REPO}/issues/new?${params.toString()}`
}

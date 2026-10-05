import {
  GEOMETRY_TYPES,
  signsToComments,
  signsToTags,
  trafficSignTagToSigns,
  type CountryPrefixType,
  type SignComentType,
} from '@osm-traffic-signs/converter'
import { type QaDeployContext, getQaDeployContext } from '../qaDeployContext'
import { QA_FEEDBACK_PLACEHOLDER, buildQaIssueUrl, formatQaIssueHeader } from '../qaIssue'

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
  deployContext: QaDeployContext = getQaDeployContext(),
): string => {
  const recommendations = buildTaginfoToolRecommendations(value, countryPrefix)

  return [
    ...formatQaIssueHeader('taginfo-qa', countryPrefix, deployContext),
    `## Feedback for traffic_sign value ${value}`,
    '',
    QA_FEEDBACK_PLACEHOLDER,
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
): string =>
  buildQaIssueUrl('taginfo-qa', value, formatTaginfoSignIssueBody(value, usageCount, countryPrefix))

import {
  GEOMETRY_TYPES,
  signsToComments,
  signsToTags,
  trafficSignTagToSigns,
  type CountryPrefixType,
  type SignComentType,
} from '@osm-traffic-signs/converter'
import {
  type QaDeployContext,
  formatQaDeployContextLines,
  getQaDeployContext,
  githubBlobUrl,
} from '../qaDeployContext'
import { QA_ISSUE_ATTRIBUTION_BANNER } from '../qaIssueAttribution'

const GITHUB_REPO = 'osmberlin/osm-traffic-sign-tool'
export const TAGINFO_QA_AGENT_SKILL_PATH = '.cursor/skills/add-traffic-sign/SKILL.md'
export const TAGINFO_QA_ISSUE_TEMPLATE = 'taginfo-qa-catalogue-update.md'

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

const formatAgentBrief = (
  countryPrefix: CountryPrefixType,
  deployContext: QaDeployContext,
): string[] => [
  '# Taginfo comparison – catalogue update',
  '',
  QA_ISSUE_ATTRIBUTION_BANNER,
  '',
  ...formatQaDeployContextLines(deployContext),
  '',
  `Created from the [Taginfo comparison page](${deployContext.pageOrigin}/${countryPrefix}/taginfo).`,
  '',
  'Submit with label `cursor-qa` to trigger a Cursor cloud agent via GitHub Actions. The agent should **open a PR** that updates sign config in `@osm-traffic-signs/converter`.',
  '',
  '## Agent instructions',
  '',
  '1. Apply the feedback in **My feedback** below using taginfo usage and tool recommendations as context.',
  `2. Read [\`${TAGINFO_QA_AGENT_SKILL_PATH}\`](${githubBlobUrl(TAGINFO_QA_AGENT_SKILL_PATH, deployContext)}) for \`tagRecommendationsByGeometry\` shape and OSM wiki tagging research.`,
  `3. Edit signs under \`packages/traffic-sign-converter/src/data-definitions/${countryPrefix}/\`.`,
  '4. Run tests in `packages/traffic-sign-converter`. Open a PR whose description includes `Closes #<issue-number>` (auto-closes this issue on merge).',
  '',
]

export const formatTaginfoSignIssueBody = (
  value: string,
  usageCount: number,
  countryPrefix: CountryPrefixType,
  deployContext: QaDeployContext = getQaDeployContext(),
): string => {
  const recommendations = buildTaginfoToolRecommendations(value, countryPrefix)

  return [
    ...formatAgentBrief(countryPrefix, deployContext),
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
  const params = new URLSearchParams({
    template: TAGINFO_QA_ISSUE_TEMPLATE,
    title,
    body,
  })

  return `https://github.com/${GITHUB_REPO}/issues/new?${params.toString()}`
}

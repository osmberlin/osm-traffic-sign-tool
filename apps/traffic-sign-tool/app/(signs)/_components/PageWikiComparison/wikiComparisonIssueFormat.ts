import type { WikiSign } from '@internal/wiki'
import type { SignStateType } from '@osm-traffic-signs/converter'
import { QA_ISSUE_ATTRIBUTION_BANNER } from '../qaIssueAttribution'

const GITHUB_REPO = 'osmberlin/osm-traffic-sign-tool'
export const WIKI_QA_AGENT_SKILL_PATH = '.cursor/skills/add-traffic-sign/SKILL.md'
export const WIKI_QA_ISSUE_TEMPLATE = 'wiki-qa-catalogue-update.md'

const countryPrefixFromSign = (sign: WikiSign): string =>
  sign.sign.includes(':') ? sign.sign.split(':')[0]! : sign.sign

const formatCurrentConfig = (sign: WikiSign, toolSign?: SignStateType): string => {
  if (toolSign?.recodgnizedSign) {
    return JSON.stringify(toolSign, null, 2)
  }

  const { imageSvg: _, ...wikiData } = sign
  return JSON.stringify(wikiData, null, 2)
}

const formatAgentBrief = (sign: WikiSign): string[] => {
  const countryPrefix = countryPrefixFromSign(sign)

  return [
    '# Wiki comparison – catalogue update',
    '',
    QA_ISSUE_ATTRIBUTION_BANNER,
    '',
    `Created from the [Wiki comparison page](https://trafficsigns.osm-verkehrswende.org/${countryPrefix}/wiki).`,
    '',
    'Submit with label `cursor-qa` to trigger a Cursor cloud agent via GitHub Actions. The agent should **open a PR** that updates sign config in `@osm-traffic-signs/converter`.',
    '',
    '## Agent instructions',
    '',
    '1. Apply the feedback in **My feedback** below using the current config as context.',
    `2. Read [\`${WIKI_QA_AGENT_SKILL_PATH}\`](https://github.com/osmberlin/osm-traffic-sign-tool/blob/main/${WIKI_QA_AGENT_SKILL_PATH}) for sign config shape and OSM wiki research.`,
    `3. Edit signs under \`packages/traffic-sign-converter/src/data-definitions/${countryPrefix}/\`.`,
    '4. Run tests in `packages/traffic-sign-converter`. Open a PR whose description includes `Closes #<issue-number>` (auto-closes this issue on merge).',
    '',
  ]
}

export const formatWikiSignIssueBody = (sign: WikiSign, toolSign?: SignStateType): string => {
  const config = formatCurrentConfig(sign, toolSign)

  return [
    ...formatAgentBrief(sign),
    `## My feedback for Sign ${sign.sign}`,
    '',
    'WRITE HERE',
    '',
    '## Current Config',
    '',
    '```',
    config,
    '```',
    '',
    '---',
    '',
  ].join('\n')
}

export const buildWikiSignGithubIssueUrl = (sign: WikiSign, toolSign?: SignStateType): string => {
  const title = `Wiki comparison feedback: ${sign.sign}`
  const body = formatWikiSignIssueBody(sign, toolSign)
  const params = new URLSearchParams({
    template: WIKI_QA_ISSUE_TEMPLATE,
    title,
    body,
  })

  return `https://github.com/${GITHUB_REPO}/issues/new?${params.toString()}`
}

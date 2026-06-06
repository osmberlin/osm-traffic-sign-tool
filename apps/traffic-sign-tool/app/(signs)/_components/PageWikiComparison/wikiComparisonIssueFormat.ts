import type { WikiSign } from '@internal/wiki'
import type { SignStateType } from '@osm-traffic-signs/converter'

const GITHUB_REPO = 'osmberlin/osm-traffic-sign-tool'

const formatCurrentConfig = (sign: WikiSign, toolSign?: SignStateType): string => {
  if (toolSign?.recodgnizedSign) {
    return JSON.stringify(toolSign, null, 2)
  }

  const { imageSvg: _, ...wikiData } = sign
  return JSON.stringify(wikiData, null, 2)
}

export const formatWikiSignIssueBody = (sign: WikiSign, toolSign?: SignStateType): string => {
  const config = formatCurrentConfig(sign, toolSign)

  return [
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
  const params = new URLSearchParams({ title, body })

  return `https://github.com/${GITHUB_REPO}/issues/new?${params.toString()}`
}

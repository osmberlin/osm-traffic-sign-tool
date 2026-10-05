import type { WikiSign } from '@internal/wiki'
import type { SignStateType } from '@osm-traffic-signs/converter'
import { type QaDeployContext, getQaDeployContext } from '../qaDeployContext'
import { QA_FEEDBACK_PLACEHOLDER, buildQaIssueUrl, formatQaIssueHeader } from '../qaIssue'

const countryPrefixFromSign = (sign: WikiSign): string =>
  sign.sign.includes(':') ? sign.sign.split(':')[0]! : sign.sign

const formatCurrentConfig = (sign: WikiSign, toolSign?: SignStateType): string => {
  if (toolSign?.recodgnizedSign) {
    return JSON.stringify(toolSign, null, 2)
  }

  const { imageSvg: _, ...wikiData } = sign
  return JSON.stringify(wikiData, null, 2)
}

export const formatWikiSignIssueBody = (
  sign: WikiSign,
  toolSign?: SignStateType,
  deployContext: QaDeployContext = getQaDeployContext(),
): string => {
  const config = formatCurrentConfig(sign, toolSign)

  return [
    ...formatQaIssueHeader('wiki-qa', countryPrefixFromSign(sign), deployContext),
    `## Feedback for sign ${sign.sign}`,
    '',
    QA_FEEDBACK_PLACEHOLDER,
    '',
    '## Current config',
    '',
    '```',
    config,
    '```',
    '',
    '---',
    '',
  ].join('\n')
}

export const buildWikiSignGithubIssueUrl = (sign: WikiSign, toolSign?: SignStateType): string =>
  buildQaIssueUrl('wiki-qa', sign.sign, formatWikiSignIssueBody(sign, toolSign))

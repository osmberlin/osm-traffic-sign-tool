import { describe, expect, test } from 'vitest'
import type { QaDeployContext } from '../qaDeployContext'
import {
  buildTaginfoSignGithubIssueUrl,
  formatTaginfoSignIssueBody,
  TAGINFO_QA_AGENT_SKILL_PATH,
  TAGINFO_QA_ISSUE_TEMPLATE,
} from './taginfoComparisonIssueFormat'

const previewDeployContext: QaDeployContext = {
  branch: 'feat/qa-preview',
  pageOrigin: 'https://deploy-preview-42--site.netlify.app',
  isNetlify: true,
  deployContext: 'deploy-preview',
}

describe('taginfoComparisonIssueFormat', () => {
  test('formatTaginfoSignIssueBody', () => {
    const body = formatTaginfoSignIssueBody('DE:240', 1234, 'DE')

    expect(body).toContain('# Taginfo comparison – catalogue update')
    expect(body).toContain('> **You** — submitted feedback from the QA page')
    expect(body).toContain('label `cursor-qa`')
    expect(body).toContain(TAGINFO_QA_AGENT_SKILL_PATH)
    expect(body).toContain('## Agent instructions')
    expect(body).toContain('## My feedback for traffic_sign value DE:240')
    expect(body).toContain('WRITE HERE')
    expect(body).toContain('## Taginfo usage')
    expect(body).toContain('1,234 objects in OSM (snapshot)')
    expect(body).toContain('## Tool tag recommendations')
    expect(body).toContain('---')
  })

  test('formatTaginfoSignIssueBody includes deploy context on preview branch', () => {
    const body = formatTaginfoSignIssueBody('DE:240', 1234, 'DE', previewDeployContext)

    expect(body).toContain('**Source branch:** `feat/qa-preview`')
    expect(body).toContain('blob/feat/qa-preview/.cursor/skills/add-traffic-sign/SKILL.md')
  })

  test('buildTaginfoSignGithubIssueUrl', () => {
    const url = buildTaginfoSignGithubIssueUrl('DE:240', 1234, 'DE')

    expect(url).toContain('github.com/osmberlin/osm-traffic-sign-tool/issues/new')
    expect(url).toContain(`template=${TAGINFO_QA_ISSUE_TEMPLATE}`)
    expect(url).toContain('title=Taginfo+comparison+feedback%3A+DE%3A240')
  })
})

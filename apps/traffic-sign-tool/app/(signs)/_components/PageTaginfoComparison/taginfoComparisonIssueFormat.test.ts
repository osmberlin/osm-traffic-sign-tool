import { describe, expect, test } from 'vitest'
import {
  buildTaginfoSignGithubIssueUrl,
  formatTaginfoSignIssueBody,
  TAGINFO_QA_AGENT_SKILL_PATH,
  TAGINFO_QA_ISSUE_TEMPLATE,
} from './taginfoComparisonIssueFormat'

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

  test('buildTaginfoSignGithubIssueUrl', () => {
    const url = buildTaginfoSignGithubIssueUrl('DE:240', 1234, 'DE')

    expect(url).toContain('github.com/osmberlin/osm-traffic-sign-tool/issues/new')
    expect(url).toContain(`template=${TAGINFO_QA_ISSUE_TEMPLATE}`)
    expect(url).toContain('title=Taginfo+comparison+feedback%3A+DE%3A240')
  })
})

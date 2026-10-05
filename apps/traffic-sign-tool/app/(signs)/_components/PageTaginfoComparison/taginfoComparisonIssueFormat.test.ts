import { describe, expect, test } from 'vitest'
import type { QaDeployContext } from '../qaDeployContext'
import {
  buildTaginfoSignGithubIssueUrl,
  formatTaginfoSignIssueBody,
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

    expect(body).toContain('Taginfo comparison page')
    expect(body).toContain('**Kind:** `taginfo-qa`')
    expect(body).toContain('.agents/skills/add-traffic-sign/SKILL.md')
    expect(body).toContain('## For the agent')
    expect(body).toContain('## Feedback for traffic_sign value DE:240')
    expect(body).toContain('WRITE HERE')
    expect(body).toContain('## Taginfo usage')
    expect(body).toContain('1,234 objects in OSM (snapshot)')
    expect(body).toContain('## Tool tag recommendations')
    expect(body).toContain('---')
  })

  test('formatTaginfoSignIssueBody includes deploy context on preview branch', () => {
    const body = formatTaginfoSignIssueBody('DE:240', 1234, 'DE', previewDeployContext)

    expect(body).toContain('**Source branch:** `feat/qa-preview`')
    expect(body).toContain('blob/feat/qa-preview/.agents/skills/add-traffic-sign/SKILL.md')
  })

  test('buildTaginfoSignGithubIssueUrl', () => {
    const url = buildTaginfoSignGithubIssueUrl('DE:240', 1234, 'DE')

    expect(url).toContain('github.com/osmberlin/osm-traffic-sign-tool/issues/new')
    expect(url).toContain('template=taginfo-qa-catalogue-update.md')
    expect(new URL(url).searchParams.get('title')).toBe('[taginfo-qa] DE:240')
  })
})

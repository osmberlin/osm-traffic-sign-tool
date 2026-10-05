import { describe, expect, test } from 'vitest'
import type { QaDeployContext } from '../qaDeployContext'
import { buildWikiSignGithubIssueUrl, formatWikiSignIssueBody } from './wikiComparisonIssueFormat'

const previewDeployContext: QaDeployContext = {
  branch: 'feat/qa-preview',
  pageOrigin: 'https://deploy-preview-42--site.netlify.app',
  isNetlify: true,
  deployContext: 'deploy-preview',
}

describe('wikiComparisonIssueFormat', () => {
  const wikiSign = {
    sign: 'BR:R-1',
    name: 'Example sign',
    osmTags: ['highway=stop'],
    comments: '',
  }

  test('formatWikiSignIssueBody', () => {
    const body = formatWikiSignIssueBody(wikiSign)

    expect(body).toContain('Wiki comparison page')
    expect(body).toContain('**Kind:** `wiki-qa`')
    expect(body).toContain('**Catalogue:** `BR`')
    expect(body).toContain('.agents/skills/add-traffic-sign/SKILL.md')
    expect(body).toContain('## For the agent')
    expect(body).toContain('/BR/wiki')
    expect(body).toContain('## Feedback for sign BR:R-1')
    expect(body).toContain('WRITE HERE')
    expect(body).toContain('## Current config')
    expect(body).toContain('"sign": "BR:R-1"')
    expect(body).toContain('---')
  })

  test('formatWikiSignIssueBody includes deploy context on preview branch', () => {
    const body = formatWikiSignIssueBody(wikiSign, undefined, previewDeployContext)

    expect(body).toContain('**Source branch:** `feat/qa-preview`')
    expect(body).toContain('blob/feat/qa-preview/.agents/skills/add-traffic-sign/SKILL.md')
  })

  test('formatWikiSignIssueBody uses catalogue config when available', () => {
    const body = formatWikiSignIssueBody(wikiSign, {
      osmValuePart: 'R-1',
      signId: 'br-r-1',
      descriptiveName: 'Stop',
      recodgnizedSign: true,
      svgName: 'br_r_1',
    } as never)

    expect(body).toContain('"signId": "br-r-1"')
    expect(body).not.toContain('"osmTags"')
  })

  test('buildWikiSignGithubIssueUrl', () => {
    const url = buildWikiSignGithubIssueUrl(wikiSign)

    expect(url).toContain('github.com/osmberlin/osm-traffic-sign-tool/issues/new')
    expect(url).toContain('template=wiki-qa-catalogue-update.md')
    expect(new URL(url).searchParams.get('title')).toBe('[wiki-qa] BR:R-1')
  })
})

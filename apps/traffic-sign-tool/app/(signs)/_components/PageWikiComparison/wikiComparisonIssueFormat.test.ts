import { describe, expect, test } from 'vitest'
import { buildWikiSignGithubIssueUrl, formatWikiSignIssueBody } from './wikiComparisonIssueFormat'

describe('wikiComparisonIssueFormat', () => {
  const wikiSign = {
    sign: 'BR:R-1',
    name: 'Example sign',
    osmTags: ['highway=stop'],
    comments: '',
  }

  test('formatWikiSignIssueBody', () => {
    const body = formatWikiSignIssueBody(wikiSign)

    expect(body).toContain('## My feedback for Sign BR:R-1')
    expect(body).toContain('WRITE HERE')
    expect(body).toContain('## Current Config')
    expect(body).toContain('"sign": "BR:R-1"')
    expect(body).toContain('---')
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
    expect(url).toContain('title=Wiki+comparison+feedback%3A+BR%3AR-1')
  })
})

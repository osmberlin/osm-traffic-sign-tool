import type { SignType } from '@osm-traffic-signs/converter'
import { describe, expect, test } from 'vitest'
import {
  buildGithubIssueUrl,
  collectSignTaskEntries,
  formatTaggingQaTaskResults,
} from './taggingQaTaskFormat'

const baseSign = {
  osmValuePart: '274',
  signId: '274',
  name: 'Zeichen 274',
  descriptiveName: 'Höchstgeschwindigkeit',
  description: null,
  kind: 'traffic_sign' as const,
  tagRecommendationsByGeometry: [{ geometries: ['way'] }],
  catalogue: { signCategory: 'speed' as const },
  image: {
    kind: 'remote' as const,
    sourceUrl: 'https://example.com',
    licence: 'Public Domain' as const,
  },
} satisfies SignType

describe('taggingQaTaskFormat', () => {
  test('collectSignTaskEntries and format', () => {
    const tasks = new Map([
      ['274', { taskType: 'explicit_none' as const, suggestionNotes: 'Decorative sign only' }],
      ['999', { taskType: 'add_suggestions' as const, suggestionNotes: '{ "uniqueTags": [] }' }],
      ['111', { taskType: 'comment' as const, suggestionNotes: 'Unclear wiki mapping' }],
    ])

    const signs: SignType[] = [
      baseSign,
      { ...baseSign, osmValuePart: '999', signId: '999', descriptiveName: 'Test' },
      { ...baseSign, osmValuePart: '111', signId: '111', descriptiveName: 'Comment sign' },
    ]

    const entries = collectSignTaskEntries(signs, tasks)
    expect(entries).toHaveLength(3)

    const text = formatTaggingQaTaskResults(entries)
    expect(text).toContain('Human (issue submitter)')
    expect(text).toContain('Machine-generated')
    expect(text).toContain('[Cursor Agent]')
    expect(text).toContain('catalogue config update')
    expect(text).toContain('open a PR')
    expect(text).toContain('Closes #<issue-number>')
    expect(text).toContain('.cursor/skills/add-traffic-sign/SKILL.md')
    expect(text).toContain('TrafficSignDataTypes.ts')
    expect(text).toContain('explicit no tagging suggestions')
    expect(text).toContain('signId `274`')
    expect(text).toContain('Decorative sign only')
    expect(text).toContain('Add tagging suggestions')
    expect(text).toContain('uniqueTags')
    expect(text).toContain('### Comments')
    expect(text).toContain('Unclear wiki mapping')
  })

  test('buildGithubIssueUrl', () => {
    const url = buildGithubIssueUrl([
      {
        osmValuePart: '274',
        signId: '274',
        descriptiveName: 'Höchstgeschwindigkeit',
        task: 'explicit_none',
      },
    ])
    expect(url).toContain('github.com/osmberlin/osm-traffic-sign-tool/issues/new')
    expect(url).toContain('template=tagging-qa-catalogue-update.md')
    expect(url).toContain('title=')
    expect(url).toContain('body=')
  })
})

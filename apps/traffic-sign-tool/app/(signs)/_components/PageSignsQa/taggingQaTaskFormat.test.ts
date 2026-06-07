import type { SignType } from '@osm-traffic-signs/converter'
import { describe, expect, test } from 'vitest'
import type { QaDeployContext } from '../qaDeployContext'
import {
  buildGithubIssueUrl,
  collectSignTaskEntries,
  formatTaggingQaTaskResults,
} from './taggingQaTaskFormat'

const previewDeployContext: QaDeployContext = {
  branch: 'feat/qa-preview',
  pageOrigin: 'https://deploy-preview-42--site.netlify.app',
  isNetlify: true,
  deployContext: 'deploy-preview',
}

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
    expect(text).toContain('**You**')
    expect(text).toContain('Traffic Sign Tool')
    expect(text).toContain('Cursor agent')
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

  test('formatTaggingQaTaskResults includes deploy context on preview branch', () => {
    const entries = [
      {
        osmValuePart: '274',
        signId: '274',
        descriptiveName: 'Höchstgeschwindigkeit',
        task: 'explicit_none' as const,
      },
    ]
    const text = formatTaggingQaTaskResults(entries, 'DE', previewDeployContext)

    expect(text).toContain('**Source branch:** `feat/qa-preview`')
    expect(text).toContain('blob/feat/qa-preview/.cursor/skills/add-traffic-sign/SKILL.md')
    expect(text).toContain('deploy-preview-42--site.netlify.app/DE/signs-qa')
  })

  test('buildGithubIssueUrl', () => {
    const entries = [
      {
        osmValuePart: '274',
        signId: '274',
        descriptiveName: 'Höchstgeschwindigkeit',
        task: 'explicit_none' as const,
      },
    ]
    const url = buildGithubIssueUrl(entries)
    expect(url).toContain('github.com/osmberlin/osm-traffic-sign-tool/issues/new')
    expect(url).toContain('template=tagging-qa-catalogue-update.md')
    expect(url).toContain('title=')
    expect(url).toContain('body=')

    const customBody = 'Custom issue body'
    const customUrl = buildGithubIssueUrl(entries, 'DE', customBody)
    expect(customUrl).toContain('body=Custom+issue+body')
  })
})

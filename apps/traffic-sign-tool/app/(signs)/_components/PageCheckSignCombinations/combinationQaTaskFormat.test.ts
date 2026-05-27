import { describe, expect, test } from 'bun:test'
import {
  buildGithubIssueUrl,
  collectCombinationTaskEntries,
  formatCombinationQaTaskResults,
  type CombinationFeedbackState,
} from './combinationQaTaskFormat'

describe('combinationQaTaskFormat', () => {
  test('collectCombinationTaskEntries and format', () => {
    const feedback = new Map<string, CombinationFeedbackState>([
      ['DE:274,DE:1010-12', { status: 'NOTOK', comment: 'maxspeed should be 30' }],
      ['DE:999', { status: 'INVALID', comment: 'Must not combine with parking zone' }],
      ['DE:111', { status: 'OK' }],
    ])

    const entries = collectCombinationTaskEntries(feedback, 'DE')
    expect(entries).toHaveLength(2)

    const text = formatCombinationQaTaskResults(entries)
    expect(text).toContain('Sign combination QA')
    expect(text).toContain('open a PR')
    expect(text).toContain('.cursor/skills/fix-sign-combination/SKILL.md')
    expect(text).toContain('TrafficSignDataTypes.ts')
    expect(text).toContain('Not OK – fix combined tag output')
    expect(text).toContain('Invalid combination – update compatibility rules')
    expect(text).toContain('DE:274,DE:1010-12')
    expect(text).toContain('maxspeed should be 30')
    expect(text).toContain('Must not combine with parking zone')
  })

  test('buildGithubIssueUrl', () => {
    const url = buildGithubIssueUrl([
      {
        tagValue: 'DE:274,DE:1010-12',
        primarySignId: '274',
        status: 'NOTOK',
        currentTags: 'maxspeed=50',
      },
    ])
    expect(url).toContain('github.com/osmberlin/osm-traffic-sign-tool/issues/new')
    expect(url).toContain('template=sign-combination-qa-update.md')
    expect(url).toContain('title=')
    expect(url).toContain('body=')
  })
})

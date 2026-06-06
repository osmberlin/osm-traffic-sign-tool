import { describe, expect, test } from 'vitest'
import {
  buildGithubIssueUrl,
  collectCombinationTaskEntries,
  formatCombinationQaTaskResults,
  getCombinationQaConfirmationDate,
  type CombinationFeedbackState,
} from './combinationQaTaskFormat'

describe('combinationQaTaskFormat', () => {
  test('collectCombinationTaskEntries and format', () => {
    const feedback = new Map<string, CombinationFeedbackState>([
      ['DE:274,DE:1010-12', { status: 'NOTOK', comment: 'maxspeed should be 30' }],
      ['DE:999', { status: 'INVALID', comment: 'Must not combine with parking zone' }],
      ['DE:111,DE:1010-12', { status: 'OK', confirmedAt: '2026-06-06' }],
    ])

    const entries = collectCombinationTaskEntries(feedback, 'DE')
    expect(entries).toHaveLength(3)

    const text = formatCombinationQaTaskResults(entries)
    expect(text).toContain('**You**')
    expect(text).toContain('Traffic Sign Tool')
    expect(text).toContain('Cursor agent')
    expect(text).toContain('Sign combination QA')
    expect(text).toContain('open a PR')
    expect(text).toContain('Closes #<issue-number>')
    expect(text).toContain('.cursor/skills/fix-sign-combination/SKILL.md')
    expect(text).toContain('TrafficSignDataTypes.ts')
    expect(text).toContain('confirmedModifiers')
    expect(text).toContain('OK – record combination QA confirmation')
    expect(text).toContain('Not OK – fix combined tag output')
    expect(text).toContain('Invalid combination – update compatibility rules')
    expect(text).toContain('DE:274,DE:1010-12')
    expect(text).toContain('maxspeed should be 30')
    expect(text).toContain('Must not combine with parking zone')
    expect(text).toContain('DE:111,DE:1010-12')
    expect(text).toContain('Confirmation date: `2026-06-06`')
  })

  test('getCombinationQaConfirmationDate returns ISO date', () => {
    expect(getCombinationQaConfirmationDate(new Date('2026-06-06T10:00:00Z'))).toBe('2026-06-06')
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

import { describe, expect, test } from 'vitest'
import {
  buildCursorTriggerCommentBody,
  CURSOR_TRIGGER_MARKER,
  hasExistingCursorTrigger,
  resolveActiveLabel,
  resolveSkillInstruction,
  resolveSourceBranch,
} from './cursorQaAutomation'

describe('resolveActiveLabel', () => {
  test('prefers specific labels over cursor-qa', () => {
    expect(resolveActiveLabel(['cursor-qa', 'tagging-qa'])).toBe('tagging-qa')
    expect(resolveActiveLabel(['cursor-qa', 'combination-qa'])).toBe('combination-qa')
    expect(resolveActiveLabel(['cursor-qa', 'question-qa'])).toBe('question-qa')
  })

  test('falls back to cursor-qa', () => {
    expect(resolveActiveLabel(['cursor-qa'])).toBe('cursor-qa')
  })

  test('returns null when no trigger label is present', () => {
    expect(resolveActiveLabel(['bug'])).toBeNull()
  })
})

describe('resolveSourceBranch', () => {
  test('reads source branch blockquote', () => {
    expect(resolveSourceBranch('> **Source branch:** `deploy/test`')).toBe('deploy/test')
  })

  test('defaults to main', () => {
    expect(resolveSourceBranch('No branch metadata here')).toBe('main')
  })
})

describe('hasExistingCursorTrigger', () => {
  test('detects existing @cursor trigger comments', () => {
    expect(
      hasExistingCursorTrigger([
        { body: 'Human comment' },
        { body: `${CURSOR_TRIGGER_MARKER}osmberlin/osm-traffic-sign-tool branch=main` },
      ]),
    ).toBe(true)
    expect(hasExistingCursorTrigger([{ body: 'No trigger here' }])).toBe(false)
  })
})

describe('resolveSkillInstruction', () => {
  test('uses configured skill for specific labels', () => {
    expect(
      resolveSkillInstruction(
        { title: 'Tagging QA', skill: '.cursor/skills/add-traffic-sign/SKILL.md' },
        '',
      ),
    ).toBe('Follow `.cursor/skills/add-traffic-sign/SKILL.md`.')
  })

  test('reads skill path from issue body for cursor-qa', () => {
    expect(
      resolveSkillInstruction(
        { title: 'Catalogue QA', skill: null },
        'Use `.cursor/skills/add-traffic-sign/SKILL.md` for this page.',
      ),
    ).toBe('Follow `.cursor/skills/add-traffic-sign/SKILL.md`.')
  })
})

describe('buildCursorTriggerCommentBody', () => {
  test('builds trigger comment with branch and label metadata', () => {
    const body = buildCursorTriggerCommentBody({
      owner: 'osmberlin',
      repo: 'osm-traffic-sign-tool',
      issueNumber: 42,
      activeLabel: 'tagging-qa',
      issueBody: '> **Source branch:** `feat/qa-preview`',
    })

    expect(body).toContain('@cursor repo=osmberlin/osm-traffic-sign-tool branch=feat/qa-preview')
    expect(body).toContain('**Tagging QA** #42 (`tagging-qa`).')
    expect(body).toContain('Follow `.cursor/skills/add-traffic-sign/SKILL.md`.')
    expect(body).toContain('Closes #42')
    expect(body).toContain('**[Cursor Agent]**')
  })
})

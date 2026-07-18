import { describe, expect, test } from 'vitest'
import {
  buildAgentPrompt,
  buildAgentStartedCommentBody,
  CURSOR_AGENT_LINK_MARKER,
  hasExistingCursorAgent,
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

describe('hasExistingCursorAgent', () => {
  test('detects existing agent-started comments', () => {
    expect(
      hasExistingCursorAgent([
        { body: 'Human comment' },
        { body: `Started agent: https://${CURSOR_AGENT_LINK_MARKER}bc-123` },
      ]),
    ).toBe(true)
    expect(hasExistingCursorAgent([{ body: 'No trigger here' }])).toBe(false)
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

describe('buildAgentPrompt', () => {
  test('builds agent prompt with label metadata and skill', () => {
    const prompt = buildAgentPrompt({
      issueNumber: 42,
      activeLabel: 'tagging-qa',
      issueBody: '> **Source branch:** `feat/qa-preview`',
    })

    expect(prompt).toContain('**Tagging QA** #42 (`tagging-qa`).')
    expect(prompt).toContain('Read GitHub issue #42 for full context and task details.')
    expect(prompt).toContain('Follow `.cursor/skills/add-traffic-sign/SKILL.md`.')
    expect(prompt).toContain('Closes #42')
    expect(prompt).toContain('**[Cursor Agent]**')
    expect(prompt).not.toContain('@cursor')
  })
})

describe('buildAgentStartedCommentBody', () => {
  test('builds status comment with agent link', () => {
    const body = buildAgentStartedCommentBody({
      agentUrl: 'https://cursor.com/agents/bc-123',
      issueNumber: 42,
      activeLabel: 'tagging-qa',
    })

    expect(body).toContain('**GitHub Actions (automation)**')
    expect(body).toContain('**Tagging QA** #42 (`tagging-qa`)')
    expect(body).toContain('https://cursor.com/agents/bc-123')
    expect(body).not.toContain('@cursor')
  })
})

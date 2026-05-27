import type { SignType } from '@osm-traffic-signs/converter'
import { QA_ISSUE_ATTRIBUTION_BANNER } from '../qaIssueAttribution'

export type SignTaskType = 'explicit_none' | 'add_suggestions' | 'comment'

export type SignTaskState = {
  taskType?: SignTaskType
  suggestionNotes: string
}

export const emptySignTaskState = (): SignTaskState => ({
  suggestionNotes: '',
})

export type SignTaskEntry = {
  osmValuePart: string
  signId: string
  descriptiveName: string
  task: SignTaskType
  suggestionNotes?: string
}

export const TAGGING_QA_AGENT_SKILL_PATH = '.cursor/skills/add-traffic-sign/SKILL.md'

export const collectSignTaskEntries = (
  signs: SignType[],
  tasks: Map<string, SignTaskState>,
): SignTaskEntry[] => {
  const entries: SignTaskEntry[] = []

  for (const sign of signs) {
    const state = tasks.get(sign.osmValuePart)
    if (!state?.taskType) {
      continue
    }

    entries.push({
      osmValuePart: sign.osmValuePart,
      signId: sign.signId,
      descriptiveName: sign.descriptiveName,
      task: state.taskType,
      suggestionNotes: state.suggestionNotes.trim() || undefined,
    })
  }

  return entries
}

const formatEntryHeading = (entry: SignTaskEntry) =>
  `### \`${entry.osmValuePart}\` (signId \`${entry.signId}\`) – ${entry.descriptiveName}`

const formatTaskSection = (
  lines: string[],
  entries: SignTaskEntry[],
  heading: string,
  intro?: string,
) => {
  if (entries.length === 0) {
    return
  }

  lines.push(heading, '')
  if (intro) {
    lines.push(intro, '')
  }

  for (const entry of entries) {
    lines.push(formatEntryHeading(entry), '')
    if (entry.suggestionNotes) {
      lines.push('```', entry.suggestionNotes, '```', '')
    } else {
      lines.push('_No notes provided._', '')
    }
  }

  lines.push('')
}

const formatAgentBrief = (): string[] => [
  '# Tagging QA – catalogue config update',
  '',
  QA_ISSUE_ATTRIBUTION_BANNER,
  '',
  'Created from the [Tagging QA page](https://trafficsigns.osm-verkehrswende.org/DE/signs-qa).',
  '',
  'Submitting this issue (label `tagging-qa`) triggers a Cursor cloud agent via GitHub Actions. The agent should **open a PR** that updates German sign **config entries** in `@osm-traffic-signs/converter`—not TypeScript schema unless a task requires it.',
  '',
  '## Agent instructions',
  '',
  '1. Apply every task in the sections below.',
  `2. Read [\`${TAGGING_QA_AGENT_SKILL_PATH}\`](https://github.com/osmberlin/osm-traffic-sign-tool/blob/main/${TAGGING_QA_AGENT_SKILL_PATH}) for \`tagRecommendations\` shape, DE \`data/*.ts\` file choice, and OSM wiki tagging research.`,
  '3. Edit signs under `packages/traffic-sign-converter/src/data-definitions/DE/`. Schema: `packages/traffic-sign-converter/src/data-definitions/TrafficSignDataTypes.ts` (`tagRecommendations: "none" | {...}` for intentional none vs recommendations).',
  '4. Run tests in `packages/traffic-sign-converter`. Open a PR that links this issue.',
  '',
  '## Tasks',
  '',
]

export const formatTaggingQaTaskResults = (entries: SignTaskEntry[]): string => {
  if (entries.length === 0) {
    return ''
  }

  const explicitNone = entries.filter((entry) => entry.task === 'explicit_none')
  const addSuggestions = entries.filter((entry) => entry.task === 'add_suggestions')
  const comments = entries.filter((entry) => entry.task === 'comment')

  const lines = [...formatAgentBrief()]

  formatTaskSection(
    lines,
    explicitNone,
    '### Mark as explicit no tagging suggestions',
    'Set `tagRecommendations: "none"` on each sign object. Keep object recommendations only when concrete tags are present.',
  )
  formatTaskSection(
    lines,
    addSuggestions,
    '### Add tagging suggestions',
    'Update `tagRecommendations` from the notes (JSON or prose). Use the skill and OSM wiki if notes are incomplete. Use object form for concrete recommendations.',
  )
  formatTaskSection(
    lines,
    comments,
    '### Comments',
    'Address the notes. Change sign config only when notes request concrete edits.',
  )

  return lines.join('\n').trimEnd()
}

const GITHUB_REPO = 'osmberlin/osm-traffic-sign-tool'
export const TAGGING_QA_ISSUE_TEMPLATE = 'tagging-qa-catalogue-update.md'

export const buildGithubIssueUrl = (entries: SignTaskEntry[]): string => {
  const title = `Tagging QA: ${entries.length} catalogue update${entries.length === 1 ? '' : 's'}`
  const body = formatTaggingQaTaskResults(entries)
  const params = new URLSearchParams({
    template: TAGGING_QA_ISSUE_TEMPLATE,
    title,
    body,
  })
  return `https://github.com/${GITHUB_REPO}/issues/new?${params.toString()}`
}

export const taskNotesPlaceholder = (taskType: SignTaskType): string => {
  switch (taskType) {
    case 'explicit_none':
      return 'Optional: rationale, wiki links, or why no tagging suggestions apply'
    case 'add_suggestions':
      return 'Optional: tagRecommendations JSON, notes, or wiki links'
    case 'comment':
      return 'Comment or question about this sign'
  }
}

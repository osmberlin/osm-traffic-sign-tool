import type { SignType } from '@osm-traffic-signs/converter'
import { type QaDeployContext, getQaDeployContext } from '../qaDeployContext'
import { buildQaIssueUrl, formatQaIssueHeader } from '../qaIssue'

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
      descriptiveName: sign.descriptiveName ?? sign.name,
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

export const formatTaggingQaTaskResults = (
  entries: SignTaskEntry[],
  countryPrefix = 'DE',
  deployContext: QaDeployContext = getQaDeployContext(),
): string => {
  if (entries.length === 0) {
    return ''
  }

  const explicitNone = entries.filter((entry) => entry.task === 'explicit_none')
  const addSuggestions = entries.filter((entry) => entry.task === 'add_suggestions')
  const comments = entries.filter((entry) => entry.task === 'comment')

  const lines = [...formatQaIssueHeader('tagging-qa', countryPrefix, deployContext), '## Tasks', '']

  formatTaskSection(
    lines,
    explicitNone,
    '### Mark as explicit no tagging suggestions',
    'Set `tagRecommendationsByGeometry: "none"` on each sign object. Keep geometry recommendations only when concrete tags are present.',
  )
  formatTaskSection(
    lines,
    addSuggestions,
    '### Add tagging suggestions',
    'Update `tagRecommendationsByGeometry` from the notes (JSON or prose). Use the skill and OSM wiki if notes are incomplete.',
  )
  formatTaskSection(
    lines,
    comments,
    '### Comments',
    'Address the notes. Change sign config only when notes request concrete edits.',
  )

  return lines.join('\n').trimEnd()
}

export const buildGithubIssueUrl = (
  entries: SignTaskEntry[],
  countryPrefix = 'DE',
  body = formatTaggingQaTaskResults(entries, countryPrefix),
): string =>
  buildQaIssueUrl(
    'tagging-qa',
    `${countryPrefix}: ${entries.length} catalogue update${entries.length === 1 ? '' : 's'}`,
    body,
  )

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

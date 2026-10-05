import type { SignType } from '@osm-traffic-signs/converter'
import { type QaDeployContext, getQaDeployContext } from '../qaDeployContext'
import { buildQaIssueUrl, formatQaIssueHeader } from '../qaIssue'

export type QuestionTaskState = {
  suggestionNotes: string
}

export const emptyQuestionTaskState = (): QuestionTaskState => ({
  suggestionNotes: '',
})

export type QuestionTaskEntry = {
  osmValuePart: string
  signId: string
  descriptiveName: string
  questions: SignType['questions']
  suggestionNotes: string
}

export const collectQuestionTaskEntries = (
  signs: SignType[],
  tasks: Map<string, QuestionTaskState>,
): QuestionTaskEntry[] => {
  const entries: QuestionTaskEntry[] = []

  for (const sign of signs) {
    const state = tasks.get(sign.osmValuePart)
    if (!state?.suggestionNotes.trim()) {
      continue
    }

    entries.push({
      osmValuePart: sign.osmValuePart,
      signId: sign.signId,
      descriptiveName: sign.descriptiveName ?? sign.name,
      questions: sign.questions,
      suggestionNotes: state.suggestionNotes.trim(),
    })
  }

  return entries
}

const formatEntryHeading = (entry: QuestionTaskEntry) =>
  `### \`${entry.osmValuePart}\` (signId \`${entry.signId}\`) – ${entry.descriptiveName}`

export const formatQuestionsQaTaskResults = (
  entries: QuestionTaskEntry[],
  countryPrefix = 'DE',
  deployContext: QaDeployContext = getQaDeployContext(),
): string => {
  if (entries.length === 0) {
    return ''
  }

  const lines = [
    ...formatQaIssueHeader('question-qa', countryPrefix, deployContext),
    '## Tasks',
    '',
  ]

  lines.push(
    'For each sign, apply **Feedback** to the `questions` config (and the i18n keys in `apps/traffic-sign-tool/messages/*.json` where needed).',
    '',
  )

  for (const entry of entries) {
    lines.push(formatEntryHeading(entry), '')
    lines.push('#### Current questions config', '')
    if (entry.questions?.length) {
      lines.push('```json', JSON.stringify(entry.questions, null, 2), '```', '')
    } else {
      lines.push('_None._', '')
    }

    lines.push('#### Feedback', '')
    if (entry.suggestionNotes) {
      lines.push('```', entry.suggestionNotes, '```', '')
    } else {
      lines.push('_No notes provided._', '')
    }

    lines.push('')
  }

  return lines.join('\n').trimEnd()
}

export const buildGithubIssueUrl = (
  entries: QuestionTaskEntry[],
  countryPrefix = 'DE',
  body = formatQuestionsQaTaskResults(entries, countryPrefix),
): string =>
  buildQaIssueUrl(
    'question-qa',
    `${countryPrefix}: ${entries.length} update${entries.length === 1 ? '' : 's'}`,
    body,
  )

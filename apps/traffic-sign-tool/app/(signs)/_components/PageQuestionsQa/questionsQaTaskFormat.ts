import {
  getCatalogueDisplayName,
  type CountryPrefixType,
  type SignType,
} from '@osm-traffic-signs/converter'
import { QA_ISSUE_ATTRIBUTION_BANNER } from '../qaIssueAttribution'

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

export const QUESTION_QA_AGENT_SKILL_PATH = '.cursor/skills/update-sign-questions/SKILL.md'
export const QUESTION_QA_ISSUE_TEMPLATE = 'question-qa-catalogue-update.md'

const GITHUB_REPO = 'osmberlin/osm-traffic-sign-tool'

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

const formatCatalogueLabel = (countryPrefix: string) => {
  const catalogueName = getCatalogueDisplayName(countryPrefix as CountryPrefixType)
  return `${catalogueName} (\`${countryPrefix}\`)`
}

const formatAgentBrief = (countryPrefix: string): string[] => [
  `# Sign questions QA – ${formatCatalogueLabel(countryPrefix)}`,
  '',
  QA_ISSUE_ATTRIBUTION_BANNER,
  '',
  `Source: [Sign questions QA](https://trafficsigns.osm-verkehrswende.org/${countryPrefix}/questions-qa) · Config: \`packages/traffic-sign-converter/src/data-definitions/${countryPrefix}/\``,
  '',
  `Submit with label \`question-qa\` to trigger a Cursor cloud agent. It should open a PR updating \`questions\` and related i18n in the **${formatCatalogueLabel(countryPrefix)}** catalogue.`,
  '',
  '## Agent instructions',
  '',
  '1. Apply every task below.',
  `2. Read [\`${QUESTION_QA_AGENT_SKILL_PATH}\`](https://github.com/osmberlin/osm-traffic-sign-tool/blob/main/${QUESTION_QA_AGENT_SKILL_PATH}) for \`SignQuestion\` shape, \`questionCatalog.ts\` factories, and i18n in \`messages/*.json\`.`,
  `3. Edit signs under \`packages/traffic-sign-converter/src/data-definitions/${countryPrefix}/\`. Reuse \`questionCatalog.ts\` factories where possible.`,
  '4. Run tests in `packages/traffic-sign-converter`. Open a PR with `Closes #<issue-number>` in the description.',
  '',
  '## Tasks',
  '',
]

export const formatQuestionsQaTaskResults = (
  entries: QuestionTaskEntry[],
  countryPrefix = 'DE',
): string => {
  if (entries.length === 0) {
    return ''
  }

  const lines = [...formatAgentBrief(countryPrefix)]

  lines.push('### Sign question updates', '')
  lines.push(
    'For each sign, apply **Your feedback** to the `questions` config (and i18n keys where needed).',
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

    lines.push('#### Your feedback', '')
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
): string => {
  const title = `Question QA – ${formatCatalogueLabel(countryPrefix)}: ${entries.length} update${entries.length === 1 ? '' : 's'}`
  const params = new URLSearchParams({
    template: QUESTION_QA_ISSUE_TEMPLATE,
    title,
    body,
  })
  return `https://github.com/${GITHUB_REPO}/issues/new?${params.toString()}`
}

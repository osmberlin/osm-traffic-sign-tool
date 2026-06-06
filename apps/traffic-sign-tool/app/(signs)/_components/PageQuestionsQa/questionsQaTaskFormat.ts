import {
  formatQuestionAnswerTags,
  getQuestionAnswerShortLabel,
  getQuestionPromptShortLabel,
} from '@app/src/features/i18n/questionLabels'
import type { SignQuestion, SignType } from '@osm-traffic-signs/converter'
import { QA_ISSUE_ATTRIBUTION_BANNER } from '../qaIssueAttribution'

export type QuestionTaskState = {
  addSuggestions: boolean
  suggestionNotes: string
}

export const emptyQuestionTaskState = (): QuestionTaskState => ({
  addSuggestions: false,
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
    if (!state?.addSuggestions) {
      continue
    }

    entries.push({
      osmValuePart: sign.osmValuePart,
      signId: sign.signId,
      descriptiveName: sign.descriptiveName,
      questions: sign.questions,
      suggestionNotes: state.suggestionNotes.trim(),
    })
  }

  return entries
}

const formatEntryHeading = (entry: QuestionTaskEntry) =>
  `### \`${entry.osmValuePart}\` (signId \`${entry.signId}\`) – ${entry.descriptiveName}`

const formatQuestionAnswerCatalogue = (question: SignQuestion): string[] => {
  const lines: string[] = [
    `- **${getQuestionPromptShortLabel(question.questionI18nKey)}** (\`questionId: ${question.questionId}\`)`,
  ]

  if (question.defaultAnswerId) {
    lines.push(`  - default: \`${question.defaultAnswerId}\``)
  }
  if (question.affectsHighway) {
    lines.push(`  - affectsHighway: true`)
  }
  if (question.geometries?.length) {
    lines.push(`  - geometries: ${question.geometries.map((g) => `\`${g}\``).join(', ')}`)
  }

  for (const answer of question.answers) {
    const tags = formatQuestionAnswerTags(answer)
    const tagPart = tags ? ` → ${tags}` : ''
    lines.push(
      `  - ${getQuestionAnswerShortLabel(answer.answerI18nKey)} (\`answerId: ${answer.answerId}\`${tagPart ? `, tags: ${tagPart.replace(/^ → /, '')}` : ''})`,
    )
  }

  return lines
}

const formatAgentBrief = (countryPrefix: string): string[] => [
  '# Sign questions QA – catalogue config update',
  '',
  QA_ISSUE_ATTRIBUTION_BANNER,
  '',
  `Created from the [Sign questions QA page](https://trafficsigns.osm-verkehrswende.org/${countryPrefix}/questions-qa).`,
  '',
  `Submitting this issue (label \`question-qa\`) triggers a Cursor cloud agent via GitHub Actions. The agent should **open a PR** that updates **${countryPrefix}** sign **config entries** in \`@osm-traffic-signs/converter\`—especially \`questions\` arrays and related i18n keys.`,
  '',
  '## Agent instructions',
  '',
  '1. Apply every task in the sections below.',
  `2. Read [\`${QUESTION_QA_AGENT_SKILL_PATH}\`](https://github.com/osmberlin/osm-traffic-sign-tool/blob/main/${QUESTION_QA_AGENT_SKILL_PATH}) for \`SignQuestion\` / \`QuestionAnswer\` shape, \`questionCatalog.ts\` factories, and app i18n in \`messages/*.json\` + \`questionLabels.ts\`.`,
  `3. Edit signs under \`packages/traffic-sign-converter/src/data-definitions/${countryPrefix}/\`. Schema: \`packages/traffic-sign-converter/src/data-definitions/TrafficSignDataTypes.ts\`. Reuse factories from \`questionCatalog.ts\` when possible.`,
  '4. Run tests in `packages/traffic-sign-converter` (including `signsToTags.questions.test.ts`). Open a PR whose description includes `Closes #<issue-number>` (auto-closes this issue on merge).',
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

  lines.push('### Add or update sign questions', '')
  lines.push(
    'Update `questions` on each sign from the current config and submitter notes. Add new questions where notes request them.',
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

    lines.push('#### Questions and answers (catalogue)', '')
    if (entry.questions?.length) {
      for (const question of entry.questions) {
        lines.push(...formatQuestionAnswerCatalogue(question), '')
      }
    } else {
      lines.push('_No questions configured._', '')
    }

    lines.push('#### Suggestion', '')
    if (entry.suggestionNotes) {
      lines.push('```', entry.suggestionNotes, '```', '')
    } else {
      lines.push('_No notes provided._', '')
    }

    lines.push('')
  }

  return lines.join('\n').trimEnd()
}

export const buildGithubIssueUrl = (entries: QuestionTaskEntry[], countryPrefix = 'DE'): string => {
  const title = `Question QA (${countryPrefix}): ${entries.length} catalogue update${entries.length === 1 ? '' : 's'}`
  const body = formatQuestionsQaTaskResults(entries, countryPrefix)
  const params = new URLSearchParams({
    template: QUESTION_QA_ISSUE_TEMPLATE,
    title,
    body,
  })
  return `https://github.com/${GITHUB_REPO}/issues/new?${params.toString()}`
}

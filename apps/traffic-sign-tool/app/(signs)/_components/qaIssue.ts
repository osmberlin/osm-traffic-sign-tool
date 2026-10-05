import { type QaDeployContext, formatQaDeployContextLines, githubBlobUrl } from './qaDeployContext'

const GITHUB_REPO = 'osmberlin/osm-traffic-sign-tool'

/** Entry point for the agent session that works on QA issues; see .github/QA_ISSUES.md */
export const QA_ISSUES_SKILL_PATH = '.agents/skills/work-qa-issues/SKILL.md'

/**
 * One kind per QA page. The kind is the issue title prefix (`[tagging-qa] …`) and a label;
 * the agent session finds the issues by the title prefix.
 */
export const QA_ISSUE_KINDS = {
  'tagging-qa': {
    pageName: 'Tagging QA',
    route: 'signs-qa',
    template: 'tagging-qa-catalogue-update.md',
    skillPath: '.agents/skills/add-traffic-sign/SKILL.md',
  },
  'combination-qa': {
    pageName: 'Sign combinations QA',
    route: 'check-sign-combinations',
    template: 'sign-combination-qa-update.md',
    skillPath: '.agents/skills/fix-sign-combination/SKILL.md',
  },
  'question-qa': {
    pageName: 'Sign questions QA',
    route: 'questions-qa',
    template: 'question-qa-catalogue-update.md',
    skillPath: '.agents/skills/update-sign-questions/SKILL.md',
  },
  'taginfo-qa': {
    pageName: 'Taginfo comparison',
    route: 'taginfo',
    template: 'taginfo-qa-catalogue-update.md',
    skillPath: '.agents/skills/add-traffic-sign/SKILL.md',
  },
  'wiki-qa': {
    pageName: 'Wiki comparison',
    route: 'wiki',
    template: 'wiki-qa-catalogue-update.md',
    skillPath: '.agents/skills/add-traffic-sign/SKILL.md',
  },
} as const

export type QaIssueKind = keyof typeof QA_ISSUE_KINDS

/** Pre-filled where the submitter writes; an issue that still has it has no task yet */
export const QA_FEEDBACK_PLACEHOLDER = 'WRITE HERE'

export const formatQaIssueTitle = (kind: QaIssueKind, subject: string) => `[${kind}] ${subject}`

/**
 * Start of every QA issue body: where it comes from and what an agent needs to work on it.
 * Kept short, the issue is passed to GitHub in the URL. The how-to is in the skills.
 */
export const formatQaIssueHeader = (
  kind: QaIssueKind,
  countryPrefix: string,
  deployContext: QaDeployContext,
): string[] => {
  const { pageName, route, skillPath } = QA_ISSUE_KINDS[kind]
  const link = (path: string) => `[\`${path}\`](${githubBlobUrl(path, deployContext)})`

  return [
    `> Created from the [${pageName} page](${deployContext.pageOrigin}/${countryPrefix}/${route}) of the Traffic Sign Tool. The feedback is from the person who opened this issue, everything else was filled in by the tool.`,
    ...formatQaDeployContextLines(deployContext),
    '',
    '## For the agent',
    '',
    `Worked on in a manually started agent session: ${link(QA_ISSUES_SKILL_PATH)}.`,
    '',
    `- **Kind:** \`${kind}\``,
    `- **Catalogue:** \`${countryPrefix}\` in \`packages/traffic-sign-converter/src/data-definitions/${countryPrefix}/\` (schema: \`TrafficSignDataTypes.ts\`)`,
    `- **How to apply:** ${link(skillPath)}`,
    '- **Done when:** every task is applied or the PR says why not, `bun run check` passes, and the PR description has `Closes #<this issue>`.',
    '',
  ]
}

export const buildQaIssueUrl = (kind: QaIssueKind, subject: string, body: string) => {
  const params = new URLSearchParams({
    template: QA_ISSUE_KINDS[kind].template,
    title: formatQaIssueTitle(kind, subject),
    body,
  })
  return `https://github.com/${GITHUB_REPO}/issues/new?${params.toString()}`
}

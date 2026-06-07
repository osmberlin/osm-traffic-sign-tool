const GHA_ATTRIBUTION =
  '> **GitHub Actions (automation)** — This comment only starts the Cursor cloud agent. It is not written by the issue author.\n\n'

export const CURSOR_TRIGGER_MARKER = '@cursor repo='

export const SPECIFIC_LABELS = ['tagging-qa', 'combination-qa', 'question-qa'] as const

export type QaTriggerLabel = (typeof SPECIFIC_LABELS)[number] | 'cursor-qa'

export const LABEL_CONFIG = {
  'tagging-qa': {
    title: 'Tagging QA',
    skill: '.cursor/skills/add-traffic-sign/SKILL.md',
  },
  'combination-qa': {
    title: 'Sign combination QA',
    skill: '.cursor/skills/fix-sign-combination/SKILL.md',
  },
  'question-qa': {
    title: 'Sign questions QA',
    skill: '.cursor/skills/update-sign-questions/SKILL.md',
  },
  'cursor-qa': {
    title: 'Catalogue QA',
    skill: null,
  },
} as const satisfies Record<QaTriggerLabel, { title: string; skill: string | null }>

export const resolveActiveLabel = (issueLabels: string[]): QaTriggerLabel | null => {
  for (const label of SPECIFIC_LABELS) {
    if (issueLabels.includes(label)) {
      return label
    }
  }
  if (issueLabels.includes('cursor-qa')) {
    return 'cursor-qa'
  }
  return null
}

export const hasExistingCursorTrigger = (comments: { body?: string | null }[]) =>
  comments.some((comment) => comment.body?.includes(CURSOR_TRIGGER_MARKER))

export const resolveSourceBranch = (body: string) => {
  const quoted = body.match(/\*\*Source branch:\*\*\s*`([^`]+)`/)
  if (quoted) return quoted[1]
  return 'main'
}

export const resolveSkillInstruction = (
  config: (typeof LABEL_CONFIG)[QaTriggerLabel],
  issueBody: string,
) => {
  if (config.skill) {
    return `Follow \`${config.skill}\`.`
  }
  const skillMatch = issueBody.match(/\.cursor\/skills\/[^\s`]+\/SKILL\.md/)
  return skillMatch
    ? `Follow \`${skillMatch[0]}\`.`
    : 'Read the **issue body** for the agent skill path and instructions.'
}

export const buildCursorTriggerCommentBody = ({
  owner,
  repo,
  issueNumber,
  activeLabel,
  issueBody,
}: {
  owner: string
  repo: string
  issueNumber: number
  activeLabel: QaTriggerLabel
  issueBody: string
}) => {
  const config = LABEL_CONFIG[activeLabel]
  const branch = resolveSourceBranch(issueBody)
  const skillInstruction = resolveSkillInstruction(config, issueBody)

  return `${GHA_ATTRIBUTION}@cursor repo=${owner}/${repo} branch=${branch}

**${config.title}** #${issueNumber} (\`${activeLabel}\`). Read the issue body. ${skillInstruction} Open a PR with \`Closes #${issueNumber}\`. Prefix comments and PR description with \`**[Cursor Agent]**\`.`
}

type IssueLabel = string | { name: string }

type IssuesEvent = {
  issue: {
    number: number
    body: string | null
    labels: IssueLabel[]
  }
}

const getIssueLabels = (labels: IssueLabel[]) =>
  labels.map((label) => (typeof label === 'string' ? label : label.name))

const githubApi = async <T>(token: string, path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...init?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`GitHub API ${response.status}: ${await response.text()}`)
  }

  return response.json() as Promise<T>
}

export const runCursorQaAutomation = async ({
  token,
  repository,
  event,
}: {
  token: string
  repository: string
  event: IssuesEvent
}) => {
  const [owner, repo] = repository.split('/')
  if (!owner || !repo) {
    throw new Error(`Invalid GITHUB_REPOSITORY: ${repository}`)
  }

  const issue = event.issue
  const issueLabels = getIssueLabels(issue.labels)
  const activeLabel = resolveActiveLabel(issueLabels)

  if (!activeLabel) {
    console.log('No Cursor QA trigger label found on issue; skipping.')
    return
  }

  const comments = await githubApi<{ body?: string | null }[]>(
    token,
    `/repos/${owner}/${repo}/issues/${issue.number}/comments?per_page=100`,
  )

  if (hasExistingCursorTrigger(comments)) {
    console.log('Cursor trigger already exists (@cursor comment); skipping.')
    return
  }

  const body = buildCursorTriggerCommentBody({
    owner,
    repo,
    issueNumber: issue.number,
    activeLabel,
    issueBody: issue.body ?? '',
  })

  await githubApi(token, `/repos/${owner}/${repo}/issues/${issue.number}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ body }),
  })
}

const runFromGitHubActions = async () => {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    throw new Error('GITHUB_TOKEN is required')
  }

  const eventPath = process.env.GITHUB_EVENT_PATH
  if (!eventPath) {
    throw new Error('GITHUB_EVENT_PATH is required')
  }

  const repository = process.env.GITHUB_REPOSITORY
  if (!repository) {
    throw new Error('GITHUB_REPOSITORY is required')
  }

  const event = (await Bun.file(eventPath).json()) as IssuesEvent

  await runCursorQaAutomation({ token, repository, event })
}

if (import.meta.main) {
  await runFromGitHubActions()
}

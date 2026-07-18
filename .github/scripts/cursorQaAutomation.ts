const GHA_ATTRIBUTION =
  '> **GitHub Actions (automation)** — This comment only starts the Cursor cloud agent. It is not written by the issue author.\n\n'

export const CURSOR_AGENT_LINK_MARKER = 'cursor.com/agents/'
export const LEGACY_CURSOR_TRIGGER_MARKER = '@cursor repo='
export const CURSOR_AUTOMATION_MARKER_PREFIX = 'cursor-qa-automation/issue-'

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

export const automationMarkerForIssue = (issueNumber: number) =>
  `${CURSOR_AUTOMATION_MARKER_PREFIX}${issueNumber}`

export const hasExistingCursorAgent = (comments: { body?: string | null }[], issueNumber: number) =>
  comments.some((comment) => {
    const body = comment.body ?? ''
    return (
      body.includes(CURSOR_AGENT_LINK_MARKER) ||
      body.includes(LEGACY_CURSOR_TRIGGER_MARKER) ||
      body.includes(automationMarkerForIssue(issueNumber))
    )
  })

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

export const buildAgentPrompt = ({
  issueNumber,
  activeLabel,
  issueBody,
}: {
  issueNumber: number
  activeLabel: QaTriggerLabel
  issueBody: string
}) => {
  const config = LABEL_CONFIG[activeLabel]
  const skillInstruction = resolveSkillInstruction(config, issueBody)
  const trimmedBody = issueBody.trim()

  return `**${config.title}** #${issueNumber} (\`${activeLabel}\`).

${skillInstruction}

## Issue body

${trimmedBody || '_No issue body provided._'}

Open a PR with \`Closes #${issueNumber}\`. Prefix comments and PR description with \`**[Cursor Agent]**\`.`
}

export const buildAgentPendingCommentBody = ({
  issueNumber,
  activeLabel,
}: {
  issueNumber: number
  activeLabel: QaTriggerLabel
}) => {
  const config = LABEL_CONFIG[activeLabel]
  return `${GHA_ATTRIBUTION}Starting a Cursor cloud agent for **${config.title}** #${issueNumber} (\`${activeLabel}\`)…

${automationMarkerForIssue(issueNumber)}`
}

export const buildAgentStartedCommentBody = ({
  agentUrl,
  issueNumber,
  activeLabel,
}: {
  agentUrl: string
  issueNumber: number
  activeLabel: QaTriggerLabel
}) => {
  const config = LABEL_CONFIG[activeLabel]
  return `${GHA_ATTRIBUTION}Started a Cursor cloud agent for **${config.title}** #${issueNumber} (\`${activeLabel}\`): ${agentUrl}

${automationMarkerForIssue(issueNumber)}`
}

type CreateCloudAgentResponse = {
  agent: {
    id: string
    url: string
  }
}

export const createCloudAgent = async ({
  apiKey,
  prompt,
  repoUrl,
  startingRef,
  name,
}: {
  apiKey: string
  prompt: string
  repoUrl: string
  startingRef: string
  name: string
}) => {
  const response = await fetch('https://api.cursor.com/v1/agents', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: { text: prompt },
      name: name.slice(0, 100),
      repos: [{ url: repoUrl, startingRef }],
      autoCreatePR: true,
    }),
  })

  if (!response.ok) {
    throw new Error(`Cursor API ${response.status}: ${await response.text()}`)
  }

  return (await response.json()) as CreateCloudAgentResponse
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

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export const runCursorQaAutomation = async ({
  token,
  apiKey,
  repository,
  event,
}: {
  token: string
  apiKey: string
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

  if (hasExistingCursorAgent(comments, issue.number)) {
    console.log('Cursor agent already started for this issue; skipping.')
    return
  }

  const issueBody = issue.body ?? ''
  const startingRef = resolveSourceBranch(issueBody)
  const config = LABEL_CONFIG[activeLabel]
  const prompt = buildAgentPrompt({
    issueNumber: issue.number,
    activeLabel,
    issueBody,
  })

  const pendingComment = await githubApi<{ id: number }>(
    token,
    `/repos/${owner}/${repo}/issues/${issue.number}/comments`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        body: buildAgentPendingCommentBody({
          issueNumber: issue.number,
          activeLabel,
        }),
      }),
    },
  )

  try {
    const { agent } = await createCloudAgent({
      apiKey,
      prompt,
      repoUrl: `https://github.com/${owner}/${repo}`,
      startingRef,
      name: `${config.title} #${issue.number}`,
    })

    await githubApi(token, `/repos/${owner}/${repo}/issues/comments/${pendingComment.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        body: buildAgentStartedCommentBody({
          agentUrl: agent.url,
          issueNumber: issue.number,
          activeLabel,
        }),
      }),
    })

    console.log(`Started Cursor cloud agent ${agent.id}: ${agent.url}`)
  } catch (error) {
    await githubApi(token, `/repos/${owner}/${repo}/issues/comments/${pendingComment.id}`, {
      method: 'DELETE',
    })
    throw error
  }
}

const runFromGitHubActions = async () => {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    throw new Error('GITHUB_TOKEN is required')
  }

  const apiKey = process.env.CURSOR_API_KEY
  if (!apiKey) {
    throw new Error('CURSOR_API_KEY is required')
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

  await runCursorQaAutomation({ token, apiKey, repository, event })
}

if (import.meta.main) {
  await runFromGitHubActions()
}

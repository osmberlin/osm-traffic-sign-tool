import {
  signsToTags,
  trafficSignTagToSigns,
  type CountryPrefixType,
  type SignStateType,
} from '@osm-traffic-signs/converter'
import {
  type QaDeployContext,
  formatQaDeployContextLines,
  getQaDeployContext,
  githubBlobUrl,
} from '../qaDeployContext'
import { QA_ISSUE_ATTRIBUTION_BANNER } from '../qaIssueAttribution'

export type CombinationFeedbackStatus = 'OK' | 'NOTOK' | 'INVALID'

export type CombinationFeedbackState = {
  status: CombinationFeedbackStatus
  comment?: string
  confirmedAt?: string
}

export type CombinationTaskEntry = {
  tagValue: string
  primaryOsmValuePart?: string
  primarySignId?: string
  primaryDescriptiveName?: string
  modifierOsmValuePart?: string
  modifierSignId?: string
  modifierDescriptiveName?: string
  status: CombinationFeedbackStatus
  currentTags: string
  comment?: string
  confirmedAt?: string
}

export const COMBINATION_QA_AGENT_SKILL_PATH = '.cursor/skills/fix-sign-combination/SKILL.md'
export const COMBINATION_QA_ISSUE_TEMPLATE = 'sign-combination-qa-update.md'

const GITHUB_REPO = 'osmberlin/osm-traffic-sign-tool'

export const getCombinationQaConfirmationDate = (date = new Date()): string =>
  date.toISOString().slice(0, 10)

const tagValueToSignPart = (tagValue: string, countryPrefix: CountryPrefixType) => {
  const prefix = `${countryPrefix}:`
  return tagValue.startsWith(prefix) ? tagValue.slice(prefix.length) : tagValue
}

const getRecognizedSigns = (signs: SignStateType[]) =>
  signs.filter((sign): sign is SignStateType & { recodgnizedSign: true } => sign.recodgnizedSign)

const buildTaskEntry = (
  tagValue: string,
  state: CombinationFeedbackState,
  countryPrefix: CountryPrefixType,
): CombinationTaskEntry => {
  const signs = trafficSignTagToSigns(tagValueToSignPart(tagValue, countryPrefix), countryPrefix)
  const recognized = getRecognizedSigns(signs)
  const primarySign = recognized.at(0)
  const modifierSign = recognized.at(1)

  const tags = signsToTags(signs, countryPrefix, 'way')
  const currentTags = [...tags.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n')

  return {
    tagValue,
    primaryOsmValuePart: primarySign?.osmValuePart,
    primarySignId: primarySign?.signId ?? undefined,
    primaryDescriptiveName: primarySign?.descriptiveName,
    modifierOsmValuePart: modifierSign?.osmValuePart,
    modifierSignId: modifierSign?.signId ?? undefined,
    modifierDescriptiveName: modifierSign?.descriptiveName,
    status: state.status,
    currentTags: currentTags || '_No tags produced._',
    comment: state.status === 'OK' ? undefined : state.comment?.trim() || undefined,
    confirmedAt:
      state.status === 'OK' ? (state.confirmedAt ?? getCombinationQaConfirmationDate()) : undefined,
  }
}

export const collectCombinationTaskEntries = (
  feedback: Map<string, CombinationFeedbackState>,
  countryPrefix: CountryPrefixType,
): CombinationTaskEntry[] => {
  const entries: CombinationTaskEntry[] = []

  for (const [tagValue, state] of feedback) {
    if (!state) {
      continue
    }

    entries.push(buildTaskEntry(tagValue, state, countryPrefix))
  }

  return entries
}

const formatEntryHeading = (entry: CombinationTaskEntry) =>
  `### \`${entry.tagValue}\`${entry.primarySignId ? ` (primary \`${entry.primarySignId}\`)` : ''}${entry.modifierSignId ? ` + modifier \`${entry.modifierSignId}\`` : ''}`

const appendEntrySignLines = (lines: string[], entry: CombinationTaskEntry) => {
  if (!entry.primaryDescriptiveName && !entry.modifierDescriptiveName) {
    return
  }

  lines.push(
    `- Primary: \`${entry.primaryOsmValuePart ?? 'unknown'}\` – ${entry.primaryDescriptiveName ?? 'unknown'}`,
  )
  if (entry.modifierOsmValuePart) {
    lines.push(
      `- Modifier: \`${entry.modifierOsmValuePart}\` – ${entry.modifierDescriptiveName ?? 'unknown'}`,
    )
  }
  lines.push('')
}

const formatTaskSection = (
  lines: string[],
  entries: CombinationTaskEntry[],
  heading: string,
  intro: string,
) => {
  if (entries.length === 0) {
    return
  }

  lines.push(heading, '', intro, '')

  for (const entry of entries) {
    lines.push(formatEntryHeading(entry), '')
    appendEntrySignLines(lines, entry)
    lines.push('Current converter tags:', '```', entry.currentTags, '```', '')
    if (entry.comment) {
      lines.push('Reviewer notes:', '```', entry.comment, '```', '')
    } else {
      lines.push('_No reviewer notes provided._', '')
    }
  }

  lines.push('')
}

const formatOkTaskSection = (
  lines: string[],
  entries: CombinationTaskEntry[],
  heading: string,
  intro: string,
) => {
  if (entries.length === 0) {
    return
  }

  lines.push(heading, '', intro, '')

  for (const entry of entries) {
    lines.push(formatEntryHeading(entry), '')
    appendEntrySignLines(lines, entry)
    lines.push(`- Confirmation date: \`${entry.confirmedAt ?? 'unknown'}\``, '')
    lines.push('Current converter tags:', '```', entry.currentTags, '```', '')
  }

  lines.push('')
}

const formatAgentBrief = (countryPrefix: string, deployContext: QaDeployContext): string[] => [
  '# Sign combination QA – catalogue config update',
  '',
  QA_ISSUE_ATTRIBUTION_BANNER,
  '',
  ...formatQaDeployContextLines(deployContext),
  '',
  `Created from the [Sign combinations QA page](${deployContext.pageOrigin}/${countryPrefix}/check-sign-combinations).`,
  '',
  `Submitting this issue (label \`combination-qa\`) triggers a Cursor cloud agent via GitHub Actions. The agent should **open a PR** that updates **${countryPrefix}** sign **config entries** and/or combination conversion behavior in \`@osm-traffic-signs/converter\`.`,
  '',
  '## Agent instructions',
  '',
  '1. Apply every task in the sections below.',
  `2. Read [\`${COMBINATION_QA_AGENT_SKILL_PATH}\`](${githubBlobUrl(COMBINATION_QA_AGENT_SKILL_PATH, deployContext)}) for compatibility fields, tag output fixes, and test expectations.`,
  `3. Edit signs under \`packages/traffic-sign-converter/src/data-definitions/${countryPrefix}/\`. Schema: \`packages/traffic-sign-converter/src/data-definitions/TrafficSignDataTypes.ts\` (\`compatibility.canReceiveModifiers\`, \`compatibility.incompatibleModifiers\`, \`compatibility.confirmedModifiers\`, \`tagRecommendationsByGeometry\`).`,
  '4. For **Not OK** tasks: fix the combined tag output (usually `tagRecommendationsByGeometry` on primary/modifier and/or `signsToTags` interaction tests).',
  '5. For **Invalid combination** tasks: update compatibility so the converter blocks the pair (add `incompatibleModifiers` on the primary sign or set `canReceiveModifiers: false` when the primary must never take modifiers).',
  '6. For **OK** tasks: add or update `compatibility.confirmedModifiers[<modifierSignId>]` on the primary sign with the confirmation date from the task.',
  '7. Run tests in `packages/traffic-sign-converter`. Open a PR whose description includes `Closes #<issue-number>` (auto-closes this issue on merge).',
  '',
  '## Tasks',
  '',
]

export const formatCombinationQaTaskResults = (
  entries: CombinationTaskEntry[],
  countryPrefix = 'DE',
  deployContext: QaDeployContext = getQaDeployContext(),
): string => {
  if (entries.length === 0) {
    return ''
  }

  const ok = entries.filter((entry) => entry.status === 'OK')
  const notOk = entries.filter((entry) => entry.status === 'NOTOK')
  const invalid = entries.filter((entry) => entry.status === 'INVALID')

  const lines = [...formatAgentBrief(countryPrefix, deployContext)]

  formatOkTaskSection(
    lines,
    ok,
    '### OK – record combination QA confirmation',
    'The combination is allowed and the produced OSM tags were verified. Add or update the primary sign `compatibility.confirmedModifiers` entry for this modifier using the confirmation date below.',
  )
  formatTaskSection(
    lines,
    notOk,
    '### Not OK – fix combined tag output',
    'The combination is allowed but the produced OSM tags are wrong or incomplete. Update sign config and/or add a targeted test in `packages/traffic-sign-converter/src/signsToTags/signsToTags.test.ts` when interaction logic is non-trivial.',
  )
  formatTaskSection(
    lines,
    invalid,
    '### Invalid combination – update compatibility rules',
    'The combination should not be allowed. Update the primary sign compatibility so the tool rejects this pair.',
  )

  return lines.join('\n').trimEnd()
}

export const buildGithubIssueUrl = (
  entries: CombinationTaskEntry[],
  countryPrefix = 'DE',
  body = formatCombinationQaTaskResults(entries, countryPrefix),
): string => {
  const title = `Combination QA (${countryPrefix}): ${entries.length} catalogue update${entries.length === 1 ? '' : 's'}`
  const params = new URLSearchParams({
    template: COMBINATION_QA_ISSUE_TEMPLATE,
    title,
    body,
  })
  return `https://github.com/${GITHUB_REPO}/issues/new?${params.toString()}`
}

export const feedbackCommentPlaceholder = (
  status: Exclude<CombinationFeedbackStatus, 'OK'>,
): string => {
  switch (status) {
    case 'NOTOK':
      return 'What tags should this combination produce? Include wiki links or expected key=value pairs.'
    case 'INVALID':
      return 'Why should this combination be blocked? Mention primary/modifier sign IDs if unclear.'
  }
}

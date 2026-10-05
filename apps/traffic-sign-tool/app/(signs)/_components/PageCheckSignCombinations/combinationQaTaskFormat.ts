import {
  signsToTags,
  trafficSignTagToSigns,
  type CountryPrefixType,
  type SignStateType,
} from '@osm-traffic-signs/converter'
import { type QaDeployContext, getQaDeployContext } from '../qaDeployContext'
import { buildQaIssueUrl, formatQaIssueHeader } from '../qaIssue'

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

  const lines = [
    ...formatQaIssueHeader('combination-qa', countryPrefix, deployContext),
    '## Tasks',
    '',
  ]

  formatOkTaskSection(
    lines,
    ok,
    '### OK – record combination QA confirmation',
    'The combination is allowed and the produced OSM tags were verified. Add or update `compatibility.confirmedModifiers[<modifierSignId>]` on the primary sign with the confirmation date below.',
  )
  formatTaskSection(
    lines,
    notOk,
    '### Not OK – fix combined tag output',
    'The combination is allowed but the produced OSM tags are wrong or incomplete. Update `tagRecommendationsByGeometry` on the primary/modifier and/or add a targeted test in `packages/traffic-sign-converter/src/signsToTags/signsToTags.test.ts` when interaction logic is non-trivial.',
  )
  formatTaskSection(
    lines,
    invalid,
    '### Invalid combination – update compatibility rules',
    'The combination should not be allowed. Update the primary sign so the tool rejects this pair: add the modifier to `compatibility.incompatibleModifiers`, or set `compatibility.canReceiveModifiers: false` when the primary must never take modifiers.',
  )

  return lines.join('\n').trimEnd()
}

export const buildGithubIssueUrl = (
  entries: CombinationTaskEntry[],
  countryPrefix = 'DE',
  body = formatCombinationQaTaskResults(entries, countryPrefix),
): string =>
  buildQaIssueUrl(
    'combination-qa',
    `${countryPrefix}: ${entries.length} catalogue update${entries.length === 1 ? '' : 's'}`,
    body,
  )

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

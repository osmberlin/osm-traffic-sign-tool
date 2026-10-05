const UNRELEASED_HEADING = '## Unreleased'

/** Date line below a version heading, e.g. `_2026-06-15_`. */
export function changelogDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `_${year}-${month}-${day}_`
}

/**
 * Moves the entries of `## Unreleased` to a new `## <version>` section and leaves
 * `## Unreleased` empty. Returns `undefined` when there is nothing to release.
 */
export function releaseChangelog(changelog: string, version: string, date: Date) {
  const lines = changelog.split('\n')
  const start = lines.findIndex((line) => line.trim() === UNRELEASED_HEADING)
  if (start === -1) return undefined

  const nextHeading = lines.findIndex((line, index) => index > start && line.startsWith('## '))
  const end = nextHeading === -1 ? lines.length : nextHeading
  const entries = lines
    .slice(start + 1, end)
    .join('\n')
    .trim()
  if (!entries) return undefined

  const released = [
    ...lines.slice(0, start),
    UNRELEASED_HEADING,
    '',
    `## ${version}`,
    '',
    changelogDate(date),
    '',
    entries,
    '',
    ...lines.slice(end),
  ]
  return { changelog: released.join('\n'), entries }
}

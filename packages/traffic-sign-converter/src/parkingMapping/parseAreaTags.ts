export type ParkingScenarioFixture = {
  fixtureId: string
  signIdentifier: string
  trafficSignKey: string
  placeholders: Record<string, boolean>
  sampleSubstitution: Record<string, string>
  expectedTags: {
    area: string[]
  }
}

export const parseTagAssignment = (assignment: string): { key: string; value: string } => {
  const eq = assignment.indexOf('=')
  if (eq === -1) return { key: assignment, value: '' }
  return { key: assignment.slice(0, eq), value: assignment.slice(eq + 1) }
}

export const substituteParkingAreaTags = (
  areaTags: string[],
  sampleSubstitution: ParkingScenarioFixture['sampleSubstitution'],
): Map<string, string> => {
  const result = new Map<string, string>()

  for (const assignment of areaTags) {
    if (assignment.startsWith('traffic_sign=')) continue

    const { key, value } = parseTagAssignment(assignment)
    const substituted = value.replace(
      /\b(SEITE|OPENINGHOURS|TIME|AUSWEIS|OTHER)\b/g,
      (token) => sampleSubstitution[token] ?? token,
    )
    result.set(key, substituted)
  }

  return result
}

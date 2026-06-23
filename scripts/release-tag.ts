/** Prefixed monorepo release tag, e.g. `@osm-traffic-signs/converter@0.6.0`. */
export function releaseTagName(packageName: string, version: string): string {
  return `${packageName}@${version}`
}

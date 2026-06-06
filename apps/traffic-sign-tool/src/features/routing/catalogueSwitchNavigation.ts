import type { CountryPrefixType } from '@osm-traffic-signs/converter'

/** Preserve the current sub-route when switching catalogue country prefix. */
export const buildCatalogueSwitchPath = (
  fromPrefix: CountryPrefixType,
  toPrefix: CountryPrefixType,
  pathname: string,
): string => {
  const fromBase = `/${fromPrefix}`
  if (pathname === fromBase) {
    return `/${toPrefix}`
  }
  if (pathname.startsWith(`${fromBase}/`)) {
    return `/${toPrefix}${pathname.slice(fromBase.length)}`
  }
  return `/${toPrefix}`
}

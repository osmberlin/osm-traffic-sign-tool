import { generalRedirects } from '../data-definitions/generalRedirects.js'
import type { SignType } from '../data-definitions/TrafficSignDataTypes.js'

/**
 * Builds a redirect map from sign definitions, including general redirects.
 */
export const buildRedirectMap = (signs: SignType[]) => {
  const redirectMap = new Map<string, string>()

  // Add sign-specific redirects
  for (const sign of signs) {
    if (sign.redirects) {
      for (const redirect of sign.redirects) {
        redirectMap.set(redirect.from, redirect.to)
      }
    }
  }

  // Add general redirects
  for (const redirect of generalRedirects) {
    redirectMap.set(redirect.from, redirect.to)
  }

  return redirectMap
}

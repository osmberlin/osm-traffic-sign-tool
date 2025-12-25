/**
 * @param {string} urlKey - Input like "DE:123", "DE:123[4.4]", "123-45", '"Kfz-Verkehr frei"'
 */
export const splitSignIdSignValue = (urlKey: string) => {
  // Handle free-text signs (quoted strings)
  if (urlKey.startsWith('"') && urlKey.endsWith('"')) {
    return {
      signId: urlKey,
      signValue: undefined,
    }
  }

  // TODO: This code is dirty and should be an regex…
  return {
    signId: urlKey.split('[').at(0)!,
    signValue: urlKey.split('[').at(1)?.replace(']', ''),
  }
}

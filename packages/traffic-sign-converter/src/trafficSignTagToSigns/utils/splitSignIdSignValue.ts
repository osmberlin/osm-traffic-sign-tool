/**
 * @param {string} urlKey - Input like "DE:123", "DE:123[4.4]", "123-45"
 */
export const splitSignIdSignValue = (urlKey: string) => {
  // TODO: This code is dirty and should be an regex…
  return {
    signId: urlKey.split('[').at(0)!,
    signValue: urlKey.split('[').at(1)?.replace(']', ''),
  }
}

// Input like "DE:123", "DE:123[4.4]", "123-45"
export const splitUrlKey = (urlKey: string) => {
  // TODO: This code is dirty and should be an regex…
  return {
    signKey: urlKey.split('[').at(0)!,
    signValue: urlKey.split('[').at(1)?.replace(']', ''),
  }
}

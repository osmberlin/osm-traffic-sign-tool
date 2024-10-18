// Output is "DE:123", "DE:123[4.4]", "123-45"
export const combineSignIdSignValue = (signId: string, signValue: string | undefined) => {
  if (signValue) {
    return `${signId}[${signValue}]`
  }

  return signId
}

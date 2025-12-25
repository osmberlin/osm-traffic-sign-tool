// Output is "DE:123", "DE:123[4.4]", "123-45", '"Kfz-Verkehr frei"'
export const combineSignIdSignValue = (signId: string, signValue: string | number | undefined) => {
  // Handle free-text signs (quoted strings) - they don't combine with values
  if (signId.startsWith('"') && signId.endsWith('"')) {
    return signId
  }

  if (signValue) {
    return `${signId}[${signValue}]`
  }

  return signId
}

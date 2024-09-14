export const removeDuplicates = <T extends any[]>(nestedArray: T) => {
  const seen: Record<string, true> = {}
  const unique = nestedArray.filter((item) => {
    if (seen[item[0]]) {
      return false
    } else {
      seen[item[0]] = true
      return true
    }
  })
  return unique
}

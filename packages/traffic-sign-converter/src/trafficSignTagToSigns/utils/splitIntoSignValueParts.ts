export const splitIntoSignValueParts = (input: string) => {
  const split = input.split(/[,;](?![^\[\]]*\])/)
  return split.map((s) => s.trim())
}

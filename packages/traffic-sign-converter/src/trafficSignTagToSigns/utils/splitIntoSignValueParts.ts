export const splitIntoSignValueParts = (input: string) => {
  return input.split(/[,;](?![^\[\]]*\])/)
}

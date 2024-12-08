export type TagObjectType = { key: string; value: string }

export const toTag = ({ key, value }: TagObjectType) => {
  return `${key}=${value}` satisfies `${string}=${string}`
}

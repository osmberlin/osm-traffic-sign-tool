import type { getSignsMap } from './getSignsMap.js'

export const getSignBySignId = (map: ReturnType<typeof getSignsMap>, signId: string) => {
  for (const [key, value] of map.entries()) {
    if (value.signId === signId) {
      return value
    }
  }
  return undefined
}

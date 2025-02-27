export function uniqueArray(arr: string[]): string[] {
  return Array.from(new Set(arr))
}

export function cleanFilename(input: string) {
  const name = input
    .trim()
    .toUpperCase()
    .replaceAll('DE:', 'DE')
    .replaceAll('[…]', '')
    .replaceAll('TRAFFIC_SIGN', '')
    .replace(/[^A-Z0-9]/g, '_')
  return `${name}`
}

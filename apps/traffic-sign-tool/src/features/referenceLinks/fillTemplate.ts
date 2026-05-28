export const fillTemplate = (template: string, values: Record<string, string>): string =>
  Object.entries(values).reduce((url, [key, value]) => url.replaceAll(`{${key}}`, value), template)

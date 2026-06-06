import { isSupportedLang } from '@app/src/features/routing/lang'
import type { CountryPrefixType } from '@osm-traffic-signs/converter'

const STORAGE_KEY = 'tst:catalogue-country'

export const readCataloguePreference = (): CountryPrefixType | null => {
  if (typeof localStorage === 'undefined') {
    return null
  }

  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (!value || !isSupportedLang(value)) {
      return null
    }

    return value
  } catch {
    return null
  }
}

export const writeCataloguePreference = (country: CountryPrefixType): void => {
  if (typeof localStorage === 'undefined') {
    return
  }

  try {
    localStorage.setItem(STORAGE_KEY, country)
  } catch {
    // Ignore quota errors or blocked storage; navigation can still proceed.
  }
}

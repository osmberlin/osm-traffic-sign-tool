import {
  readCataloguePreference,
  writeCataloguePreference,
} from '@app/src/features/routing/cataloguePreference'
import { afterEach, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'

const STORAGE_KEY = 'tst:catalogue-country'
const store = new Map<string, string>()

beforeAll(() => {
  Object.defineProperty(globalThis, 'localStorage', {
    value: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value)
      },
      removeItem: (key: string) => {
        store.delete(key)
      },
      clear: () => {
        store.clear()
      },
    },
    writable: true,
  })
})

describe('cataloguePreference', () => {
  beforeEach(() => {
    store.clear()
  })

  afterEach(() => {
    store.clear()
  })

  test('returns null when no preference is stored', () => {
    expect(readCataloguePreference()).toBeNull()
  })

  test('writes and reads a valid catalogue country', () => {
    writeCataloguePreference('DE')
    expect(localStorage.getItem(STORAGE_KEY)).toBe('DE')
    expect(readCataloguePreference()).toBe('DE')
  })

  test('returns null for unsupported stored values', () => {
    store.set(STORAGE_KEY, 'XX')
    expect(readCataloguePreference()).toBeNull()
  })

  test('ignores write failures from blocked storage', () => {
    const originalLocalStorage = globalThis.localStorage
    const setItem = vi.fn(() => {
      throw new Error('QuotaExceededError')
    })

    try {
      Object.defineProperty(globalThis, 'localStorage', {
        value: {
          getItem: (key: string) => store.get(key) ?? null,
          setItem,
          removeItem: (key: string) => {
            store.delete(key)
          },
          clear: () => {
            store.clear()
          },
        },
        writable: true,
      })

      expect(() => writeCataloguePreference('DE')).not.toThrow()
      expect(setItem).toHaveBeenCalledWith(STORAGE_KEY, 'DE')
      expect(readCataloguePreference()).toBeNull()
    } finally {
      Object.defineProperty(globalThis, 'localStorage', {
        value: originalLocalStorage,
        writable: true,
      })
    }
  })
})

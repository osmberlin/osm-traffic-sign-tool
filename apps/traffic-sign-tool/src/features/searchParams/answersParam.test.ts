import { describe, expect, test } from 'vitest'
import { parseAnswersParam, serializeAnswersParam } from './answersParam'
import {
  answersStorageKey,
  mergeAnswersFromCache,
  pruneAnswersForSigns,
  readAnswersCache,
  writeAnswersCache,
} from './answersStorage'

describe('answersParam', () => {
  test('roundtrips answer map as compact search string', () => {
    const answers = {
      '237': { sidepath: 'yes', surfaceColor: 'red' },
    }

    expect(serializeAnswersParam(answers)).toBe('237.sidepath.yes,237.surfaceColor.red')
    expect(parseAnswersParam(serializeAnswersParam(answers))).toEqual(answers)
  })

  test('parses legacy JSON string answers', () => {
    const answers = {
      '237': { sidepath: 'yes' },
    }

    expect(parseAnswersParam(JSON.stringify(answers))).toEqual(answers)
  })

  test('parses legacy router search object answers', () => {
    const answers = {
      '240': { sidepath: 'yes' },
    }

    expect(parseAnswersParam(answers)).toEqual(answers)
    expect(serializeAnswersParam(answers)).toBe('240.sidepath.yes')
  })

  test('skips malformed compact entries without discarding valid ones', () => {
    expect(parseAnswersParam('240.sidepath.yes,bad-entry,237.surfaceColor.red')).toEqual({
      '240': { sidepath: 'yes' },
      '237': { surfaceColor: 'red' },
    })
  })
})

describe('answersStorage', () => {
  test('merges cache entries for active sign questions', () => {
    const signs = [
      {
        recodgnizedSign: true,
        osmValuePart: '237',
        questions: [{ questionId: 'sidepath', questionI18nKey: 'sidepath.prompt', answers: [] }],
      },
    ] as any

    const merged = mergeAnswersFromCache({}, signs, {
      '237': { sidepath: 'yes' },
      '999': { sidepath: 'no' },
    })

    expect(merged).toEqual({ '237': { sidepath: 'yes' } })
  })

  test('prunes stale sign keys', () => {
    const signs = [
      {
        recodgnizedSign: true,
        osmValuePart: '237',
        questions: [{ questionId: 'sidepath', questionI18nKey: 'sidepath.prompt', answers: [] }],
      },
    ] as any

    expect(
      pruneAnswersForSigns(
        {
          '237': { sidepath: 'yes' },
          '999': { sidepath: 'no' },
        },
        signs,
      ),
    ).toEqual({ '237': { sidepath: 'yes' } })
  })

  test('scopes localStorage cache by country prefix', () => {
    const store = new Map<string, string>()
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

    expect(answersStorageKey('DE')).toBe('tst:DE:answers')
    writeAnswersCache('DE', { '237': { sidepath: 'yes' } })
    expect(readAnswersCache('DE')).toEqual({ '237': { sidepath: 'yes' } })
    expect(readAnswersCache('AT')).toEqual({})
  })
})

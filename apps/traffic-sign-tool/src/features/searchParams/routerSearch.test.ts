import { parseSearchWith } from '@tanstack/react-router'
import { describe, expect, test } from 'vitest'
import { routerSearch } from './routerSearch'

const parseSearch = parseSearchWith(JSON.parse)

describe('routerSearch', () => {
  test('stringify keeps compact answers readable in the location bar', () => {
    const search = {
      signs: 'DE:240',
      answers: '240.sidepath.yes',
    }
    const query = routerSearch.stringify(search)

    expect(query).toContain('signs=DE:240')
    expect(query).toContain('answers=240.sidepath.yes')
    expect(query).not.toContain('%22')

    const url = new URL(`http://localhost:5173/DE${query}`)
    expect(url.searchParams.get('answers')).toBe('240.sidepath.yes')
    expect(parseSearch(query.startsWith('?') ? query.slice(1) : query)).toEqual(search)
  })
})

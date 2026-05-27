import { useReplaceDeSearch } from '@app/app/(signs)/_components/store/useReplaceDeSearch'
import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

const mockUseNavigate = vi.fn()
const mockUseSearch = vi.fn()

vi.mock('@tanstack/react-router', () => ({
  useNavigate: (...args: unknown[]) => mockUseNavigate(...args),
  useSearch: (...args: unknown[]) => mockUseSearch(...args),
}))

describe('useReplaceDeSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('updates search params with replace and no scroll reset', () => {
    const navigate = vi.fn().mockResolvedValue(undefined)
    const currentSearch = { q: 'existing' }
    const setSearch = vi.fn((prev) => ({ ...prev, q: 'next' }))

    mockUseNavigate.mockReturnValue(navigate)
    mockUseSearch.mockReturnValue(currentSearch)

    const { result } = renderHook(() => useReplaceDeSearch())

    act(() => {
      result.current.replaceSearch(setSearch)
    })

    expect(result.current.search).toEqual(currentSearch)
    expect(mockUseNavigate).toHaveBeenCalledWith()
    expect(mockUseSearch).toHaveBeenCalledWith({ strict: false })
    expect(navigate).toHaveBeenCalledWith({
      to: '.',
      replace: true,
      resetScroll: false,
      search: setSearch,
    })
  })
})

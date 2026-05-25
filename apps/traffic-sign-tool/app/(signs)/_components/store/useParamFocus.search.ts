'use client'
import {
  type FocusArea,
  parseFocusParam,
  serializeFocusParam,
} from '@app/src/features/searchParams/deSearch'
import { useNavigate, useSearch } from '@tanstack/react-router'

export const useParamFocus = () => {
  const navigate = useNavigate({ from: '/$lang' })
  const search = useSearch({ from: '/$lang' })
  const focuses = parseFocusParam(search.focus)

  const setFocuses = (next: FocusArea[]) => {
    const withoutDefault = next.filter((f) => f !== 'default')
    void navigate({
      replace: true,
      resetScroll: false,
      search: (prev) => ({
        ...prev,
        focus: serializeFocusParam(withoutDefault),
      }),
    })
  }

  const setSingleFocus = (focus: FocusArea | undefined) => {
    if (!focus || focus === 'default') {
      void navigate({
        replace: true,
        resetScroll: false,
        search: (prev) => ({
          ...prev,
          focus: undefined,
        }),
      })
      return
    }

    void navigate({
      replace: true,
      resetScroll: false,
      search: (prev) => ({
        ...prev,
        focus: serializeFocusParam([focus]),
      }),
    })
  }

  const toggleFocus = (focus: FocusArea) => {
    if (focus === 'default') {
      setSingleFocus(undefined)
      return
    }

    const next = focuses.includes(focus) ? focuses.filter((f) => f !== focus) : [...focuses, focus]
    setFocuses(next)
  }

  const clearFocuses = () => {
    setSingleFocus(undefined)
  }

  /** Single focus for segmented UI; first URL value when multi-select is set manually. */
  const uiFocus: FocusArea =
    focuses.length === 0 ? 'default' : focuses.includes('all') ? 'all' : focuses[0]

  return {
    focuses,
    uiFocus,
    setFocuses,
    setSingleFocus,
    toggleFocus,
    clearFocuses,
  }
}

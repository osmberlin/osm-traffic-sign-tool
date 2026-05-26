'use client'
import type { DeSearchSchema } from '@app/src/features/searchParams/deSearch'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useCallback } from 'react'

/**
 * Updates URL search params on the current route without changing pathname or scroll position.
 */
export const useReplaceDeSearch = () => {
  const navigate = useNavigate()
  const search = useSearch({ from: '/$lang' })

  const replaceSearch = useCallback(
    (setSearch: (prev: DeSearchSchema) => DeSearchSchema) => {
      const scrollY = window.scrollY

      void navigate({
        to: '.',
        replace: true,
        resetScroll: false,
        search: setSearch,
      }).then(() => {
        const maxScrollY = Math.max(
          0,
          document.documentElement.scrollHeight - window.innerHeight,
        )
        window.scrollTo(0, Math.min(scrollY, maxScrollY))
      })
    },
    [navigate],
  )

  return { search, replaceSearch }
}

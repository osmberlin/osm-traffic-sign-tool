'use client'
import type { DeSearchSchema } from '@app/src/features/searchParams/deSearch'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useCallback } from 'react'

/**
 * Updates search params on the current route while preserving scroll via TanStack Router.
 */
export const useReplaceDeSearch = () => {
  const navigate = useNavigate({ from: '/$lang' })
  const search = useSearch({ from: '/$lang' })

  const replaceSearch = useCallback(
    (setSearch: (prev: DeSearchSchema) => DeSearchSchema) => {
      void navigate({
        replace: true,
        resetScroll: false,
        search: setSearch,
      })
    },
    [navigate],
  )

  return { search, replaceSearch }
}

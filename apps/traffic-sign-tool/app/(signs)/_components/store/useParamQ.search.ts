import { useNavigate, useSearch } from '@tanstack/react-router'

export const useParamQ = () => {
  const navigate = useNavigate({ from: '/DE' })
  const search = useSearch({ from: '/DE' })
  const paramQ = search.q ?? null

  const setParamQ = (value: string | null) => {
    void navigate({
      replace: true,
      resetScroll: false,
      search: (prev) => ({
        ...prev,
        q: value || undefined,
      }),
    })
  }

  return { paramQ, setParamQ }
}

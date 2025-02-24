import { parseAsString, useQueryState } from 'nuqs'

export const useParamQ = () => {
  const [paramQ, setParamQ] = useQueryState('q', parseAsString)

  return { paramQ, setParamQ }
}

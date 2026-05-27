import { useReplaceDeSearch } from '@app/app/(signs)/_components/store/useReplaceDeSearch'
import {
  parseCombinationQaParam,
  serializeCombinationQaParam,
  type CombinationQaFilter,
} from '@app/src/features/searchParams/deSearch'

export const useParamCombinationQa = () => {
  const { search, replaceSearch } = useReplaceDeSearch()
  const combinationFilter = parseCombinationQaParam(search.comb)

  const setCombinationFilter = (filter: CombinationQaFilter) => {
    replaceSearch((prev) => ({
      ...prev,
      comb: serializeCombinationQaParam(filter),
    }))
  }

  return {
    combinationFilter,
    setCombinationFilter,
  }
}

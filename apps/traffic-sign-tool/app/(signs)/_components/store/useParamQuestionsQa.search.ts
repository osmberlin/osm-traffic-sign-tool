import { useReplaceDeSearch } from '@app/app/(signs)/_components/store/useReplaceDeSearch'
import {
  parseQuestionsQaParam,
  serializeQuestionsQaParam,
  type QuestionsQaFilter,
} from '@app/src/features/searchParams/deSearch'

export const useParamQuestionsQa = () => {
  const { search, replaceSearch } = useReplaceDeSearch()
  const qqaFilter = parseQuestionsQaParam(search.qqa)

  const setQqaFilter = (filter: QuestionsQaFilter) => {
    replaceSearch((prev) => ({
      ...prev,
      qqa: serializeQuestionsQaParam(filter),
    }))
  }

  return {
    qqaFilter,
    setQqaFilter,
  }
}

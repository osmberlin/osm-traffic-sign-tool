'use client'
import { useReplaceDeSearch } from '@app/app/(signs)/_components/store/useReplaceDeSearch'
import {
  parseTaggingQaParam,
  serializeTaggingQaParam,
  type TaggingSuggestionsQaFilter,
} from '@app/src/features/searchParams/deSearch'

export const useParamTaggingQa = () => {
  const { search, replaceSearch } = useReplaceDeSearch()
  const qaFilter = parseTaggingQaParam(search.qa)

  const setQaFilter = (filter: TaggingSuggestionsQaFilter) => {
    replaceSearch((prev) => ({
      ...prev,
      qa: serializeTaggingQaParam(filter),
    }))
  }

  return {
    qaFilter,
    setQaFilter,
  }
}

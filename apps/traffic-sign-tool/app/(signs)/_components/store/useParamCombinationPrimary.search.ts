import { useReplaceDeSearch } from '@app/app/(signs)/_components/store/useReplaceDeSearch'

export const useParamCombinationPrimary = () => {
  const { search, replaceSearch } = useReplaceDeSearch()
  const primaryOsmValuePart = search.primary

  const setPrimaryOsmValuePart = (osmValuePart: string | undefined) => {
    replaceSearch((prev) => ({
      ...prev,
      primary: osmValuePart,
    }))
  }

  return {
    primaryOsmValuePart,
    setPrimaryOsmValuePart,
  }
}

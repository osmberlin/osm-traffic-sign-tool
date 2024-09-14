import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'

export const useParamSigns = () => {
  const [paramSigns, setParamSigns] = useQueryState(
    'signs',
    parseAsArrayOf(parseAsString).withDefault([]),
  )

  const toggleSignkey = (urlKey: string) => {
    if (paramSigns.includes(urlKey)) {
      // remove
      setParamSigns(paramSigns.filter((id) => id !== urlKey))
    } else {
      // add
      setParamSigns([...(paramSigns ?? []), urlKey])
    }
  }

  return { paramSigns, setParamSigns, toggleSignkey }
}

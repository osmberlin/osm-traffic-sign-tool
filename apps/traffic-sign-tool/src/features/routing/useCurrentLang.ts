import { useParams } from '@tanstack/react-router'
import { defaultLang } from './lang'

export const useCurrentLang = () => {
  const params = useParams({ strict: false })
  return params.lang ?? defaultLang
}

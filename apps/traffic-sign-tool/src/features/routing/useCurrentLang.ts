import { useParams } from '@tanstack/react-router'
import { defaultLang, isSupportedLang } from './lang'

/** Sign catalogue country prefix from `/$lang` (e.g. `DE`). Not the Paraglide UI locale. */
export const useCurrentLang = () => {
  const params = useParams({ strict: false })
  const lang = params.lang
  return lang && isSupportedLang(lang) ? lang : defaultLang
}

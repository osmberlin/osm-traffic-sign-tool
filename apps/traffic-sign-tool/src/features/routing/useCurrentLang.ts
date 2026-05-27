import { useParams } from '@tanstack/react-router'
import { defaultLang } from './lang'

/** Sign catalogue country prefix from `/$lang` (e.g. `DE`). Not the Paraglide UI locale. */
export const useCurrentLang = () => {
  const params = useParams({ strict: false })
  return params.lang ?? defaultLang
}

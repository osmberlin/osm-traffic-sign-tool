import { parseSearchWith, stringifySearchWith } from '@tanstack/react-router'

const parseSearch = parseSearchWith(JSON.parse)
const stringifySearchDefault = stringifySearchWith(JSON.stringify)

const makeSearchPretty = (searchString: string) => {
  // Keep traffic_sign syntax and answers JSON readable in shared URLs.
  // We intentionally keep strong URL breakers encoded (e.g. #, &, =, <, >, backtick, %, +).
  // See also https://github.com/47ng/nuqs/commit/383aca75d07908b98782d19ae9b95d6e5b14c1f2, https://github.com/47ng/nuqs/issues/355
  return searchString
    .replaceAll('%22', '"') // quoted free-text + answers JSON keys/values
    .replaceAll('%2C', ',') // sign grouping separator + JSON field separator
    .replaceAll('%27', "'") // apostrophes in free-text
    .replaceAll('%28', '(') // grouped free-text/conditions
    .replaceAll('%29', ')')
    .replaceAll('%3A', ':') // country prefix, times in conditions, JSON key separator
    .replaceAll('%3B', ';') // sign separator
    .replaceAll('%5B', '[') // conditional/value brackets
    .replaceAll('%5D', ']')
    .replaceAll('%7B', '{') // answers object
    .replaceAll('%7D', '}')
}

export const routerSearch = {
  parse: parseSearch,
  stringify: (search: Record<string, unknown>) => {
    return makeSearchPretty(stringifySearchDefault(search))
  },
}

import { parseSearchWith, stringifySearchWith } from '@tanstack/react-router'

const parseSearch = parseSearchWith(JSON.parse)
const stringifySearchDefault = stringifySearchWith(JSON.stringify)

const makeSearchPretty = (searchString: string) => {
  // Keep important traffic_sign syntax readable in shared URLs.
  // We intentionally keep strong URL breakers encoded (e.g. #, &, <, >, backtick, %, +).
  // See also https://github.com/47ng/nuqs/commit/383aca75d07908b98782d19ae9b95d6e5b14c1f2, https://github.com/47ng/nuqs/issues/355
  return searchString
    .replaceAll('%22', '"') // quoted free-text
    .replaceAll('%2C', ',') // sign grouping separator
    .replaceAll('%27', "'") // apostrophes in free-text
    .replaceAll('%28', '(') // grouped free-text/conditions
    .replaceAll('%29', ')')
    .replaceAll('%3A', ':') // country prefix + times in conditions
    .replaceAll('%3B', ';') // sign separator
    .replaceAll('%5B', '[') // conditional/value brackets
    .replaceAll('%5D', ']')
}

export const routerSearch = {
  parse: parseSearch,
  stringify: (search: Record<string, unknown>) => {
    return makeSearchPretty(stringifySearchDefault(search))
  },
}

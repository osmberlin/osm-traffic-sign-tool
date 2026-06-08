import { WIKI_BASE } from './countryWikiConfigs.js'

export const fetchWikiPage = async (slug: string) => {
  const url = `${WIKI_BASE}${slug}`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`)
  return response.text()
}

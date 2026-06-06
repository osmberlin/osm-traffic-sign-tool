import { useEffect, useState } from 'react'

export const useWikiComparisonHashScroll = () => {
  const [highlightedRowId, setHighlightedRowId] = useState<string | null>(null)

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace(/^#/, '')
      if (!hash) {
        setHighlightedRowId(null)
        return
      }

      const element = document.getElementById(hash)
      if (!element) {
        setHighlightedRowId(null)
        return
      }

      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setHighlightedRowId(hash)
      window.setTimeout(() => setHighlightedRowId(null), 2500)
    }

    scrollToHash()
    window.addEventListener('hashchange', scrollToHash)
    return () => window.removeEventListener('hashchange', scrollToHash)
  }, [])

  return highlightedRowId
}

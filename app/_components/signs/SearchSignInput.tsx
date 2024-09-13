import { useParamQ } from '@/app/_store/useParamQ.nuqs'
import { useParamQCountNumber } from '@/app/_store/useParamQCount.zustand'
import { XMarkIcon } from '@heroicons/react/16/solid'
import { useEffect, useRef } from 'react'

export const SearchSignInput = () => {
  const { paramQ, setParamQ } = useParamQ()
  const searchSignsCount = useParamQCountNumber()
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Keyboard shortcut: CMD + K
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === 'k') {
        event.preventDefault()
        if (searchInputRef.current) {
          searchInputRef.current.focus()
          searchInputRef.current.select()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="relative -mt-1.5">
      <div className="relative flex items-center">
        <input
          ref={searchInputRef}
          onChange={(event) => {
            setParamQ(event.target.value)
          }}
          defaultValue={paramQ || ''}
          name="search"
          type="text"
          autoFocus={true}
          className="block rounded-md border-0 px-2 py-1.5 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          placeholder="Search…"
        />
        <div className="absolute inset-y-0 right-0 flex items-center gap-1 py-1.5 pr-1.5">
          <kbd className="inline-flex select-none items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
            ⌘K
          </kbd>
          {paramQ && (
            <button
              onClick={() => {
                setParamQ(null)
                if (searchInputRef.current) {
                  searchInputRef.current.value = ''
                }
              }}
              className="rounded border border-gray-200 px-0.5 text-gray-400 hover:border-gray-200 hover:bg-gray-100 hover:text-gray-800"
            >
              <XMarkIcon className="size-4" />
            </button>
          )}
        </div>
      </div>
      {paramQ && !searchSignsCount && (
        <div className="absolute -bottom-4 right-0.5 text-xs text-indigo-700">No results</div>
      )}
    </div>
  )
}

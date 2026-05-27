import { useParamFocus } from '@app/app/(signs)/_components/store/useParamFocus.search'
import * as m from '@app/paraglide/messages'
import { getFocusLabel } from '@app/src/features/i18n/focusLabels'
import type { FocusArea } from '@app/src/features/searchParams/deSearch'
import { focusAreas } from '@osm-traffic-signs/converter'
import { clsx } from 'clsx'

export const FocusFilterRow = () => {
  const { uiFocus, setSingleFocus } = useParamFocus()

  const handleClick = (focus: FocusArea) => {
    if (uiFocus === focus) {
      setSingleFocus('default')
      return
    }
    setSingleFocus(focus)
  }

  const orderedFocuses = focusAreas as readonly FocusArea[]

  return (
    <nav
      aria-label={m.focus_nav_label()}
      className="w-full rounded-sm px-2 py-1.5 outline -outline-offset-1 outline-stone-500/50"
    >
      <div className="flex flex-wrap gap-x-4 gap-y-0.5">
        {orderedFocuses.map((focus) => {
          const isActive = uiFocus === focus

          return (
            <button
              key={focus}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => handleClick(focus)}
              className={clsx(
                'inline-flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-300 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-800',
                isActive
                  ? 'bg-stone-900 text-stone-50'
                  : 'text-stone-400 hover:bg-stone-700/60 hover:text-stone-100',
              )}
            >
              {getFocusLabel(focus)}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

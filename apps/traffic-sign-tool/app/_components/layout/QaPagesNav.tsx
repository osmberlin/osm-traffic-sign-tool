import { qaPageTabs } from '@app/app/_components/layout/qaPageNavigation'
import * as m from '@app/paraglide/messages'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { hasQaCapability } from '@osm-traffic-signs/converter'
import { Link, useMatchRoute, useNavigate } from '@tanstack/react-router'
import { clsx } from 'clsx'

const tabLinkClassName = 'group flex flex-col justify-end px-4 pt-1'
const tabLabelClassName = 'mb-2 text-sm font-medium whitespace-nowrap'
const tabLabelActiveClassName = 'text-indigo-300'
const tabLabelInactiveClassName = 'text-stone-400 group-hover:text-stone-200'
const tabIndicatorClassName = 'h-0.5 w-[calc(100%+0.5rem)] shrink-0 -mx-1'
const tabIndicatorActiveClassName = 'bg-indigo-400'
const tabIndicatorInactiveClassName = 'bg-transparent group-hover:bg-stone-500'
const tabIndicatorSpacerClassName = 'h-0.5 shrink-0'

export function QaPagesNav() {
  const lang = useCurrentLang()
  const navigate = useNavigate()
  const matchRoute = useMatchRoute()

  const tabs = qaPageTabs.filter((tab) => hasQaCapability(lang, tab.capability))
  const isTabActive = (to: (typeof qaPageTabs)[number]['to']) =>
    Boolean(matchRoute({ to, params: { lang } }))
  const currentTab = tabs.find((tab) => isTabActive(tab.to))

  if (tabs.length === 0) {
    return null
  }

  return (
    <div>
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:gap-0">
        <p className="flex shrink-0 flex-col justify-end pr-4">
          <span className={clsx(tabLabelClassName, 'text-stone-300')}>
            {m.qa_pages_nav_label()}
          </span>
          <span aria-hidden="true" className={tabIndicatorSpacerClassName} />
        </p>

        <div className="grid w-full max-w-md grid-cols-1 sm:hidden">
          <select
            value={currentTab?.id ?? tabs[0]?.id}
            aria-label={m.qa_pages_nav_aria_label()}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            onChange={(event) => {
              const tab = tabs.find((item) => item.id === event.target.value)
              if (tab) {
                void navigate({ to: tab.to, params: { lang } })
              }
            }}
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.name()}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
          />
        </div>

        <nav
          aria-label={m.qa_pages_nav_aria_label()}
          className="relative z-10 hidden items-end sm:flex"
        >
          {tabs.map((tab) => {
            const isActive = isTabActive(tab.to)

            return (
              <Link
                key={tab.id}
                to={tab.to}
                params={{ lang }}
                aria-current={isActive ? 'page' : undefined}
                className={tabLinkClassName}
              >
                <span className="inline-flex w-max flex-col items-center">
                  <span
                    className={clsx(
                      tabLabelClassName,
                      isActive ? tabLabelActiveClassName : tabLabelInactiveClassName,
                    )}
                  >
                    {tab.name()}
                  </span>
                  <span
                    aria-hidden="true"
                    className={clsx(
                      tabIndicatorClassName,
                      isActive ? tabIndicatorActiveClassName : tabIndicatorInactiveClassName,
                    )}
                  />
                </span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

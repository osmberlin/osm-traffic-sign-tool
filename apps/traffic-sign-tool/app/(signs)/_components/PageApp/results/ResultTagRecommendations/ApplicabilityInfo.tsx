import * as m from '@app/paraglide/messages'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import type { GeometryType, SignStateType } from '@osm-traffic-signs/converter'
import { clsx } from 'clsx'
import { useState, type ReactNode } from 'react'

type Props = {
  geometry: GeometryType
  tags: Map<string, string | string[]>
  applicable: SignStateType[]
  notApplicable: SignStateType[]
  copyButton: ReactNode
  children: ReactNode
}

export const ApplicabilityInfo = ({
  geometry,
  tags,
  applicable,
  notApplicable,
  copyButton,
  children,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const isNodeWithOnlyTrafficSign =
    geometry === 'node' && tags.size === 1 && tags.has('traffic_sign')
  const hasNotApplicable = notApplicable.length > 0 && !isNodeWithOnlyTrafficSign

  const applicableSigns = applicable.map((sign) => sign.osmValuePart).join(', ')
  const notApplicableSigns = notApplicable.map((sign) => sign.osmValuePart).join(', ')

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        {children}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsExpanded((value) => !value)}
            className={clsx(
              'inline-flex cursor-pointer items-center rounded-full border border-stone-400 bg-stone-800 px-3 py-1.5 text-xs text-stone-200 shadow-xs focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 focus:outline-hidden enabled:hover:bg-stone-700',
              hasNotApplicable &&
                'border-orange-400 bg-orange-200 text-orange-900 enabled:hover:bg-orange-300',
            )}
            aria-label={m.notes_heading()}
            aria-expanded={isExpanded}
          >
            <InformationCircleIcon
              className={clsx('size-4', hasNotApplicable ? 'text-orange-900' : 'text-stone-200')}
            />
          </button>
          {copyButton}
        </div>
      </div>

      {isExpanded && (
        <div className="mb-4 rounded bg-stone-800 px-3 py-2 text-sm text-stone-200">
          <div className="space-y-1">
            <div>
              <span className="font-medium">Based on:</span> {applicableSigns || m.notes_empty()}
            </div>
            {notApplicable.length > 0 && (
              <div>
                <span className="font-medium">Not applicable:</span> {notApplicableSigns}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

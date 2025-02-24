'use client'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { SignStateType, SignType } from '@osm-traffic-signs/converter'
import { clsx } from 'clsx'
import { Sign } from './Sign'

type Props = {
  headline: string
  defaultOpen?: boolean
  signs: (SignStateType | SignType)[]
}

export const SignGrid = ({ headline, defaultOpen = true, signs }: Props) => {
  return (
    <Disclosure as="section" className="group mb-8" defaultOpen={defaultOpen}>
      <DisclosureButton className="group-data-open:mb-4 mb-0 flex w-full cursor-pointer items-center justify-start gap-1">
        <ChevronRightIcon className="fill-stone/60 group-data-hover:fill-stone/50 group-data-open:rotate-90 size-5" />
        <h2 id={`sign-grid-${headline}`}>
          {headline} ({signs.length})
        </h2>
      </DisclosureButton>
      <DisclosurePanel
        className={clsx(
          signs.length === 0
            ? ''
            : 'grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
        )}
      >
        {signs.length === 0 && (
          <p className="text-center text-sm uppercase text-gray-500">No results</p>
        )}

        {signs.map((sign) => {
          return <Sign key={sign.osmValuePart} sign={sign} />
        })}
      </DisclosurePanel>
    </Disclosure>
  )
}

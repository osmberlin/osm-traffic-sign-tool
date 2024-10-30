import * as Headless from '@headlessui/react'
import type { Route } from 'next'
import NextLink, { type LinkProps } from 'next/link'
import { forwardRef } from 'react'

export const Link = forwardRef(function Link(
  props: LinkProps<Route> & React.ComponentPropsWithoutRef<'a'>,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) {
  return (
    <Headless.DataInteractive>
      <NextLink {...props} ref={ref} />
    </Headless.DataInteractive>
  )
})

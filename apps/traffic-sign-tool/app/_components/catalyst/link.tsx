import * as Headless from '@headlessui/react'
import { Link as RouterLink } from '@tanstack/react-router'
import { forwardRef } from 'react'

export const Link = forwardRef(function Link(
  props: React.ComponentPropsWithoutRef<'a'> & { href: string },
  ref: React.ForwardedRef<HTMLAnchorElement>,
) {
  const { href, ...restProps } = props
  const isExternal = href.startsWith('http://') || href.startsWith('https://')

  return (
    <Headless.DataInteractive>
      {isExternal ? (
        <a {...restProps} href={href} ref={ref} />
      ) : (
        <RouterLink {...restProps} to={href} ref={ref} />
      )}
    </Headless.DataInteractive>
  )
})

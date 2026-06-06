import { clsx } from 'clsx'
import type { ReactNode } from 'react'

type Props = {
  content: string
  children: ReactNode
  className?: string
}

/** Lightweight hover tooltip (no external library). */
export const HoverTooltip = ({ content, children, className }: Props) => (
  <span className={clsx('group/tooltip relative inline-flex', className)}>
    {children}
    <span
      role="tooltip"
      className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1 hidden w-max max-w-sm -translate-x-1/2 rounded-sm bg-stone-800 px-3 py-1.5 text-center text-xs font-normal whitespace-normal text-stone-50 normal-case group-hover/tooltip:block"
    >
      {content}
    </span>
  </span>
)

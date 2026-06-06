import { clsx } from 'clsx'
import type { CSSProperties, ReactNode } from 'react'

type Props = {
  children: ReactNode
  intro?: ReactNode
}

export function ContentPageLayout({ children, intro }: Props) {
  return (
    <div className="w-full min-w-0 px-0 md:px-4 lg:px-8">
      <article
        className={clsx(
          'w-full min-w-0 bg-stone-300 text-zinc-950 md:rounded-sm',
          intro ? 'overflow-hidden' : 'px-3 py-4 md:px-6 md:py-6',
        )}
        style={{ colorScheme: 'light' } as CSSProperties}
      >
        {intro}
        {intro ? <div className="px-3 py-4 md:px-6 md:py-6">{children}</div> : children}
      </article>
    </div>
  )
}

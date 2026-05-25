import type { CSSProperties, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export function ContentPageLayout({ children }: Props) {
  return (
    <div className="w-full min-w-0 px-0 md:px-4 lg:px-8">
      <article
        className="w-full min-w-0 bg-stone-300 px-3 py-4 text-zinc-950 md:rounded-sm md:px-6 md:py-6"
        style={{ colorScheme: 'light' } as CSSProperties}
      >
        {children}
      </article>
    </div>
  )
}

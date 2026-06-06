import type { ComponentType, ReactNode, SVGProps } from 'react'

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

type ContentPageIntroProps = {
  children: ReactNode
}

export function ContentPageIntro({ children }: ContentPageIntroProps) {
  return (
    <section className="border-b border-stone-500/40 bg-stone-400 px-3 py-6 md:px-6 md:py-8">
      {children}
    </section>
  )
}

type ContentPageIntroTitleProps = {
  children: ReactNode
}

export function ContentPageIntroTitle({ children }: ContentPageIntroTitleProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-light tracking-tight text-zinc-950">{children}</h2>
    </div>
  )
}

type ContentPageIntroRowsProps = {
  children: ReactNode
}

export function ContentPageIntroRows({ children }: ContentPageIntroRowsProps) {
  return <div className="mx-auto mt-8 max-w-lg space-y-8">{children}</div>
}

type ContentPageIntroRowProps = {
  icon: IconComponent
  title: string
  children: ReactNode
}

export function ContentPageIntroRow({ icon: Icon, title, children }: ContentPageIntroRowProps) {
  return (
    <div className="flex gap-x-4">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-stone-800">
        <Icon aria-hidden="true" className="size-5 text-stone-200" />
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-zinc-950">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-stone-800">{children}</p>
      </div>
    </div>
  )
}

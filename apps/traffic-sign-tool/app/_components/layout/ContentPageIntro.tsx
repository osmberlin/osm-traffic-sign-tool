import { Children, isValidElement, type ComponentType, type ReactNode, type SVGProps } from 'react'

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

const introBodyClassName = 'text-sm leading-snug text-stone-800'

function renderIntroRowBody(children: ReactNode) {
  return Children.map(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return <p className={introBodyClassName}>{child}</p>
    }

    if (isValidElement(child)) {
      return child
    }

    return null
  })
}

export function ContentPageIntroRow({ icon: Icon, title, children }: ContentPageIntroRowProps) {
  return (
    <div className="flex gap-x-4">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-stone-800">
        <Icon aria-hidden="true" className="size-5 text-stone-200" />
      </div>
      <div className="min-w-0">
        <h3 className="text-sm leading-snug font-semibold text-zinc-950">{title}</h3>
        <div className="mt-0.5 flex flex-col gap-2">{renderIntroRowBody(children)}</div>
      </div>
    </div>
  )
}

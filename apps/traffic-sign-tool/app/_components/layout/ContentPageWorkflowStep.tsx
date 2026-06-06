import clsx from 'clsx'
import type { ReactNode } from 'react'

export type ContentPageWorkflowStepVariant = 'intro' | 'content'

export type ContentPageWorkflowLetter = 'A' | 'B' | 'C'

const badgeVariantClassName: Record<ContentPageWorkflowStepVariant, string> = {
  intro: 'bg-stone-800 text-stone-200',
  content: 'bg-blue-600 text-white',
}

const letterBadgeVariantClassName = {
  intro: 'bg-stone-800 text-stone-200 group-hover:bg-purple-600 group-hover:text-white',
  content: 'bg-purple-600 text-white',
} as const

const hoverColorTransitionClassName = 'transition-colors duration-200 ease-in-out'

const introHoverStepBadgeClassName = clsx(
  'bg-stone-800 text-stone-200 group-hover:bg-blue-600 group-hover:text-white',
  hoverColorTransitionClassName,
)

export type ContentPageWorkflowLetterVariant = keyof typeof letterBadgeVariantClassName

const badgeBaseClassName = clsx(
  'flex size-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold tabular-nums',
  hoverColorTransitionClassName,
)

type ContentPageWorkflowStepBadgeProps = {
  step: number
  variant?: ContentPageWorkflowStepVariant
  className?: string
}

export function ContentPageWorkflowStepBadge({
  step,
  variant = 'intro',
  className,
}: ContentPageWorkflowStepBadgeProps) {
  return (
    <span
      aria-hidden="true"
      className={clsx(badgeBaseClassName, badgeVariantClassName[variant], className)}
    >
      {step}
    </span>
  )
}

type ContentPageWorkflowStepLabelProps = {
  step: number
  children: ReactNode
  className?: string
  variant?: ContentPageWorkflowStepVariant
}

export function ContentPageWorkflowStepLabel({
  step,
  children,
  className,
  variant = 'content',
}: ContentPageWorkflowStepLabelProps) {
  return (
    <span className={clsx('inline-flex items-center gap-2', className)}>
      <ContentPageWorkflowStepBadge step={step} variant={variant} />
      <span>{children}</span>
    </span>
  )
}

type ContentPageWorkflowStepListProps = {
  children: ReactNode
  className?: string
}

export function ContentPageWorkflowStepList({
  children,
  className,
}: ContentPageWorkflowStepListProps) {
  return <ul className={clsx('space-y-1.5', className)}>{children}</ul>
}

type ContentPageWorkflowStepListItemProps = {
  step: number
  children: ReactNode
  highlightBadgeOnHover?: boolean
}

export function ContentPageWorkflowStepListItem({
  step,
  children,
  highlightBadgeOnHover = false,
}: ContentPageWorkflowStepListItemProps) {
  return (
    <li className="flex items-start gap-3">
      <ContentPageWorkflowStepBadge
        step={step}
        variant="intro"
        className={highlightBadgeOnHover ? introHoverStepBadgeClassName : undefined}
      />
      <span className="min-w-0 pt-0.5 text-sm leading-snug text-stone-800">{children}</span>
    </li>
  )
}

type ContentPageWorkflowStepGroupProps = {
  step: number
  children: ReactNode
  className?: string
}

export function ContentPageWorkflowStepGroup({
  step,
  children,
  className,
}: ContentPageWorkflowStepGroupProps) {
  return (
    <section
      className={clsx('rounded-sm outline -outline-offset-1 outline-stone-500/50', className)}
    >
      <div className="flex items-start gap-2 p-2">
        <ContentPageWorkflowStepBadge step={step} variant="content" className="mt-1.5" />
        <div className="min-w-0 flex-1 space-y-3">{children}</div>
      </div>
    </section>
  )
}

type ContentPageWorkflowLetterBadgeProps = {
  letter: ContentPageWorkflowLetter
  className?: string
  variant?: ContentPageWorkflowLetterVariant
}

export function ContentPageWorkflowLetterBadge({
  letter,
  className,
  variant = 'intro',
}: ContentPageWorkflowLetterBadgeProps) {
  return (
    <span
      aria-hidden="true"
      className={clsx(badgeBaseClassName, letterBadgeVariantClassName[variant], className)}
    >
      {letter}
    </span>
  )
}

type ContentPageWorkflowLetterListProps = {
  children: ReactNode
  className?: string
}

export function ContentPageWorkflowLetterList({
  children,
  className,
}: ContentPageWorkflowLetterListProps) {
  return <ul className={clsx('space-y-1.5', className)}>{children}</ul>
}

type ContentPageWorkflowLetterListItemProps = {
  letter: ContentPageWorkflowLetter
  children: ReactNode
  variant?: ContentPageWorkflowLetterVariant
}

export function ContentPageWorkflowLetterListItem({
  letter,
  children,
  variant = 'intro',
}: ContentPageWorkflowLetterListItemProps) {
  return (
    <li className="flex items-start gap-3">
      <ContentPageWorkflowLetterBadge letter={letter} variant={variant} />
      <span className="min-w-0 pt-0.5 text-sm leading-snug text-stone-800">{children}</span>
    </li>
  )
}

type ContentPageWorkflowLetterLabelProps = {
  letter: ContentPageWorkflowLetter
  children: ReactNode
  className?: string
  variant?: ContentPageWorkflowLetterVariant
}

export function ContentPageWorkflowLetterLabel({
  letter,
  children,
  className,
  variant = 'content',
}: ContentPageWorkflowLetterLabelProps) {
  return (
    <span className={clsx('inline-flex items-center gap-2', className)}>
      <ContentPageWorkflowLetterBadge letter={letter} variant={variant} />
      <span>{children}</span>
    </span>
  )
}

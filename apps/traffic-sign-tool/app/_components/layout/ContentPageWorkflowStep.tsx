import clsx from 'clsx'
import type { ReactNode } from 'react'

export type ContentPageWorkflowStepVariant = 'intro' | 'content'

const badgeVariantClassName: Record<ContentPageWorkflowStepVariant, string> = {
  intro: 'bg-stone-800 text-stone-200',
  content: 'bg-blue-600 text-white',
}

const badgeBaseClassName =
  'flex size-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold tabular-nums'

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
}

export function ContentPageWorkflowStepListItem({
  step,
  children,
}: ContentPageWorkflowStepListItemProps) {
  return (
    <li className="flex items-start gap-3">
      <ContentPageWorkflowStepBadge step={step} variant="intro" />
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

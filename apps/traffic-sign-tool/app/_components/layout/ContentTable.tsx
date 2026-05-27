import clsx from 'clsx'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export const contentPreClass = 'whitespace-pre-wrap break-words text-xs leading-snug'

type TableProps = {
  children: ReactNode
  className?: string
  /** Sets language for catalogue/UI copy inside the table (BCP 47). */
  lang?: string
}

export function ContentTable({ children, className, lang }: TableProps) {
  return (
    <div className={clsx('mt-10 w-full min-w-0', className)} lang={lang}>
      <table className="w-full table-fixed border-collapse text-left text-sm text-zinc-950">
        {children}
      </table>
    </div>
  )
}

export function ContentTableHead({ children, className }: TableProps) {
  return <thead className={clsx('text-zinc-500', className)}>{children}</thead>
}

export function ContentTableBody({ children, className }: TableProps) {
  return <tbody className={className}>{children}</tbody>
}

export function ContentTableRow({
  children,
  className,
}: ComponentPropsWithoutRef<'tr'> & { children: ReactNode }) {
  return <tr className={className}>{children}</tr>
}

export function ContentTableHeader({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'th'> & { children: ReactNode }) {
  return (
    <th
      className={clsx(
        'min-w-0 border-b border-zinc-950/10 px-3 py-2 align-top font-medium break-words',
        className,
      )}
      {...props}
    >
      {children}
    </th>
  )
}

export function ContentTableCell({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'td'> & { children: ReactNode }) {
  return (
    <td
      className={clsx(
        'min-w-0 border-b border-zinc-950/5 px-3 py-3 align-top break-words',
        className,
      )}
      {...props}
    >
      {children}
    </td>
  )
}

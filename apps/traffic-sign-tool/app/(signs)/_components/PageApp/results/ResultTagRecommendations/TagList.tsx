import { clsx } from 'clsx'
import { Tag } from '../../../wiki/Tag'

const notesListClassName =
  'prose-code:bg-white/10 prose-code:rounded prose-code:px-0.5 prose-white prose-a:underline prose-a:decoration-stone-700 prose-a:underline-offset-4 prose-a:hover:decoration-stone-400 prose-a:hover:decoration-1 prose-code:whitespace-nowrap list-disc space-y-2 pl-5 font-serif text-sm font-normal break-all'

type Props = {
  tags: Map<string, string | string[]>
  className?: string
  variant?: 'default' | 'optional'
}

export const TagList = ({ tags, className, variant = 'default' }: Props) => {
  return (
    <ul
      className={clsx(
        variant === 'optional' ? notesListClassName : className,
        variant === 'default' && className,
      )}
    >
      {Array.from(tags).map(([key, value]) => {
        return (
          <li
            key={key}
            className={clsx(
              variant === 'default' && 'rounded-sm px-2 py-0.5 leading-tight hover:bg-white/5',
              key === 'traffic_sign' ? 'break-all' : 'break-words',
            )}
          >
            <Tag tagKey={key} tagValue={value} />
          </li>
        )
      })}
    </ul>
  )
}

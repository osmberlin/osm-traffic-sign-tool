import { clsx } from 'clsx'
import { Tag } from '../../../wiki/Tag'

type Props = { tags: Map<string, string | string[]>; className?: string }

export const TagList = ({ tags, className }: Props) => {
  return (
    <ul className={className}>
      {Array.from(tags).map(([key, value]) => {
        return (
          <li
            key={key}
            className={clsx(
              'rounded-sm px-2 py-0.5 leading-tight hover:bg-white/5',
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

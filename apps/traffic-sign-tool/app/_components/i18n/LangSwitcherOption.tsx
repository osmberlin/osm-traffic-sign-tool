import { CheckIcon } from '@heroicons/react/20/solid'
import { clsx } from 'clsx'

type LangSwitcherOptionProps = {
  badge: string
  label: React.ReactNode
  isSelected: boolean
  onClick: () => void
}

export const LangSwitcherOption = ({
  badge,
  label,
  isSelected,
  onClick,
}: LangSwitcherOptionProps) => {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          'group relative flex w-full items-center gap-x-3 rounded-lg p-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500',
          isSelected
            ? 'cursor-default bg-stone-900/80'
            : 'cursor-pointer bg-stone-800/55 ring-1 ring-stone-300/15 ring-inset hover:bg-stone-600/60 hover:ring-stone-300/25',
        )}
        aria-current={isSelected ? 'true' : undefined}
        aria-label={label}
      >
        <div
          className={clsx(
            'flex size-9 flex-none items-center justify-center rounded-lg text-xs font-bold text-stone-200 uppercase',
            isSelected
              ? 'bg-stone-800 ring-1 ring-stone-600/60'
              : 'bg-stone-800 group-hover:bg-stone-700',
          )}
        >
          {badge}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-tight font-medium text-stone-100">{label}</p>
        </div>
        {isSelected ? (
          <CheckIcon aria-hidden="true" className="size-5 shrink-0 text-violet-400" />
        ) : null}
      </button>
    </li>
  )
}

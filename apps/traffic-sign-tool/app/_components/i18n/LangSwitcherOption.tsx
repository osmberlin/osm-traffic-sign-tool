import { CheckIcon } from '@heroicons/react/20/solid'
import { Link } from '@tanstack/react-router'
import { clsx } from 'clsx'

type LangSwitcherOptionBaseProps = {
  badge: React.ReactNode
  /** `plain` omits the boxed badge background (e.g. iconic sign images). */
  badgeVariant?: 'boxed' | 'plain'
  label: React.ReactNode
  ariaLabel: string
  isSelected: boolean
}

type LangSwitcherOptionLinkProps = LangSwitcherOptionBaseProps & {
  linkTo: string
  linkParams?: Record<string, string>
  linkSearch?: Record<string, unknown>
  onNavigate?: () => void
}

type LangSwitcherOptionButtonProps = LangSwitcherOptionBaseProps & {
  onClick: () => void
}

type LangSwitcherOptionProps = LangSwitcherOptionLinkProps | LangSwitcherOptionButtonProps

const isLinkOption = (props: LangSwitcherOptionProps): props is LangSwitcherOptionLinkProps =>
  'linkTo' in props

export const LangSwitcherOption = (props: LangSwitcherOptionProps) => {
  const { badge, badgeVariant = 'boxed', label, ariaLabel, isSelected } = props

  const optionClassName = clsx(
    'group relative flex w-full items-center gap-x-3 rounded-lg p-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500',
    isSelected
      ? 'cursor-default bg-stone-900/80'
      : 'cursor-pointer bg-stone-800/55 ring-1 ring-stone-300/15 ring-inset hover:bg-stone-600/60 hover:ring-stone-300/25',
  )

  const content = (
    <>
      <div
        className={clsx(
          'flex size-9 flex-none items-center justify-center rounded-lg text-xs font-bold text-stone-200 uppercase',
          badgeVariant === 'boxed' &&
            (isSelected
              ? 'bg-stone-800 ring-1 ring-stone-600/60'
              : 'bg-stone-800 group-hover:bg-stone-700'),
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
    </>
  )

  if (isLinkOption(props)) {
    if (isSelected) {
      return (
        <li>
          <span className={optionClassName} aria-current="true" aria-label={ariaLabel}>
            {content}
          </span>
        </li>
      )
    }

    const { linkTo, linkParams, linkSearch, onNavigate } = props
    return (
      <li>
        <Link
          to={linkTo}
          params={linkParams}
          search={linkSearch}
          className={optionClassName}
          aria-label={ariaLabel}
          onClick={() => onNavigate?.()}
        >
          {content}
        </Link>
      </li>
    )
  }

  return (
    <li>
      <button
        type="button"
        onClick={props.onClick}
        className={optionClassName}
        aria-current={isSelected ? 'true' : undefined}
        aria-label={ariaLabel}
      >
        {content}
      </button>
    </li>
  )
}

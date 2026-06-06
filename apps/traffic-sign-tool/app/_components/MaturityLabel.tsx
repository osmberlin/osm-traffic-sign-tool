import { HoverTooltip } from '@app/app/_components/HoverTooltip'
import { stonePillFocus } from '@app/app/_components/links/buttonStyles'
import * as m from '@app/paraglide/messages'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import type { MaturityKey } from '@osm-traffic-signs/converter'
import { Link } from '@tanstack/react-router'
import { clsx } from 'clsx'

type Maturity = Exclude<MaturityKey, 'stable'>

const maturityLabel = (maturity: Maturity) =>
  maturity === 'alpha' ? m.alpha_label() : m.beta_label()

const maturityInfoClass: Record<Maturity, string> = {
  alpha: 'bg-purple-400/10 text-purple-400 inset-ring inset-ring-purple-400/30',
  beta: 'bg-blue-400/10 text-blue-400 inset-ring inset-ring-blue-400/30',
}

const maturityLinkClass: Record<Maturity, string> = {
  alpha: 'bg-purple-500 text-white hover:bg-purple-600',
  beta: 'bg-blue-500 text-white hover:bg-blue-600',
}

type InfoProps = {
  maturity: Maturity
  className?: string
}

/** Square info badge with light background (non-link). */
export const MaturityInfoBadge = ({ maturity, className }: InfoProps) => (
  <span
    className={clsx(
      'inline-flex shrink-0 items-center rounded-sm px-1.5 py-0.5 text-xs leading-tight font-normal normal-case',
      maturityInfoClass[maturity],
      className,
    )}
  >
    {maturityLabel(maturity)}
  </span>
)

/** @deprecated Use `MaturityInfoBadge`. */
export const MaturityLabel = MaturityInfoBadge

type LinkProps = {
  maturity: Maturity
  lang: string
  tooltip: string
  className?: string
}

/** Rounded link badge with full color and hover tooltip. */
export const MaturityLinkBadge = ({ maturity, lang, tooltip, className }: LinkProps) => (
  <HoverTooltip content={tooltip}>
    <Link
      to="/$lang/questions-qa"
      params={{ lang }}
      className={clsx(
        'inline-flex shrink-0 items-center gap-x-0.5 rounded-full px-2 py-0.5 text-xs leading-tight font-medium normal-case transition-colors',
        maturityLinkClass[maturity],
        stonePillFocus,
        className,
      )}
    >
      {maturityLabel(maturity)}
      <InformationCircleIcon className="size-3.5 opacity-90" aria-hidden />
    </Link>
  </HoverTooltip>
)

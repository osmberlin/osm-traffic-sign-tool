import * as m from '@app/paraglide/messages'
import type { MaturityKey } from '@osm-traffic-signs/converter'
import { clsx } from 'clsx'

type Props = {
  maturity: Exclude<MaturityKey, 'stable'>
  className?: string
}

/** Small pill label for alpha/beta catalogues and features. */
export const MaturityLabel = ({ maturity, className }: Props) => (
  <span
    className={clsx(
      'inline-flex shrink-0 items-center rounded-full bg-violet-600 px-2 py-0.5 text-xs font-semibold tracking-wide text-white uppercase',
      className,
    )}
  >
    {maturity === 'alpha' ? m.alpha_label() : m.beta_label()}
  </span>
)

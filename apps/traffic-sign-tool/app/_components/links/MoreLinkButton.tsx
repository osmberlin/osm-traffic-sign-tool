import { stonePillButton } from '@app/app/_components/links/buttonStyles'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import * as m from '@app/paraglide/messages'
import clsx from 'clsx'

type Props = {
  href: string
  className?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export const MoreLinkButton = ({ href, className, onClick }: Props) => (
  <ExternalLink
    href={href}
    blank
    onClick={onClick}
    className={clsx(
      'inline-flex h-4 shrink-0 items-center px-1.5 text-xs leading-none',
      stonePillButton,
      className,
    )}
  >
    {m.more_label()}
  </ExternalLink>
)

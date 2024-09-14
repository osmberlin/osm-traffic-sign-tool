import { linkStyle } from './linkStyles'

type Props = { href?: string; className?: string; blank?: boolean; children: React.ReactNode }

export const ExternalLink = ({ href, className, blank, children }: Props) => {
  const target = blank ? '_blank' : undefined

  return (
    <a href={href} className={className || linkStyle} target={target} rel="noreferrer">
      {children}
    </a>
  )
}

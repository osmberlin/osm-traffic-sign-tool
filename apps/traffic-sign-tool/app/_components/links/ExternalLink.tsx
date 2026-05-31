import { linkStyle } from './linkStyles'

type Props = {
  href?: string
  className?: string
  blank?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  children: React.ReactNode
}

export const ExternalLink = ({ href, className, blank, onClick, children }: Props) => {
  const target = blank ? '_blank' : undefined

  return (
    <a
      href={href}
      className={className || linkStyle}
      target={target}
      rel={blank ? 'noreferrer noopener' : 'noreferrer'}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

'use client'
import { useState } from 'react'
import { buttonStyle, buttonStyleSecondary } from './buttonStyles'

// Inspired by https://usehooks-ts.com/react-hook/use-copy-to-clipboard

type CopyButtonProps = {
  text: string
  secondary?: boolean
  children: React.ReactNode
}

export const CopyButton = ({ text, secondary = false, children }: CopyButtonProps) => {
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const copy = async (text: string): Promise<boolean> => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      return true
    } catch (error) {
      console.warn('Copy failed', error)
      setCopiedText(null)
      return false
    }
  }

  return (
    <div className="inline-flex gap-3">
      <button
        onClick={() => copy(text)}
        className={secondary ? buttonStyleSecondary : buttonStyle}
        disabled={!text}
      >
        {copiedText ? <span>copied</span> : children}
      </button>
    </div>
  )
}

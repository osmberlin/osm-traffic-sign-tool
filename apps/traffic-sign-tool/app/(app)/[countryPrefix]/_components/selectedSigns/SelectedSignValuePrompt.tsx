'use client'
import { useParamSigns } from '@app/app/_store/useParamSigns.nuqs'
import { SignStateType } from '@osm-traffic-signs/converter'
import { useEffect, useState } from 'react'

type Props = {
  sign: SignStateType
}

const inputFormats = {
  integer: { type: 'number', steps: undefined },
  float: { type: 'number', steps: '0.1' },
  opening_hours: { type: 'text', steps: undefined },
  time_restriction: { type: 'text', steps: undefined },
}

// This became way too complex for my liking…
// Issue: The focus was lost whenever one typed more than one character.
// This is something that nuqs does handle.
// However, we have a more complex setup where we handle our whole sign state in nuqs…
// … which I assume is the issue for the lost focus.
// Workaround:
// We use an internal value to store the current value of the form.
// We then update nuqs only onBlur or after a timeout.
// The timeout requires another internal state `typingTimeout`.
export const SelectedSignValuePrompt = ({ sign }: Props) => {
  const { updateSignValue } = useParamSigns()
  const [internalValue, setInternalValue] = useState<null | number | string>(null)
  const [typingTimeout, setTypingTimeout] = useState<Timer | null>(null)

  const value =
    internalValue === null
      ? sign.signValue ||
        ('valuePrompt' in sign && sign.valuePrompt ? sign.valuePrompt.defaultValue : undefined)
      : internalValue

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(event.target.value)

    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }

    const timeout = setTimeout(() => {
      updateSignValue(sign.osmValuePart, event.target.value)
    }, 2000)

    setTypingTimeout(timeout)
  }

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
    updateSignValue(sign.osmValuePart, event.target.value)
  }

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout)
      }
    }
  }, [typingTimeout])

  if (!('valuePrompt' in sign && sign.valuePrompt)) return null

  return (
    <form className="mx-2 mt-2 rounded-sm border border-stone-400/50 p-1 text-sm leading-tight">
      <label htmlFor={sign.osmValuePart} className="break-word">
        {sign.valuePrompt.prompt}:
      </label>
      <input
        onChange={handleChange}
        onBlur={handleBlur}
        name={sign.osmValuePart}
        type={inputFormats[sign.valuePrompt.format].type ?? 'text'}
        step={inputFormats[sign.valuePrompt.format].steps ?? undefined}
        value={value}
        className="shadow-xs block w-full rounded-md border-0 px-1 py-1.5 text-center text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
      />
    </form>
  )
}

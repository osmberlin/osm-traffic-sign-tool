import { useCatalogueHtmlLang } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import { useParamSigns } from '@app/app/(signs)/_components/store/useParamSigns.search'
import { ConditionalOpeningHoursValidationFeedback } from '@app/src/features/validation/ConditionalOpeningHoursValidationFeedback'
import {
  getValuePromptInputAttributes,
  SignStateType,
  type ValuePrompt,
} from '@osm-traffic-signs/converter'
import { useEffect, useState } from 'react'

type Props = {
  sign: SignStateType
}

type ValuePromptSign = SignStateType & {
  valuePrompt: ValuePrompt
}

const getCommittedInputValue = (sign: ValuePromptSign): string | number | undefined =>
  sign.signValue ?? sign.valuePrompt.defaultValue

// Local draft buffers typing; URL `signs` search param updates via useParamSigns (TanStack navigate).
const SelectedSignValuePromptFields = ({ sign }: { sign: ValuePromptSign }) => {
  const catalogueLang = useCatalogueHtmlLang()
  const { updateSignValue, updateSignValueDebounced, cancelPendingSignValueUpdate } =
    useParamSigns()
  const [draftValue, setDraftValue] = useState<string | number | null>(null)

  const inputValue = draftValue ?? getCommittedInputValue(sign)
  const { type: inputType, step: inputStep } = getValuePromptInputAttributes(
    sign.valuePrompt.format,
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value
    setDraftValue(nextValue)
    updateSignValueDebounced(sign.osmValuePart, nextValue)
  }

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    cancelPendingSignValueUpdate(sign.osmValuePart)
    updateSignValue(sign.osmValuePart, event.target.value)
  }

  // Cancel pending navigate() if this field unmounts (sign removed / key change).
  useEffect(() => {
    return () => cancelPendingSignValueUpdate(sign.osmValuePart)
  }, [cancelPendingSignValueUpdate, sign.osmValuePart])

  return (
    <form className="group mt-2 rounded-sm border border-stone-400/50 p-1 text-sm leading-tight md:mx-1">
      <label htmlFor={sign.osmValuePart} className="break-word">
        <span lang={catalogueLang}>{sign.valuePrompt.prompt}</span>:
      </label>
      <input
        onChange={handleChange}
        onBlur={handleBlur}
        name={sign.osmValuePart}
        type={inputType}
        step={inputStep}
        value={inputValue}
        className="block w-full rounded-md border-0 px-1 py-1.5 text-center text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:leading-6"
      />
      <ConditionalOpeningHoursValidationFeedback
        format={sign.valuePrompt.format}
        inputValue={String(inputValue ?? '')}
      />
    </form>
  )
}

export const SelectedSignValuePrompt = ({ sign }: Props) => {
  if (!('valuePrompt' in sign && sign.valuePrompt)) {
    return null
  }

  return <SelectedSignValuePromptFields key={sign.osmValuePart} sign={sign as ValuePromptSign} />
}

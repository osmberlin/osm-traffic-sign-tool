import { useParamSigns } from '@app/app/_store/useParamSigns.nuqs'
import { SignStateType } from '@osm-traffic-signs/converter'

type Props = {
  sign: SignStateType
}

const inputFormats = {
  integer: { type: 'number', steps: undefined },
  float: { type: 'number', steps: '0.1' },
  opening_hours: { type: 'text', steps: undefined },
  time_restriction: { type: 'text', steps: undefined },
}

export const SelectedSignValuePrompt = ({ sign }: Props) => {
  const { updateSignValue } = useParamSigns()

  if (!('valuePrompt' in sign && sign.valuePrompt)) return null

  return (
    <div className="mx-2 mt-2 rounded border border-stone-400/50 p-1 text-sm leading-tight">
      <label htmlFor={sign.osmValuePart} className="break-word">
        {sign.valuePrompt.prompt}:
      </label>
      <input
        onChange={(event) => updateSignValue(sign.osmValuePart, event.target.value)}
        name={sign.osmValuePart}
        type={inputFormats[sign.valuePrompt.format].type ?? 'text'}
        step={inputFormats[sign.valuePrompt.format].steps ?? undefined}
        value={sign.signValue ?? sign.valuePrompt.defaultValue}
        className="block w-full rounded-md border-0 px-1 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
      />
    </div>
  )
}

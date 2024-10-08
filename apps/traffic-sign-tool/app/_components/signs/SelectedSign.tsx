'use client'
import { useParamSigns } from '@/app/_store/useParamSigns.nuqs'
import { useSignStoreActions } from '@/app/_store/useSignStore.zustand'
import { TrafficSign } from '@/data/types'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { buildUrlKey } from './utils/urlKey/buildUrlKey'
import { splitUrlKey } from './utils/urlKey/splitUrlKey'

type Props = {
  sign: TrafficSign
}

export const SelectedSign = ({ sign }: Props) => {
  const { paramSigns, setParamSigns, toggleSignkey } = useParamSigns()

  const inputFormats = {
    integer: { type: 'number', steps: undefined },
    float: { type: 'number', steps: '0.1' },
    opening_hours: { type: 'text', steps: undefined },
    time_restriction: { type: 'text', steps: undefined },
  }

  const updateValueInUrl = (signKey: string, signValue: string) => {
    // We take the existing paramSigns and replace the one we just updated with the new Key while preserving the general array order
    const newParamSigns = paramSigns
      .map((urlKey) => {
        const { signKey: urlSignKey } = splitUrlKey(urlKey)
        if (signKey === urlSignKey) {
          return buildUrlKey(signKey, signValue)
        }
        return urlKey
      })
      .filter(Boolean)

    setParamSigns(newParamSigns)
  }
  const { updateSignValues: updateValuesInStore } = useSignStoreActions()

  const handleUpdateSignValue = (signKey: string, signValue: string) => {
    updateValueInUrl(signKey, signValue)
    updateValuesInStore(signKey, signValue)
  }

  return (
    <div className="text-center leading-tight">
      <button
        onClick={() => toggleSignkey(sign.urlKey)}
        className="group/item relative mx-2 space-y-2 rounded border border-transparent px-3 leading-tight hover:border-stone-200 hover:bg-stone-200"
      >
        <div className="absolute -right-1 -top-1 rounded-full text-stone-300/0 group-hover/item:text-stone-700">
          <CheckCircleIcon className="size-6" />
        </div>

        <div className="relative">
          {sign?.image?.svgPath ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sign.image.svgPath} alt={sign.name} className="h-auto max-h-28 w-full" />

              {'valuePrompt' in sign && sign.signValue !== sign.valuePrompt.defaultValue && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="-rotate-12 rounded bg-amber-100/95 px-3 pt-1 font-condensed text-xl font-normal text-amber-900 shadow-sm">
                    {sign.signValue}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex size-20 items-center justify-center rounded border border-stone-800 bg-stone-600 pt-1 text-stone-50">
              <code className="whitespace-nowrap tracking-tighter">
                {sign.signKey.replaceAll('DE:', '')}
              </code>
              <br />
            </div>
          )}
        </div>

        <h3 className="text-md w-full font-light">{sign.name}</h3>

        {sign.descriptiveName && (
          <p>
            <strong className="hyphens-auto break-all">{sign.descriptiveName}</strong>
          </p>
        )}
      </button>

      {'valuePrompt' in sign && (
        <div className="mx-2 mt-1 rounded border border-stone-400/50 p-1 leading-tight">
          <label htmlFor={sign.urlKey} className="text-sm/2 break-word hyphens-auto">
            {sign.valuePrompt.prompt}:
          </label>
          <input
            onChange={(event) => handleUpdateSignValue(sign.signKey, event.target.value)}
            name={sign.urlKey}
            type={inputFormats[sign.valuePrompt.format].type ?? 'text'}
            step={inputFormats[sign.valuePrompt.format].steps ?? undefined}
            value={sign.signValue ?? sign.valuePrompt.defaultValue}
            className="block w-full rounded-md border-0 px-1 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      )}
    </div>
  )
}

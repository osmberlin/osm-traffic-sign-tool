'use client'
import { SignStateType } from '@osm-traffic-signs/converter'
import clsx from 'clsx'
import { PackageSvgTrafficSign } from '../../PackageSvgTrafficSign'

type Props = { sign: SignStateType }

const getBanderoleTextClass = (value: string) => {
  const length = value.length
  if (length <= 4) return 'text-4xl px-3'
  if (length <= 8) return 'text-2xl px-2'
  if (length <= 12) return 'text-lg px-2'
  if (length <= 16) return 'text-base px-1.5'
  return 'text-sm px-1'
}

export const SelectedSignImage = ({ sign }: Props) => {
  const showBanderole =
    'valuePrompt' in sign
      ? sign.valuePrompt &&
        // We take 47 as a default value for some signs with number; we always want to show the sign here.
        (sign.valuePrompt.defaultValue === '47' || sign.signValue !== sign.valuePrompt.defaultValue)
      : false

  return (
    <div className="px-1">
      {sign.recodgnizedSign ? (
        <div className="relative mx-auto max-w-24">
          <PackageSvgTrafficSign
            sign={sign}
            className="pointer-events-none inline h-auto max-h-24 w-full max-w-24"
          />

          {showBanderole && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={clsx(
                  'font-condensed w-full -rotate-12 rounded-sm bg-amber-100/95 pt-1 text-center font-normal text-amber-900 shadow-xs',
                  getBanderoleTextClass(String(sign.signValue)),
                )}
              >
                {sign.signValue}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mx-auto flex size-20 items-center justify-center rounded-sm border border-stone-800 bg-stone-600 pt-1 text-stone-50">
          <code className="tracking-tighter whitespace-nowrap">?</code>
          <br />
        </div>
      )}

      {
        <h3 className="mt-1 w-full font-light">
          {sign.recodgnizedSign ? sign.name : 'Unbekanntes Zeichen'}
        </h3>
      }

      {'descriptiveName' in sign && sign.descriptiveName && (
        <div>
          <>{sign.descriptiveName}</>
        </div>
      )}
    </div>
  )
}

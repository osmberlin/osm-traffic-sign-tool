'use client'
import { SignStateType } from '@osm-traffic-signs/converter'
import { PackageSvgTrafficSign } from '../PackageSvgTrafficSign'

type Props = { sign: SignStateType }

export const SelectedSignImage = ({ sign }: Props) => {
  return (
    <div className="mx-2 px-3">
      {sign.recodgnizedSign ? (
        <div className="relative mx-auto max-w-24">
          <PackageSvgTrafficSign
            sign={sign}
            className="pointer-events-none inline h-auto max-h-24 w-full max-w-24"
          />

          {'valuePrompt' in sign &&
            sign.valuePrompt &&
            sign.signValue !== sign.valuePrompt.defaultValue && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="font-condensed w-full -rotate-12 rounded-sm bg-amber-100/95 px-3 pt-1 text-center text-4xl font-normal text-amber-900 shadow-xs">
                  {sign.signValue}
                </div>
              </div>
            )}
        </div>
      ) : (
        <div className="mx-auto flex size-20 items-center justify-center rounded-sm border border-stone-800 bg-stone-600 pt-1 text-stone-50">
          <code className="whitespace-nowrap tracking-tighter">?</code>
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

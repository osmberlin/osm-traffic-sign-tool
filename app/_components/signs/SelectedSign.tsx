import { CheckCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { buildUrlKey } from './utils/urlKey/buildUrlKey'
import { splitUrlKey } from './utils/urlKey/splitUrlKey'

type TrafficSign = {
  urlKey: string
  image?: {
    svgPath: string
  }
  name: string
  signValue?: string
  valuePrompt?: {
    defaultValue: string
  }
}

type Props = {
  toggleUrlSignKey: (urlKey: string) => void
  updateUrlSignKey: (urlKey: string) => void
  sign: TrafficSign
}

export const SelectedSign = ({ toggleUrlSignKey, updateUrlSignKey, sign }: Props) => {
  const inputFormats = {
    integer: { type: 'number', steps: undefined },
    float: { type: 'number', steps: '0.1' },
    opening_hours: { type: 'text', steps: undefined },
    time_restriction: { type: 'text', steps: undefined },
  }

  // We update the URL store which in turn updates the signStore in our page component
  const updateValue = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const { signKey } = splitUrlKey(key)
    if (signKey) {
      updateUrlSignKey(buildUrlKey(signKey, event.target.value))
    }
  }

  return (
    <div className="text-center leading-tight">
      <button
        onClick={() => toggleUrlSignKey(sign.urlKey)}
        className="group/item relative mx-2 space-y-2 rounded border border-transparent px-3 leading-tight hover:border-stone-200 hover:bg-stone-200"
      >
        <div className="absolute -right-1 -top-1 rounded-full text-stone-300/0 group-hover/item:text-stone-700">
          <CheckCircleIcon className="size-6" />
        </div>

        <div className="relative">
          {sign?.image?.svgPath && (
            <Image src={sign.image.svgPath} alt={sign.name} className="h-auto max-h-28 w-full" />
          )}

          {'valuePrompt' in sign && sign.signValue !== sign.valuePrompt?.defaultValue && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="-rotate-12 rounded bg-amber-100/95 px-3 pt-1 text-xl font-medium text-amber-900 shadow-sm">
                {/* Additional content here */}
              </div>
            </div>
          )}
        </div>
      </button>
    </div>
  )
}

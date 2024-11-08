'use client'
import { useParamSigns } from '@app/app/_store/useParamSigns.nuqs'
import { signToComments } from '@osm-traffic-signs/converter'
import { WikiLinkify } from '../../../../_components/wiki/WikiLinkify'

export const ResultComments = () => {
  const { paramSigns } = useParamSigns()
  const signsCommentsMap = signToComments(paramSigns)
  return (
    <>
      <div className="mt-10 space-y-2">
        <h3 className="text-lg font-light uppercase text-stone-50">Notes</h3>
        {!signsCommentsMap.size && '–'}
        {Array.from(signsCommentsMap).map(([signKey, signComments]) => {
          return (
            <div
              key={signKey}
              className="prose-white prose-a:underline prose-a:decoration-stone-700 prose-a:underline-offset-4 hover:prose-a:decoration-stone-400 hover:prose-a:decoration-1 flex gap-2 break-all font-serif font-normal"
            >
              <code className="mr-1 inline-flex items-center rounded bg-gray-50/10 px-1.5 py-0.5 pt-1 text-xs">
                <span
                  style={{ writingMode: 'vertical-rl' }}
                  className="inline-block rotate-180 whitespace-nowrap"
                >
                  {signKey}
                </span>
              </code>
              <ul className="space-y-2">
                {signComments.map(({ tagReference, important, comment }) => {
                  return (
                    <li key={comment} className={important ? 'text-amber-500' : ''}>
                      {tagReference && (
                        <p>
                          <code>{tagReference}</code>
                        </p>
                      )}
                      <WikiLinkify text={comment} />
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </>
  )
}

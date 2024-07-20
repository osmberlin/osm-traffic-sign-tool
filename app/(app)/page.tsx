import { ClipboardDocumentCheckIcon } from '@heroicons/react/20/solid'
import { StateHelper } from '../_components/layout/StateHelper'
import { CopyButton } from '../_components/links/CopyButton'
import { Tag } from '../_components/wiki/Tag'
import { WikiLinkify } from '../_components/wiki/WikiLinkify'

type Props = {
  aggregatedTags: [string, string][]
  copyAllTags: string
  aggregatedComments: [string, string, string][]
  selectedSigns: any
}

export default function App({
  aggregatedTags,
  copyAllTags,
  aggregatedComments,
  selectedSigns,
}: Props) {
  return (
    <main>
      <section>
        {aggregatedTags && aggregatedTags.length > 0 && (
          <div>
            <ul>
              {aggregatedTags.map(([key, value]) => (
                <li key={key}>
                  <Tag tagKey={key} tagValue={value} />
                </li>
              ))}
            </ul>

            <div>
              <CopyButton text={copyAllTags}>
                <ClipboardDocumentCheckIcon className="size-4" />
              </CopyButton>
            </div>
          </div>
        )}

        <div className="mt-10 space-y-2">
          <h3 className="text-lg font-thin uppercase text-stone-50">Notes</h3>
          {aggregatedComments.length === 0 ? (
            <span>–</span>
          ) : (
            aggregatedComments.map(([signKey, signTitle, comment]) => (
              <p
                key={signKey}
                className="prose-white prose-a:underline prose-a:decoration-stone-700 prose-a:underline-offset-4 hover:prose-a:decoration-stone-400 hover:prose-a:decoration-1"
              >
                <code
                  title={signTitle}
                  className="mr-1 inline-flex items-center rounded bg-gray-50/10 px-1.5 py-0.5 pt-1 text-xs"
                >
                  {signKey}
                </code>
                <WikiLinkify text={comment} />
              </p>
            ))
          )}
        </div>
      </section>
      <StateHelper state={selectedSigns} />
    </main>
  )
}

import { ContentPageLayout } from '@app/app/_components/layout/ContentPageLayout'
import { FallingSignPile } from '@app/src/components/loading/FallingSignPile'
import { deSearchSchema } from '@app/src/features/searchParams/deSearch'
import { buildNoindexPageHead } from '@app/src/features/seo/seoHead'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

function LangPendingRouteComponent() {
  const { lang } = Route.useParams()
  const { hold } = Route.useSearch()
  const [replayKey, setReplayKey] = useState(0)

  return (
    <ContentPageLayout>
      <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
        <header className="space-y-2">
          <h1 className="text-lg font-light uppercase">Loading pile demo</h1>
          <p className="text-sm text-stone-700">
            Preview the falling traffic-sign shapes used during route transitions. Use Replay to
            restart the CSS animation, or navigate with <code className="text-xs">?hold=ms</code> to
            see the real router pending overlay.
          </p>
        </header>

        <div
          className="flex min-h-[320px] flex-col items-center justify-center gap-4 rounded-sm border border-stone-400/60 bg-stone-200/50 p-4"
          role="status"
          aria-live="polite"
        >
          <FallingSignPile key={replayKey} />
          <button
            type="button"
            className="rounded-sm border border-stone-500 bg-stone-100 px-4 py-2 text-sm hover:bg-stone-200"
            onClick={() => setReplayKey((k) => k + 1)}
          >
            Replay animation
          </button>
        </div>

        <section className="space-y-2 text-sm text-stone-700">
          <h2 className="font-semibold">Router pending</h2>
          <p>
            Open this page with a delayed loader to exercise{' '}
            <code className="text-xs">defaultPendingComponent</code>:
          </p>
          <ul className="list-inside list-disc space-y-1">
            <li>
              <Link
                to="/$lang/pending"
                params={{ lang }}
                search={{ hold: 3000 }}
                className="text-blue-900 underline"
              >
                /pending?hold=3000
              </Link>{' '}
              (3s loader — watch for the global pending overlay on navigation)
            </li>
            {hold !== undefined && (
              <li>
                Current load used <code className="text-xs">hold={hold}</code> ms.
              </li>
            )}
          </ul>
        </section>
      </div>
    </ContentPageLayout>
  )
}

export const Route = createFileRoute('/$lang/pending')({
  head: () => buildNoindexPageHead('Loading pile demo'),
  validateSearch: deSearchSchema,
  beforeLoad: async ({ search }) => {
    if (search.hold && search.hold > 0) {
      await new Promise((resolve) => setTimeout(resolve, search.hold))
    }
  },
  component: LangPendingRouteComponent,
})

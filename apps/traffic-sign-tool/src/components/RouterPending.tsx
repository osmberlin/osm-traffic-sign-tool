import { ContentPageLayout } from '@app/app/_components/layout/ContentPageLayout'
import * as m from '@app/paraglide/messages'
import { FallingSignPile } from '@app/src/components/loading/FallingSignPile'

export const RouterPending = () => {
  return (
    <ContentPageLayout>
      <div
        className="flex min-h-[400px] w-full flex-col items-center justify-center gap-4"
        role="status"
        aria-live="polite"
      >
        <FallingSignPile />
        <output className="text-center text-sm text-stone-700">{m.loading()}</output>
      </div>
    </ContentPageLayout>
  )
}

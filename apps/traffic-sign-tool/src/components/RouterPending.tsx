import { ContentPageLayout } from '@app/app/_components/layout/ContentPageLayout'
import * as m from '@app/paraglide/messages'

export const RouterPending = () => {
  return (
    <ContentPageLayout>
      <div className="flex min-h-[400px] w-full items-center justify-center">
        <output className="text-center text-sm text-stone-700">{m.loading()}</output>
      </div>
    </ContentPageLayout>
  )
}

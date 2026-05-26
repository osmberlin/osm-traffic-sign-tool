import { ContentPageLayout } from '@app/app/_components/layout/ContentPageLayout'

export const RouterPending = () => {
  return (
    <ContentPageLayout>
      <div className="flex min-h-[400px] w-full items-center justify-center">
        <output className="text-center text-sm text-stone-700">Loading…</output>
      </div>
    </ContentPageLayout>
  )
}

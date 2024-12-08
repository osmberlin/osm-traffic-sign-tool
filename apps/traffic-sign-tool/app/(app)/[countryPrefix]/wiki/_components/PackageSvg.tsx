import dynamic from 'next/dynamic'

export const PackageSvg = ({ name }: { name: string }) => {
  const SvgComponent = dynamic(() => import(`@internal/wiki/${name}`), { ssr: false })

  return (
    <div className="inline-block h-auto w-20">
      <SvgComponent />
    </div>
  )
}

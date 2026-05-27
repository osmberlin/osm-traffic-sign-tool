import clsx from 'clsx'
import type { ReactElement } from 'react'
import type { SignPileShapeType } from './signPilePieces'

type ShapeProps = {
  className?: string
}

export const SignShapeBlueCircle = ({ className }: ShapeProps) => (
  <div
    className={clsx(
      'size-16 shrink-0 rounded-full border-2 border-white bg-[#003d8f] shadow-sm',
      className,
    )}
  />
)

export const SignShapeRedRing = ({ className }: ShapeProps) => (
  <div
    className={clsx(
      'size-16 shrink-0 rounded-full border-[3px] border-red-600 bg-white shadow-sm ring-1 ring-white/80',
      className,
    )}
  />
)

export const SignShapeCornerPlate = ({ className }: ShapeProps) => (
  <div
    className={clsx(
      'relative h-11 w-14 shrink-0 rounded-sm border-2 border-black bg-white shadow-sm',
      className,
    )}
  >
    <span className="absolute top-0.5 left-0.5 h-2 w-2 border-t-2 border-l-2 border-black" />
    <span className="absolute top-0.5 right-0.5 h-2 w-2 border-t-2 border-r-2 border-black" />
    <span className="absolute bottom-0.5 left-0.5 h-2 w-2 border-b-2 border-l-2 border-black" />
    <span className="absolute right-0.5 bottom-0.5 h-2 w-2 border-r-2 border-b-2 border-black" />
  </div>
)

export const SignShapeYieldTriangle = ({ className }: ShapeProps) => (
  <div
    className={clsx('relative size-14 shrink-0', className)}
    style={{
      clipPath: 'polygon(50% 88%, 6% 18%, 94% 18%)',
    }}
  >
    <div
      className="absolute inset-0 bg-red-600"
      style={{ clipPath: 'polygon(50% 88%, 6% 18%, 94% 18%)' }}
    />
    <div
      className="absolute inset-[3px] bg-white"
      style={{ clipPath: 'polygon(50% 84%, 10% 22%, 90% 22%)' }}
    />
  </div>
)

const shapeComponents: Record<SignPileShapeType, (props: ShapeProps) => ReactElement> = {
  blueCircle: SignShapeBlueCircle,
  redRing: SignShapeRedRing,
  cornerPlate: SignShapeCornerPlate,
  yieldTriangle: SignShapeYieldTriangle,
}

export const SignLoadingShape = ({
  shape,
  className,
}: ShapeProps & { shape: SignPileShapeType }) => {
  const Component = shapeComponents[shape]
  return <Component className={className} />
}

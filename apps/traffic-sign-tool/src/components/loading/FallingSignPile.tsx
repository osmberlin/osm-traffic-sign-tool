import clsx from 'clsx'
import type { CSSProperties } from 'react'
import { SignLoadingShape } from './SignLoadingShapes'
import './sign-fall.css'
import { signPilePieces } from './signPilePieces'

const FALL_DISTANCE_PX = 300

type Props = {
  className?: string
}

export const FallingSignPile = ({ className }: Props) => {
  return (
    <div
      className={clsx(
        'relative mx-auto min-h-[280px] w-full max-w-md overflow-hidden',
        '[contain:layout_paint]',
        className,
      )}
      aria-hidden
    >
      {signPilePieces.map((piece) => (
        <div
          key={piece.id}
          className="sign-fall-piece pointer-events-none absolute origin-bottom"
          style={
            {
              left: `${piece.leftPercent}%`,
              bottom: `${piece.bottomPx}px`,
              '--fall-distance': `${FALL_DISTANCE_PX}px`,
              '--fall-delay': `${piece.animationDelayMs}ms`,
              '--fall-duration': `${piece.animationDurationMs}ms`,
              '--start-rot': `${piece.startRotateDeg}deg`,
              '--end-rot': `${piece.rotateDeg}deg`,
              '--drift-x': `${piece.driftPercent}%`,
            } as CSSProperties
          }
        >
          <SignLoadingShape shape={piece.shape} />
        </div>
      ))}
    </div>
  )
}

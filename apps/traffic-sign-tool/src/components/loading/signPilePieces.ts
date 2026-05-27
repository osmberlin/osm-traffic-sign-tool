export type SignPileShapeType = 'blueCircle' | 'redRing' | 'cornerPlate' | 'yieldTriangle'

export type SignPilePieceConfig = {
  id: string
  shape: SignPileShapeType
  /** Horizontal anchor as % of container width */
  leftPercent: number
  /** Distance from container bottom in px */
  bottomPx: number
  /** Final rotation in degrees */
  rotateDeg: number
  /** Initial rotation while falling */
  startRotateDeg: number
  animationDelayMs: number
  animationDurationMs: number
  /** Horizontal drift during fall as % of own width */
  driftPercent: number
}

/** Six stylized signs: one of each main form, two yield triangles. */
export const signPilePieces: SignPilePieceConfig[] = [
  {
    id: 'blue-1',
    shape: 'blueCircle',
    leftPercent: 8,
    bottomPx: 4,
    rotateDeg: -12,
    startRotateDeg: 24,
    animationDelayMs: 0,
    animationDurationMs: 1200,
    driftPercent: 4,
  },
  {
    id: 'red-ring-1',
    shape: 'redRing',
    leftPercent: 38,
    bottomPx: 8,
    rotateDeg: 8,
    startRotateDeg: -18,
    animationDelayMs: 180,
    animationDurationMs: 1250,
    driftPercent: -3,
  },
  {
    id: 'corner-1',
    shape: 'cornerPlate',
    leftPercent: 58,
    bottomPx: 2,
    rotateDeg: -6,
    startRotateDeg: 12,
    animationDelayMs: 360,
    animationDurationMs: 1300,
    driftPercent: 2,
  },
  {
    id: 'yield-1',
    shape: 'yieldTriangle',
    leftPercent: 22,
    bottomPx: 52,
    rotateDeg: 14,
    startRotateDeg: -30,
    animationDelayMs: 520,
    animationDurationMs: 1180,
    driftPercent: 5,
  },
  {
    id: 'yield-2',
    shape: 'yieldTriangle',
    leftPercent: 68,
    bottomPx: 48,
    rotateDeg: -16,
    startRotateDeg: 22,
    animationDelayMs: 700,
    animationDurationMs: 1220,
    driftPercent: -4,
  },
  {
    id: 'blue-2',
    shape: 'blueCircle',
    leftPercent: 48,
    bottomPx: 36,
    rotateDeg: 5,
    startRotateDeg: -14,
    animationDelayMs: 880,
    animationDurationMs: 1280,
    driftPercent: 3,
  },
]

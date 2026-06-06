import type {
  SignImage,
  SignImageSourceLocal,
  SignImageSourceRemote,
} from './data-definitions/TrafficSignDataTypes.js'

export const isSignImageMissing = (image: SignImage | undefined) => image === 'missing'

export const normalizeSignImage = (image: SignImage) => image

export const isSignImageSource = (
  image: SignImage,
): image is SignImageSourceRemote | SignImageSourceLocal => image !== 'missing'

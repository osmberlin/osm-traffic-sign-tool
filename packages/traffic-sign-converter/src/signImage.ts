import type {
  SignImage,
  SignImageSourceLocal,
  SignImageSourceRemote,
} from './data-definitions/TrafficSignDataTypes.js'

type LegacyMissingRemote = SignImageSourceRemote & { availability?: 'missing' }
type LegacyMissingLocal = SignImageSourceLocal & { availability?: 'missing' }
type CatalogueSignImage = SignImage | LegacyMissingRemote | LegacyMissingLocal

export const isSignImageMissing = (image: CatalogueSignImage | undefined): boolean => {
  if (image === 'missing') return true
  if (
    image &&
    typeof image === 'object' &&
    'availability' in image &&
    image.availability === 'missing'
  ) {
    return true
  }
  return false
}

export const normalizeSignImage = (image: CatalogueSignImage): SignImage => {
  if (isSignImageMissing(image)) return 'missing'
  return image
}

export const isSignImageSource = (
  image: CatalogueSignImage,
): image is SignImageSourceRemote | SignImageSourceLocal => !isSignImageMissing(image)

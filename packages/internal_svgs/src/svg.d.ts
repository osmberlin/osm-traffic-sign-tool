declare module '*.svg' {
  type SvgAsset = {
    src: string
    height: number
    width: number
    blurDataURL?: string
    blurWidth?: number
    blurHeight?: number
  }

  const content: string | SvgAsset
  export default content
}

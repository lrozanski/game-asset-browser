import {MouseEvent, MouseEventHandler} from "react"

import {useClassName} from "/@/hooks/className"

export type ImageSize = "xs" | "sm" | "md" | "lg" | "xl" | "full"

const sizeToClassName: Record<ImageSize, string> = {
  xs: "h-16 w-16",
  sm: "h-24 w-24",
  md: "h-32 w-32",
  lg: "h-48 w-48",
  xl: "h-64 w-64",
  full: "h-full w-full",
}
const resolveSize = (size?: ImageSize) => sizeToClassName[size ?? "md"]
const resolveStretch = (stretch?: boolean) => (stretch ? "w-full h-full" : "")
const resolvePixelated = (pixelated?: boolean) => (pixelated ? "image-pixelated" : "")
const resolveBorder = (border?: boolean) => (border ? "border border-zinc-700 p-2" : "")

export type ImageProps = {
  src: string
  size?: ImageSize
  stretch?: boolean
  pixelated?: boolean
  border?: boolean
  onClick?: MouseEventHandler
  className?: string
}

export function Image(props: ImageProps) {
  const {src, size, stretch, pixelated, border, onClick, className} = props

  const divClassName = useClassName(resolveSize(size), resolveBorder(border), className)
  const imageClassName = useClassName(resolveStretch(stretch), resolvePixelated(pixelated))

  return (
    <div className={`inline-flex flex-row items-center justify-center overflow-hidden rounded-lg ${divClassName}`}>
      <img src={src} alt={src} className={`max-h-full max-w-full object-contain ${imageClassName}`} onClick={onClick} />
    </div>
  )
}

type SelectableImageProps = {
  onSelect: (event: MouseEvent, src: string) => void
} & ImageProps

export function SelectableImage(props: SelectableImageProps) {
  const {onSelect, className, ...image} = props

  const selectableClassName = useClassName(className)

  return (
    <Image
      {...image}
      className={`cursor-pointer hover:bg-zinc-600 ${selectableClassName}`}
      onClick={(event) => onSelect && onSelect(event, image.src)}
    />
  )
}

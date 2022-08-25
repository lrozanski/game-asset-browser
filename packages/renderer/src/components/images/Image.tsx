import {MouseEvent, MouseEventHandler, useMemo} from "react"

import {useClassName} from "/@/hooks/className"

export type ImageSize = "xs" | "sm" | "md" | "lg" | "xl" | "full"

const sizeToWidth: Record<ImageSize, string> = {
  xs: "w-16",
  sm: "w-24",
  md: "w-32",
  lg: "w-48",
  xl: "w-64",
  full: "w-full",
}
const sizeToHeight: Record<ImageSize, string> = {
  xs: "h-16",
  sm: "h-24",
  md: "h-32",
  lg: "h-48",
  xl: "h-64",
  full: "h-full",
}
const sizeToTextSpace: Record<ImageSize, string> = {
  xs: "py-1",
  sm: "py-2",
  md: "py-3",
  lg: "py-3",
  xl: "py-4",
  full: "py-5",
}
const resolveWidth = (size?: ImageSize) => sizeToWidth[size ?? "md"]
const resolveHeight = (size?: ImageSize) => sizeToHeight[size ?? "md"]
const resolveTextSpace = (size?: ImageSize) => sizeToTextSpace[size ?? "md"]
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

  const containerClassName = useClassName(resolveWidth(size), resolveBorder(border), className)
  const divClassName = useClassName(resolveHeight(size))
  const imageClassName = useClassName(resolveStretch(stretch), resolvePixelated(pixelated))
  const textClassName = useClassName(resolveTextSpace(size))
  const filename = useMemo(() => src.split(/[\\/]/).pop(), [src])

  return (
    <div className={`flex flex-col rounded-lg ${containerClassName}`}>
      <div className={`inline-flex flex-row items-center justify-center overflow-hidden rounded-lg ${divClassName}`}>
        <img src={src} alt={src} className={`max-h-full max-w-full object-contain ${imageClassName}`} onClick={onClick} />
      </div>
      <p className={`text-center font-semibold text-sm text-ellipsis overflow-hidden ${textClassName}`}>{filename}</p>
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

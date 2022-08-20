import {useAtom} from "jotai"
import {difference, indexOf, sortBy, union} from "lodash"
import {imageSizeState, previewImageState, selectedImagesState} from "../../state"
import {FlexGroup} from "../layout/FlexGroup"
import {SelectableImage} from "./Image"

type ImageGridProps = {
  paths: string[]
}

export function ImageGrid(props: ImageGridProps) {
  const {paths} = props

  const [imageSize] = useAtom(imageSizeState)
  const [selectedImages, setSelectedImages] = useAtom(selectedImagesState)
  const [, setPreviewImage] = useAtom(previewImageState)

  return (
    <FlexGroup direction="horizontal" className="flex flex-row flex-wrap items-center justify-start gap-5">
      {paths.map((image, index) => {
        const isSelected = selectedImages.includes(image)
        const selectedClassName = isSelected ? "selected" : ""

        return (
          <SelectableImage
            key={image}
            src={image}
            size={imageSize}
            stretch={true}
            pixelated={true}
            onSelect={(event, image) => {
              setPreviewImage(image)
              let selected = []

              if (event.ctrlKey) {
                selected = selectedImages.includes(image)
                  ? difference(selectedImages, [image])
                  : union(selectedImages, [image])
              } else if (event.shiftKey) {
                const first = selectedImages[0]

                selected = paths.slice(paths.indexOf(first), index + 1)
              } else if (selectedImages.length > 1) {
                selected = [image]
              } else {
                selected = selectedImages.includes(image) ? [] : [image]
              }
              const sorted = sortBy(selected, value => paths.indexOf(value))
              setSelectedImages(sorted)
            }}
            className={selectedClassName}
            border={true}
          />
        )
      })}
    </FlexGroup>
  )
}

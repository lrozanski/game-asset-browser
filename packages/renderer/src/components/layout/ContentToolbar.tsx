import {CustomSlider} from "/@/components/slider/Slider"
import {ImageSize} from "/@/components/images/Image"
import {FlexGroup} from "/@/components/layout/FlexGroup"
import {useAtom} from "jotai"
import {imageSizeState} from "/@/state"

export function ContentToolbar() {
  const [imageSize, setImageSize] = useAtom(imageSizeState)

  return (
    <FlexGroup direction="horizontal" className="sticky top-0 space-x-1 bg-zinc-700 p-2 items-center">
      <CustomSlider id="zoom-slider-2"
                    label="Zoom:"
                    initialValue={imageSize}
                    choices={["xs", "sm", "md", "lg", "xl"]}
                    onChange={newValue => setImageSize(newValue as ImageSize)}
                    choiceLabelMapper={choice => choice} />
    </FlexGroup>
  )
}

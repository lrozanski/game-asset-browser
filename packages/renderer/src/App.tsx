import {useAtom, useAtomValue, useSetAtom} from "jotai"
import {useState} from "react"
import {AiFillFolder} from "react-icons/ai"
import {MdArrowBackIosNew} from "react-icons/md"

import {Image, ImageSize} from "./components/images/Image"
import {ImageGrid} from "./components/images/ImageGrid"
import {FlexGroup} from "./components/layout/FlexGroup"
import {imageSizeState, previewImageSizeState, previewImageState} from "./state"
import {loadImages} from "#preload"

function App() {
  const [imagePaths, setImagePaths] = useState<string[]>([])
  const [showPreview, setShowPreview] = useState<boolean>(true)
  const previewImage = useAtomValue(previewImageState)

  const setImageSize = useSetAtom(imageSizeState)
  const [previewImageSize, setPreviewImageSize] = useAtom(previewImageSizeState)

  return (
    <div className="app overflow-x-hidden">
      <FlexGroup direction="horizontal">
        <FlexGroup direction="vertical" className="sticky top-0 left-0 max-h-screen min-h-screen w-32 space-y-2 bg-zinc-800 p-5">
          <button
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-600 hover:bg-zinc-500"
            onClick={async () => {
              const images = await loadImages()

              setImagePaths(images)
            }}>
            <AiFillFolder className="h-8 w-8 text-zinc-200" />
          </button>
        </FlexGroup>
        <FlexGroup direction="vertical" className="relative h-screen grow overflow-y-auto overflow-x-hidden bg-zinc-900">
          <FlexGroup direction="horizontal" className="sticky top-0 space-x-1 bg-zinc-700 p-2">
            <button className="rounded-lg bg-zinc-800 px-2 py-1 hover:bg-zinc-500" onClick={() => setImageSize("xs")}>
              xs
            </button>
            <button className="rounded-lg bg-zinc-800 px-2 py-1 hover:bg-zinc-500" onClick={() => setImageSize("sm")}>
              sm
            </button>
            <button className="rounded-lg bg-zinc-800 px-2 py-1 hover:bg-zinc-500" onClick={() => setImageSize("md")}>
              md
            </button>
            <button className="rounded-lg bg-zinc-800 px-2 py-1 hover:bg-zinc-500" onClick={() => setImageSize("lg")}>
              lg
            </button>
            <button className="rounded-lg bg-zinc-800 px-2 py-1 hover:bg-zinc-500" onClick={() => setImageSize("xl")}>
              xl
            </button>
          </FlexGroup>
          <FlexGroup direction="vertical" className="relative grow overflow-y-auto bg-zinc-900 p-5">
            <ImageGrid paths={imagePaths} />
          </FlexGroup>
        </FlexGroup>
        {!showPreview && (
          <FlexGroup direction="vertical" className={`collapsed sticky top-0 max-h-screen min-w-[4rem] items-center overflow-hidden bg-zinc-800 p-5`}>
            <MdArrowBackIosNew
              className="mt-10 h-8 w-8 transform cursor-pointer rounded-full bg-zinc-700 p-2 text-zinc-400 transition-colors duration-200 ease-in-out hover:bg-zinc-500 hover:text-zinc-700"
              onClick={() => setShowPreview(true)}
            />
          </FlexGroup>
        )}
        {showPreview && (
          <FlexGroup direction="vertical" className={`sticky top-0 max-h-screen w-1/4 min-w-[25%] overflow-hidden bg-zinc-800 p-5`}>
            <>
              <h1 className="text-center text-xl font-medium">Preview</h1>
              <MdArrowBackIosNew
                className="mt-4 h-8 w-8 rotate-180 transform cursor-pointer rounded-full bg-zinc-700 p-2 text-zinc-400 transition-colors duration-200 ease-in-out hover:bg-zinc-500 hover:text-zinc-800"
                onClick={() => setShowPreview(false)}
              />
              <FlexGroup direction="vertical" className="grow items-center justify-center">
                {previewImage && <Image key={previewImage} src={previewImage} size={previewImageSize} stretch={true} pixelated={true} />}
              </FlexGroup>
              <FlexGroup direction="horizontal" className="sticky top-0 space-x-1 rounded-lg bg-zinc-700 p-2">
                <button className="rounded-lg bg-zinc-800 px-2 py-1 hover:bg-zinc-500" onClick={() => setPreviewImageSize("xs")}>
                  xs
                </button>
                <button className="rounded-lg bg-zinc-800 px-2 py-1 hover:bg-zinc-500" onClick={() => setPreviewImageSize("sm")}>
                  sm
                </button>
                <button className="rounded-lg bg-zinc-800 px-2 py-1 hover:bg-zinc-500" onClick={() => setPreviewImageSize("md")}>
                  md
                </button>
                <button className="rounded-lg bg-zinc-800 px-2 py-1 hover:bg-zinc-500" onClick={() => setPreviewImageSize("lg")}>
                  lg
                </button>
                <button className="rounded-lg bg-zinc-800 px-2 py-1 hover:bg-zinc-500" onClick={() => setPreviewImageSize("xl")}>
                  xl
                </button>
                <button className="rounded-lg bg-zinc-800 px-2 py-1 hover:bg-zinc-500" onClick={() => setPreviewImageSize("full")}>
                  full
                </button>
              </FlexGroup>
            </>
          </FlexGroup>
        )}
      </FlexGroup>
    </div>
  )
}

export default App

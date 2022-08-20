import {atom} from "jotai"

import {ImageSize} from "./components/images/Image"

export type Tag = {
  name: string
  displayName: string
}

export const tagsState = atom<Record<string, Tag>>({
  test: {
    name: "test",
    displayName: "Test",
  },
  sprite: {
    name: "sprite",
    displayName: "Sprite",
  },
})

export const previewImageState = atom<string | null>(null)
export const selectedImagesState = atom<string[]>([])

export const imageSizeState = atom<ImageSize>("md")
export const previewImageSizeState = atom<ImageSize>("xl")

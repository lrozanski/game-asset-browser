import {dialog} from "electron"

export function loadImages() {
  const paths = dialog.showOpenDialogSync({
    properties: ["openFile", "multiSelections"],
    filters: [
      {
        name: "Image",
        extensions: ["jpeg", "jpg", "png"],
      },
    ],
  }) ?? []

  return paths.map(path => `assets://${path.replaceAll("\\", "/")}`)
}

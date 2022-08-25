import {createPortal} from "react-dom"
import {PropsWithChildren} from "react"

type ModalProps = {}

export function Modal(props: PropsWithChildren<ModalProps>) {
  const {children} = props

  return createPortal(
    <ModalContainer>
      <ModalBody>
        {children}
      </ModalBody>
    </ModalContainer>,
    document.body,
  )
}

export function ModalContainer(props: PropsWithChildren<ModalProps>) {
  const {children} = props

  return (
    <div className="absolute top-0 left-0 w-screen min-h-screen bg-black bg-opacity-50 z-10 flex flex-row justify-center items-center">
      {children}
    </div>
  )
}

export function ModalBody(props: PropsWithChildren<{}>) {
  const {children} = props

  return (
    <div className="relative w-[90vw] h-[90vh] max-w-[90vw] max-h-[90vh] bg-zinc-700 rounded-lg p-5 text-zinc-300">
      <div className="w-full h-full overflow-y-auto">
      {children}
      </div>
    </div>
  )
}

import {HTMLAttributes, PropsWithChildren} from "react"
import {useClassName} from "../../hooks/className"

export type FlexDirection = "horizontal" | "vertical"

const directionToClassName: Record<FlexDirection, string> = {
  horizontal: "flex-row",
  vertical: "flex-col",
}
const resolveDirection = (direction?: FlexDirection) => directionToClassName[direction ?? "horizontal"]

export type FlexGroupProps = {
  direction: FlexDirection
} & HTMLAttributes<HTMLDivElement>

export function FlexGroup(props: PropsWithChildren<FlexGroupProps>) {
  const {direction, children, className: divClassName, ...div} = props

  const className = useClassName(resolveDirection(direction), props.className, divClassName)

  return (
    <div className={`flex ${className}`} {...div}>
      {children}
    </div>
  )
}

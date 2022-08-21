import React, {cloneElement, CSSProperties, useEffect, useMemo, useRef, useState} from "react"

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max))

const useRangeSlider = <T, >(choices: T[], choiceMapper: (choice: T) => string, initialValue = 0, showLabel = false) => {
  const choiceLabels = choices.map(choiceMapper)
  const calculateLeftOffset = (index: number) => index / (choices.length - 1) * 90 + 5

  const ref = useRef<HTMLDivElement | null>(null)
  const [valueIndex, setValueIndex] = useState(initialValue)

  const ticks = choices.map((choice, index) => {
    return <div className="absolute custom-slider-tick" draggable={false} style={{left: `${calculateLeftOffset(index)}%`}}>{showLabel && choiceLabels[index]}</div>
  })

  const onMouseMove = (event: MouseEvent) => {
    event.preventDefault()

    const element = ref.current as HTMLDivElement
    const rect = element.getBoundingClientRect()
    const left = rect.left + 5
    const right = rect.right - 5
    const current = event.clientX
    const localIncrement = (right - left) / (choices.length - 1)
    const snappedValue = (current - left) / localIncrement
    const finalValue = clamp(Math.round(snappedValue), 0, choices.length - 1)

    // const debug = {
    //   element: element,
    //   left,
    //   right,
    //   current,
    //   "right - left": right - left,
    //   snappedValue,
    //   localIncrement,
    //   finalValue,
    // }

    // console.log(debug)
    setValueIndex(finalValue)
  }

  const onMouseUp = (event: MouseEvent) => {
    event.preventDefault()
    document.removeEventListener("mousemove", onMouseMove)
    document.removeEventListener("mouseup", onMouseUp)
  }

  const onMouseDown = (event: MouseEvent) => {
    if (event.button !== 0) {
      return
    }
    event.preventDefault()
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)

    onMouseMove(event)
  }

  return {
    ref,
    min: 0,
    max: choices.length - 1,
    step: 1,
    sliderProps: {
      onMouseDown: (event: React.MouseEvent) => {
        ref.current = event.currentTarget as HTMLDivElement
        onMouseDown(event.nativeEvent)
      },
      onWheel: (event: React.WheelEvent) => {
        const direction = Math.sign(event.deltaY)
        const newValueIndex = clamp(valueIndex + direction, 0, choices.length - 1)

        setValueIndex(newValueIndex)
      },
    },
    thumbProps: {
      style: ({left: `${calculateLeftOffset(valueIndex)}%`}) as CSSProperties,
    },
    choiceLabels,
    ticks,
    value: choices[valueIndex],
  }
}

type CustomSliderProps<T> = {
  id: string
  label?: string
  choices: T[]
  choiceLabelMapper: (choice: T) => string
  initialValue?: T
  onChange: (newValue: T) => void
}

export function CustomSlider<T>(props: CustomSliderProps<T>) {
  const {id, label, choices, choiceLabelMapper, initialValue, onChange} = props

  const initialValueIndex = useMemo(() => initialValue ? choices.findIndex(choice => choice === initialValue) : 0, [initialValue])
  const {choiceLabels, sliderProps, thumbProps, ticks, value} = useRangeSlider(choices, choiceLabelMapper, initialValueIndex)

  useEffect(() => {
    onChange(value)
  }, [value])

  return (
    <div id={id} className="flex flex-row items-center w-full">
      {label && <span className="pr-2">{label}</span>}
      <div className="custom-slider w-full" {...sliderProps}>
        <div className="custom-slider-track my-1" />
        <div className="custom-slider-thumb pointer-events-none" {...thumbProps} />
        {ticks.map((tick, index) => cloneElement(tick, {key: choiceLabels[index]}))}
      </div>
    </div>
  )
}

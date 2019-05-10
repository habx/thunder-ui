import { exact } from 'prop-types'
import * as React from 'react'

import SliderDotProps from './SliderDot.interface'
import { SliderDotContainer } from './SliderDot.style'

type Listeners = {
  mousemove?: EventListener
  mouseup?: EventListener
}

const useMouseMove = ({ onMove }) => {
  const listeners: React.MutableRefObject<Listeners> = React.useRef({})
  const restPosition: React.MutableRefObject<number> = React.useRef(0)

  const addListener = (listenerName: keyof Listeners, listener) => {
    document.addEventListener(listenerName, listener)
    listeners.current[listenerName] = listener
  }

  const removeListener = (listenerName: keyof Listeners) => {
    document.removeEventListener(listenerName, listeners.current[listenerName])
    listeners.current[listenerName] = null
  }

  const handleMouseDown = e => {
    const handleMouseMove = e => {
      onMove(e.pageX - restPosition.current)
      e.preventDefault()
    }

    const handleMouseUp = () => {
      removeListener('mousemove')
      removeListener('mouseup')
    }

    addListener('mousemove', handleMouseMove)
    addListener('mouseup', handleMouseUp)

    restPosition.current = e.pageX
  }

  return { onMouseDown: handleMouseDown }
}

const SliderDot: React.FunctionComponent<SliderDotProps> = ({
  min,
  max,
  step,
  value,
  getBarWidth,
}) => {
  const getPositionFromValue = currentValue =>
    (100 * (currentValue - min)) / (max - min)

  const [position, setPosition] = React.useState(getPositionFromValue(value))

  const possibleValues = Array.from(
    { length: (max - min) / step + 1 },
    (_, i) => min + i * step
  )

  const sanitizePosition = position => {
    const exactPosition = Math.min(Math.max(position, 0), 100)

    const exactValue = (exactPosition * (max - min)) / 100 + min

    // const lowerValue = Math.floor(exactValue / step) * step
    const value = Math.round(exactValue / step) * step

    return getPositionFromValue(value)

    // position = (100 * (value - min)) / (max - min)
    // position * (max - min) / 100 = value - min
    // value = (position * (max - min)) / 100 + min
  }

  const handlePositionChange = delta => {
    const newPosition = position + (delta / getBarWidth()) * 100

    setPosition(sanitizePosition(newPosition))
  }

  const eventProps = useMouseMove({ onMove: handlePositionChange })

  return <SliderDotContainer style={{ left: `${position}%` }} {...eventProps} />
}

export default SliderDot

import * as React from 'react'

import SliderDotProps from './SliderDot.interface'
import { SliderDotContainer, SliderInnerDot } from './SliderDot.style'

type Listeners = {
  mousemove?: EventListener
  mouseup?: EventListener
  touchmove?: EventListener
  touchend?: EventListener
}

const getTouchPosition = e => e.touches[0].pageX
const getMousePosition = e => e.pageX

const useMouseMove = ({ onMove, onRest }) => {
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
      onMove(getMousePosition(e) - restPosition.current)
      e.preventDefault()
    }

    const handleMouseUp = () => {
      removeListener('mousemove')
      removeListener('mouseup')
      onRest()
    }

    addListener('mousemove', handleMouseMove)
    addListener('mouseup', handleMouseUp)

    restPosition.current = getMousePosition(e)
  }

  const handleTouchStart = e => {
    const handleTouchMove = e => {
      onMove(getTouchPosition(e) - restPosition.current)
      e.preventDefault()
    }

    const handleTouchEnd = () => {
      removeListener('touchmove')
      removeListener('touchend')
      onRest()
    }

    addListener('touchmove', handleTouchMove)
    addListener('touchend', handleTouchEnd)

    restPosition.current = getTouchPosition(e)
  }

  return { onMouseDown: handleMouseDown, onTouchStart: handleTouchStart }
}

const SliderDot: React.FunctionComponent<SliderDotProps> = ({
  position,
  onMove,
  onRest,
  innerColor,
}) => {
  const eventProps = useMouseMove({ onMove, onRest })

  return (
    <SliderDotContainer
      data-testid="slider-dot"
      style={{ left: `${position}%` }}
      {...eventProps}
    >
      {innerColor && <SliderInnerDot style={{ backgroundColor: innerColor }} />}
    </SliderDotContainer>
  )
}

export default SliderDot

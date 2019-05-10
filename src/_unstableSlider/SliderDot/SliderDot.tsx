import * as React from 'react'

import SliderDotProps from './SliderDot.interface'
import { SliderDotContainer, SliderInnerDot } from './SliderDot.style'

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
  position,
  onMove,
  innerColor,
}) => {
  const eventProps = useMouseMove({ onMove })

  return (
    <SliderDotContainer style={{ left: `${position}%` }} {...eventProps}>
      {innerColor && <SliderInnerDot style={{ backgroundColor: innerColor }} />}
    </SliderDotContainer>
  )
}

export default SliderDot

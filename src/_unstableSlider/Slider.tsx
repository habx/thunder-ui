import * as React from 'react'

import SliderProps from './Slider.interface'
import { SliderContainer, SliderContent } from './Slider.style'
import SliderBar from './SliderBar'
import SliderDot from './SliderDot'

const Slider: React.FunctionComponent<SliderProps> = ({
  range,
  value,
  onChange,
  min,
  max,
  step,
  labelFormatter,
  ...props
}) => {
  const barRef = React.useRef(null)
  const [localValue, setLocalValue] = React.useState(value)

  const getBarWidth = () => barRef.current.offsetWidth

  const buildDot = (rangeIndex?: number) => {
    const dotValue = range ? localValue[rangeIndex] : localValue

    const position = (100 * (dotValue - min)) / (max - min)

    const handlePositionChange = delta => {
      const newPosition = position + (delta / getBarWidth()) * 100

      const exactPosition = Math.min(Math.max(newPosition, 0), 100)
      const exactValue = (exactPosition * (max - min)) / 100 + min

      const newValue = Math.round(exactValue / step) * step

      setLocalValue(prev => {
        if (range) {
          const values = [...prev]
          values[rangeIndex] = newValue
          return values
        }

        return newValue
      })
    }

    return (
      <SliderDot
        position={position}
        labelFormatter={labelFormatter}
        onMove={handlePositionChange}
      />
    )
  }

  const valueDots = range ? [buildDot(0), buildDot(1)] : buildDot()

  const valueBar = <SliderBar />

  return (
    <SliderContainer {...props}>
      <SliderContent ref={barRef} />
      {valueDots}
      {valueBar}
    </SliderContainer>
  )
}

Slider.defaultProps = {
  labelFormatter: label => label,
  range: false,
  customValues: null,
  value: null,
  toolTipSuffix: '',
  min: 0,
  max: 100,
  step: 5,
  indicators: [],
}

export default Slider

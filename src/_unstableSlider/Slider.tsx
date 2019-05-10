import * as React from 'react'

import SliderProps from './Slider.interface'
import { SliderContainer, SliderContent, SliderLabel } from './Slider.style'
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
  toolTipSuffix,
  ...props
}) => {
  const barRef = React.useRef(null)
  const [localValue, setLocalValue] = React.useState(value)

  const getBarWidth = () => barRef.current.offsetWidth

  const getPositionFromValue = currentValue =>
    (100 * (currentValue - min)) / (max - min)

  const buildDot = (rangeIndex?: number) => {
    const dotValue = range ? localValue[rangeIndex] : localValue

    const position = getPositionFromValue(dotValue)

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

    return <SliderDot position={position} onMove={handlePositionChange} />
  }

  const buildBar = ({ from, to }) => {
    return (
      <SliderBar
        from={getPositionFromValue(from)}
        to={getPositionFromValue(to)}
      />
    )
  }

  const valueDots = range ? [buildDot(0), buildDot(1)] : buildDot()

  const valueBars = range
    ? buildBar({ from: localValue[0], to: localValue[1] })
    : buildBar({ from: min, to: localValue })

  const label = (() => {
    const buildValueLabel = value => labelFormatter(value)

    if (range) {
      const from = buildValueLabel(localValue[0])
      const to = buildValueLabel(localValue[1])
      return `${from} à ${to}${toolTipSuffix}`
    }

    const label = buildValueLabel(localValue)
    return `${label}${toolTipSuffix}`
  })()

  const labelPosition = range
    ? getPositionFromValue(localValue[0])
    : getPositionFromValue(localValue)

  return (
    <SliderContainer {...props}>
      <SliderContent ref={barRef} />
      {valueDots}
      {valueBars}
      <SliderLabel style={{ left: `calc(${labelPosition}% - 4px)` }}>
        {label}
      </SliderLabel>
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

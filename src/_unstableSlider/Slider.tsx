import * as React from 'react'

import SliderProps from './Slider.interface'
import {
  SliderContainer,
  SliderContent,
  SliderLabel,
  SliderBackgroundDot,
} from './Slider.style'
import SliderBar from './SliderBar'
import SliderDot from './SliderDot'

const Slider: React.FunctionComponent<SliderProps> = ({
  disabled,
  range,
  value,
  onChange,
  labelFormatter,
  toolTipSuffix,
  customValues,
  min,
  max: rawMax,
  step: rawStep,
  ...props
}) => {
  const max = customValues ? customValues.length - 1 : rawMax
  const step = customValues ? 1 : rawStep

  const barRef = React.useRef(null)
  const [localValue, setLocalValue] = React.useState(value)

  const getBarWidth = () => barRef.current.offsetWidth

  const getPositionFromValue = currentValue =>
    (100 * (currentValue - min)) / (max - min)

  const buildDot = (rangeIndex?: number) => {
    const dotValue = range ? localValue[rangeIndex] : localValue

    const position = getPositionFromValue(dotValue)

    const getPossibleValuesBoundaries = () => {
      if (range) {
        if (rangeIndex === 0) {
          return { min: 0, max: localValue[1] }
        }

        return { min: localValue[0], max: 100 }
      }

      return { min: 0, max: 100 }
    }

    const handlePositionChange = delta => {
      const boundaries = getPossibleValuesBoundaries()
      const newPosition = position + (delta / getBarWidth()) * 100

      const boundedPosition = Math.min(
        Math.max(newPosition, boundaries.min),
        boundaries.max
      )
      const exactValue = (boundedPosition * (max - min)) / 100 + min

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
    const buildValueLabel = value => {
      const label = customValues ? customValues[value] : value

      return labelFormatter(label)
    }

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

  const showDots = !!customValues

  const possibleValues = Array.from(
    { length: (max - min) / step + 1 },
    (_, i) => (min + i) * step
  )

  return (
    <SliderContainer {...props} data-disabled={disabled}>
      <SliderContent ref={barRef} />
      {valueDots}
      {valueBars}
      <SliderLabel style={{ left: `${labelPosition}%` }}>{label}</SliderLabel>
      {showDots &&
        possibleValues.map(value => (
          <SliderBackgroundDot
            style={{ left: `${getPositionFromValue(value)}%` }}
          />
        ))}
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

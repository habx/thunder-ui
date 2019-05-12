import * as React from 'react'

import { isFunction } from '../_internal/data'
import withLabel from '../withLabel'

import SliderProps from './Slider.interface'
import {
  SliderContainer,
  SliderContent,
  SliderMainBar,
  SliderTooltip,
  SliderBackgroundDot,
  SliderIndicator,
} from './Slider.style'
import SliderBar from './SliderBar'
import SliderDot from './SliderDot'

const getTooltip = ({
  localValue,
  range,
  customValues,
  tooltipFormatter: formatter,
  tooltipRangeSeparator: rangeSeparator,
  tooltipSuffix: suffix,
}) => {
  const getDotLabel = value => (customValues ? customValues[value] : value)

  const buildRawTooltip = () => {
    if (range) {
      const from = getDotLabel(localValue[0])
      const to = getDotLabel(localValue[1])

      return `${from}${rangeSeparator}${to}${suffix}`
    }

    return `${getDotLabel(localValue)}${suffix}`
  }

  const rawTooltip = buildRawTooltip()

  return isFunction(formatter) ? formatter(localValue, rawTooltip) : rawTooltip
}

const Slider: React.FunctionComponent<SliderProps> = ({
  disabled,
  range,
  onChange,
  tooltipFormatter,
  tooltipRangeSeparator,
  tooltipSuffix,
  customValues,
  indicators,
  min,
  max: rawMax,
  step: rawStep,
  dots: rawDots,
  value: rawValue,
  ...props
}) => {
  const max = customValues ? customValues.length - 1 : rawMax
  const step = customValues ? 1 : rawStep
  const dots = customValues ? true : rawDots
  const value = !Array.isArray(rawValue) && range ? [null, null] : rawValue

  const barRef = React.useRef(null)
  const [localValue, setLocalValue] = React.useState(value)
  const localValueRef = React.useRef(value)

  React.useEffect(() => {
    localValueRef.current = localValue
  }, [localValue])

  React.useEffect(() => {
    setLocalValue(value)
  }, [value])

  const getPositionFromValue = currentValue =>
    (100 * (currentValue - min)) / (max - min)

  const buildDot = (rangeIndex?: number) => {
    const dotValue = range ? localValue[rangeIndex] : localValue
    const matchingIndicator = indicators.find(
      ({ range }) =>
        Math.min(...range) <= dotValue && Math.max(...range) >= dotValue
    )

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
      const newPosition = position + (delta / barRef.current.offsetWidth) * 100

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

    const handleChange = () => {
      onChange(localValueRef.current)
    }

    return (
      <SliderDot
        key={rangeIndex}
        position={position}
        onMove={handlePositionChange}
        onRest={handleChange}
        innerColor={matchingIndicator ? matchingIndicator.color : null}
      />
    )
  }

  const buildBar = ({ from, to }) => (
    <SliderBar
      from={getPositionFromValue(from)}
      to={getPositionFromValue(to)}
    />
  )

  const valueDots = range ? [buildDot(0), buildDot(1)] : buildDot()

  const valueBars = range
    ? buildBar({ from: localValue[0], to: localValue[1] })
    : buildBar({ from: min, to: localValue })

  const tooltip = getTooltip({
    localValue,
    customValues,
    tooltipFormatter,
    tooltipSuffix,
    tooltipRangeSeparator,
    range,
  })

  const tooltipPosition = range
    ? getPositionFromValue(localValue[0])
    : getPositionFromValue(localValue)

  const possibleValues = Array.from(
    { length: (max - min) / step + 1 },
    (_, i) => (min + i) * step
  )

  return (
    <SliderContainer>
      <SliderContent {...props} data-disabled={disabled}>
        <SliderMainBar ref={barRef} />
        {valueDots}
        {valueBars}
        {indicators.map(({ color, range }) => (
          <SliderIndicator
            key={range.join('.')}
            color={color}
            style={{
              left: `${((Math.min(...range) - min) / (max - min)) * 100}%`,
              right: `${(1 - (Math.max(...range) - min) / (max - min)) * 100}%`,
            }}
          />
        ))}
        <SliderTooltip
          data-testid="slider-tooltip"
          style={{ paddingLeft: `${tooltipPosition}%` }}
        >
          {tooltip}
        </SliderTooltip>
        {dots &&
          possibleValues.map((value, index) => (
            <SliderBackgroundDot
              key={index}
              style={{ left: `${getPositionFromValue(value)}%` }}
            />
          ))}
      </SliderContent>
    </SliderContainer>
  )
}

Slider.defaultProps = {
  tooltipRangeSeparator: ' to ',
  tooltipSuffix: '',
  range: false,
  customValues: null,
  value: null,
  min: 0,
  max: 100,
  step: 5,
  indicators: [],
}

export default withLabel()(Slider)

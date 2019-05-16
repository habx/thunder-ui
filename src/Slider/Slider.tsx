import * as React from 'react'

import { isFunction, isNil } from '../_internal/data'
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
  min,
  max,
}) => {
  const getValue = (value: number, rangeIndex?: 0 | 1) => {
    if (isNil(value)) {
      return rangeIndex === 1 ? max : min
    }

    return value
  }

  const getDotLabel = (value, rangeIndex?: 0 | 1) => {
    const sanitizedValue = getValue(value, rangeIndex)

    return customValues ? customValues[sanitizedValue] || '' : sanitizedValue
  }

  const buildRawTooltip = () => {
    if (range) {
      const from = getDotLabel(localValue[0], 0)
      const to = getDotLabel(localValue[1], 1)

      return `${from}${rangeSeparator}${to}${suffix}`
    }

    return `${getDotLabel(localValue)}${suffix}`
  }

  const rawTooltip = buildRawTooltip()

  return isFunction(formatter) ? formatter(localValue, rawTooltip) : rawTooltip
}

const EMPTY_RANGE = [null, null]

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
  const value = !Array.isArray(rawValue) && range ? EMPTY_RANGE : rawValue

  const barRef = React.useRef(null)
  const [localValue, setLocalValue] = React.useState(value)
  const localValueRef = React.useRef(value)
  const hasValue = range
    ? !isNil(localValue[0]) && !isNil(localValue[1])
    : isNil(localValue)

  React.useEffect(() => {
    localValueRef.current = localValue
  }, [localValue])

  React.useEffect(() => {
    setLocalValue(value)
  }, [value])

  const getPositionFromValue = (currentValue?: number) => {
    if (isNil(currentValue)) {
      return 0
    }

    return (100 * (currentValue - min)) / (max - min)
  }

  const getValueFromPosition = (currentPosition: number) => {
    const boundedPosition = Math.min(Math.max(currentPosition, 0), 100)

    const exactValue = (boundedPosition * (max - min)) / 100 + min

    return Math.round(exactValue / step) * step
  }

  const buildDot = (rangeIndex?: number) => {
    const getDotValue = () => {
      if (range) {
        if (rangeIndex === 1) {
          return isNil(localValue[1]) ? max : localValue[1]
        }

        return isNil(localValue[0]) ? min : localValue[0]
      }

      return isNil(value) ? min : value
    }

    const dotValue = getDotValue()

    const matchingIndicator = indicators.find(
      ({ range }) =>
        Math.min(...range) <= dotValue && Math.max(...range) >= dotValue
    )

    const position = getPositionFromValue(dotValue)

    const handlePositionChange = (delta: number) => {
      const newPosition = position + (delta / barRef.current.offsetWidth) * 100

      const newValue = getValueFromPosition(newPosition)

      setLocalValue(prev =>
        range
          ? [
              ...prev.slice(0, rangeIndex),
              newValue,
              ...prev.slice(rangeIndex + 1),
            ]
          : newValue
      )
    }

    return (
      <SliderDot
        key={rangeIndex}
        position={position}
        onMove={handlePositionChange}
        onRest={() => handleChange(localValueRef.current)}
        innerColor={matchingIndicator ? matchingIndicator.color : null}
      />
    )
  }

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const setValue = val => {
      setLocalValue(val)
      handleChange(val)
    }

    if (barRef.current) {
      const eventPosition =
        e.pageX - barRef.current.getBoundingClientRect().left
      const newPosition = (eventPosition / barRef.current.offsetWidth) * 100

      const value = getValueFromPosition(newPosition)

      if (range) {
        if (!hasValue) {
          setValue([min, value])
        } else {
          const isUpdatingFirstElement =
            Math.abs(value - (localValue[0] || 0)) <
            Math.abs(value - (localValue[1] || 0))

          setValue(
            isUpdatingFirstElement
              ? [value, localValue[1]]
              : [localValue[0], value]
          )
        }
      } else {
        setValue(value)
      }
    }
  }

  const handleChange = val => {
    const sanitizedValue =
      Array.isArray(val) && val[0] > val[1] ? [val[1], val[0]] : val

    onChange(sanitizedValue)
  }

  const buildBar = () => {
    const getComponent = ({ from, to }) => (
      <SliderBar
        from={getPositionFromValue(from)}
        to={getPositionFromValue(to)}
      />
    )

    if (range) {
      if (
        !hasValue ||
        (Array.isArray(customValues) && customValues.length === 0)
      ) {
        return getComponent({ from: min, to: max })
      }

      return getComponent({
        from: Math.min(...localValue),
        to: Math.max(...localValue),
      })
    }

    return getComponent({ from: min, to: localValue })
  }

  const valueDots = range ? [buildDot(0), buildDot(1)] : buildDot()

  const valueBar = buildBar()

  const tooltip = getTooltip({
    localValue,
    customValues,
    tooltipFormatter,
    tooltipSuffix,
    tooltipRangeSeparator,
    range,
    min,
    max,
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
      <SliderContent
        {...props}
        data-disabled={disabled}
        onClick={handleBarClick}
      >
        <SliderMainBar ref={barRef} />
        {valueDots}
        {valueBar}
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

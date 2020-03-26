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
}: SliderProps & {
  localValue: number | [number, number]
  min: number
  max: number
}) => {
  const getValue = (value: number, rangeIndex?: 0 | 1): number => {
    if (isNil(value)) {
      return rangeIndex === 1 ? max : min
    }

    return value
  }

  const getDotLabel = (value: number, rangeIndex?: 0 | 1) => {
    const sanitizedValue = getValue(value, rangeIndex)

    return customValues ? customValues[sanitizedValue] || '' : sanitizedValue
  }

  const buildRawTooltip = () => {
    if (range) {
      const rangeLocalValue = localValue as [number, number]
      const from = getDotLabel(rangeLocalValue[0], 0)
      const to = getDotLabel(rangeLocalValue[1], 1)

      return `${from}${rangeSeparator}${to}${suffix}`
    }

    return `${getDotLabel(localValue as number)}${suffix}`
  }

  const rawTooltip = buildRawTooltip()
  return isFunction(formatter) ? formatter(localValue, rawTooltip) : rawTooltip
}

const EMPTY_RANGE = [null, null]

const Slider = React.forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  const {
    disabled = false,
    range = false,
    onChange = () => {},
    tooltipFormatter,
    tooltipRangeSeparator = ' to ',
    tooltipSuffix = '',
    customValues,
    indicators = [],
    min = 0,
    max: rawMax = 100,
    step: rawStep = 5,
    dots: rawDots,
    value: rawValue,
    ...rest
  } = props

  const max = customValues ? customValues.length - 1 : rawMax
  const step = customValues ? 1 : rawStep
  const dots = customValues ? true : rawDots
  const value = !Array.isArray(rawValue) && range ? EMPTY_RANGE : rawValue

  const barRef = React.useRef<HTMLDivElement>(null)
  const [localValue, setLocalValue] = React.useState(value)
  const localValueRef = React.useRef(value)
  const hasValue = range
    ? !isNil((localValue as [number, number])[0]) &&
      !isNil((localValue as [number, number])[1])
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

  const buildDot = (rangeIndex: 0 | 1 = 0) => {
    const getDotValue = (): number => {
      if (range) {
        if (rangeIndex === 1) {
          return isNil((localValue as [number, number])[1])
            ? max
            : (localValue as [number, number])[1]
        }

        return isNil((localValue as [number, number])[0])
          ? min
          : (localValue as [number, number])[0]
      }

      return isNil(localValue) ? min : (localValue as number)
    }

    const dotValue = getDotValue()

    const matchingIndicator = indicators.find(
      indicator =>
        Math.min(...indicator.range) <= dotValue &&
        Math.max(...indicator.range) >= dotValue
    )

    const position = getPositionFromValue(dotValue)

    const handlePositionChange = (delta: number) => {
      const newPosition =
        position +
        (delta /
          (barRef.current
            ? (barRef.current as HTMLDivElement).offsetWidth
            : 0)) *
          100

      const newValue = getValueFromPosition(newPosition)

      setLocalValue((prev: number | [number, number]) =>
        range
          ? [
              ...(prev as [number, number]).slice(0, rangeIndex),
              newValue,
              ...(prev as [number, number]).slice(rangeIndex + 1),
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
        innerColor={matchingIndicator ? matchingIndicator.color : undefined}
      />
    )
  }

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const setValue = (val: [number, number] | number) => {
      setLocalValue(val)
      handleChange(val)
    }

    if (barRef.current) {
      const eventPosition =
        e.pageX - barRef.current.getBoundingClientRect().left
      const newPosition = (eventPosition / barRef.current.offsetWidth) * 100

      const newValue = getValueFromPosition(newPosition)

      if (range) {
        if (!hasValue) {
          setValue([min, newValue])
        } else {
          const isUpdatingFirstElement =
            Math.abs(newValue - (localValue[0] || 0)) <
            Math.abs(newValue - (localValue[1] || 0))

          setValue(
            isUpdatingFirstElement
              ? [newValue, localValue[1]]
              : [localValue[0], newValue]
          )
        }
      } else {
        setValue(newValue)
      }
    }
  }

  const handleChange = (val: [number, number] | number) => {
    const sanitizedValue =
      Array.isArray(val) && val[0] > val[1] ? [val[1], val[0]] : val

    onChange(sanitizedValue)
  }

  const buildBar = () => {
    const getComponent = ({ from, to }: { from: number; to: number }) => (
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

  const buildIndicator = () =>
    indicators.map(indicator => {
      const indicatorMinInRange = Math.min(...indicator.range)
      const indicatorMaxInRange = Math.max(...indicator.range)
      const indicatorMin = indicatorMinInRange > min ? indicatorMinInRange : min
      const indicatorMax = indicatorMaxInRange < max ? indicatorMaxInRange : max

      return (
        <SliderIndicator
          key={indicator.range.join('.')}
          color={indicator.color}
          style={{
            left: `${((indicatorMin - min) / (max - min)) * 100}%`,
            right: `${(1 - (indicatorMax - min) / (max - min)) * 100}%`,
          }}
        />
      )
    })

  const valueDots = range ? [buildDot(0), buildDot(1)] : buildDot()

  const valueBar = buildBar()

  const valueIndicator = buildIndicator()

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
        {...rest}
        data-disabled={disabled}
        onClick={handleBarClick}
        ref={ref}
      >
        <SliderMainBar ref={barRef} />
        {valueDots}
        {valueBar}
        {valueIndicator}
        <SliderTooltip
          data-testid="slider-tooltip"
          style={{ paddingLeft: `${tooltipPosition}%` }}
        >
          {tooltip}
        </SliderTooltip>
        {dots &&
          possibleValues.map((possibleValue, index) => (
            <SliderBackgroundDot
              key={index}
              style={{ left: `${getPositionFromValue(possibleValue)}%` }}
            />
          ))}
      </SliderContent>
    </SliderContainer>
  )
})

export default withLabel<HTMLDivElement>()(Slider)

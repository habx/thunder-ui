import * as React from 'react'
import { withTheme } from 'styled-components'
import BaseSlider, { Range, Handle } from 'rc-slider'

import withLabel from '../withLabel'
import theme from '../theme'

import { SliderContainer, Label, SliderIndicator, SliderHandlerIndicator } from './Slider.style'
import SliderProps, { SliderInnerProps } from './Slider.interface'

const getBackgroundColor = (value, indicators) => indicators.reduce(
  (currentColor, indicator) => {
    if (value >= Math.min(...indicator.range) && value <= Math.max(...indicator.range) + 1) {
      return indicator.color
    }

    return currentColor
  },
  null
)

const Slider: React.StatelessComponent<SliderInnerProps> = ({
  range,
  max,
  customValues,
  toolTipSuffix,
  min,
  step,
  labelFormatter,
  indicators,
  value,
  onChange,
  ...props
}) => {
  const [localValue, setLocalValue] = React.useState(value === null ? (range ? [min, max] : min) : value)

  const handleChange = React.useCallback(() => {
    if (value !== localValue) {
      onChange(localValue)
    }
  }, [onChange, value])

  const SliderComponent = range ? Range : BaseSlider
  const realMax = customValues ? customValues.length - 1 : (max || 100) - ((max || 100) % step)
  const realMin = customValues ? min : min - (min % step)

  const isValueArray = Array.isArray(localValue)
  const label = isValueArray
    ? `${labelFormatter(value[0])} à ${labelFormatter(localValue[1])}${toolTipSuffix}`
    : `${(customValues ? customValues[(localValue as number)] : `${labelFormatter(localValue) || 0}${toolTipSuffix}`)}`

  return (
    <SliderContainer
      color={theme.get('primary', { dynamic: true })(props)}
      {...props}
    >
      {indicators.map(({ color, range }) => {
        const size = (Math.max(...range) - Math.min(...range)) / (realMax - realMin) * 100
        const position = (Math.min(...range) - realMin) / (realMax - realMin) * 100

        return (
          <SliderIndicator
            key={range.join('.')}
            color={color}
            size={size}
            position={position}
          />
        )
      })}
      <SliderComponent
        onAfterChange={handleChange}
        onChange={setLocalValue}
        value={localValue}
        dots={!!customValues}
        max={realMax}
        min={realMin}
        step={customValues ? 1 : step}
        handle={({ dragging, ...handleProps }) => (
          <Handle {...handleProps} dragging={`${dragging}`} key={`rc-handle-${handleProps.index}`}>
            <SliderHandlerIndicator
              style={{ backgroundColor: getBackgroundColor(handleProps.value, indicators) }}
            />
          </Handle>
        )
        }
      />
      <Label
        style={{ left: `calc(100%/${realMax}*${isValueArray ? localValue[0] : localValue})` }}
        color={theme.get('primary', { propName: 'tooltipColor', dynamic: true })(props)}
      >
        {label || ''}
      </Label>
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
  indicators: []
}

export default withLabel({ padding: 12 })(withTheme(Slider) as React.ComponentType<SliderProps>)

import * as React from 'react'
import { withTheme } from 'styled-components'
import BaseSlider, { Range, Handle } from 'rc-slider'

import withLabel from '../withLabel'
import { getMainColor } from '../_internal/colors'
import { omit } from '../_internal/data'

import { SliderContainer, Label, SliderIndicator, SliderHandlerIndicator } from './Slider.style'
import SliderProps from './Slider.interface'

const INTERNAL_PROPS = [
  'range',
  'max',
  'customValues',
  'toolTipSuffix',
  'min',
  'step',
  'labelFormatter',
  'value',
  'error',
  'indicators'
]

const getBackgroundColor = (value, indicators) => indicators.reduce(
  (currentColor, indicator) => {
    if (value >= Math.min(...indicator.range) && value <= Math.max(...indicator.range) + 1) {
      return indicator.color
    }

    return currentColor
  },
  null
)

class Slider extends React.Component<SliderProps> {
  static defaultProps = {
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

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.value !== prevState.rawValue && nextProps.value != null) {
      return {
        value: nextProps.value,
        rawValue: nextProps.value
      }
    }

    return null
  }

  state = {
    value: this.getInitialValue(),
    rawValue: null
  }

  getInitialValue () {
    const { value, range, min, max } = this.props

    if (value == null) {
      return range ? [min, max] : min
    }

    return value
  }

  handleLocalChange = value => this.setState({ value })

  handleChange = () => {
    const { value, onChange } = this.props
    const { value: localValue } = this.state

    if (value !== localValue) {
      onChange(localValue)
    }
  }

  render () {
    const {
      range,
      max,
      customValues,
      toolTipSuffix,
      min,
      step,
      labelFormatter,
      indicators,
      error
    } = this.props
    const { value } = this.state

    const innerProps = omit(this.props, INTERNAL_PROPS)

    const SliderComponent = range ? Range : BaseSlider
    const realMax = customValues ? customValues.length - 1 : (max || 100) - ((max || 100) % step)
    const realMin = customValues ? min : min - (min % step)

    const isValueArray = Array.isArray(value)
    const label = isValueArray
      ? `${labelFormatter(value[0])} à ${labelFormatter(value[1])}${toolTipSuffix}`
      : `${(customValues ? customValues[(value as number)] : `${labelFormatter(value) || 0}${toolTipSuffix}`)}`

    const mainColor = getMainColor(this.props)
    return (
      <SliderContainer color={mainColor} {...innerProps}>
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
          onAfterChange={this.handleChange}
          onChange={this.handleLocalChange}
          value={value}
          dots={!!customValues}
          max={realMax}
          min={realMin}
          step={customValues ? 1 : step}
          handle={handleProps => (
            <Handle {...handleProps}>
              <SliderHandlerIndicator
                style={{ backgroundColor: getBackgroundColor(handleProps.value, indicators) }}
              />
            </Handle>
          )}
        />
        <Label
          value={isValueArray ? value[0] : value} max={realMax}
          color={getMainColor(this.props, { propName: 'tooltipColor' })}
        >
          {label ? label : ''}
        </Label>
      </SliderContainer>
    )
  }
}

export default withTheme(withLabel({ padding: 12 })(Slider))

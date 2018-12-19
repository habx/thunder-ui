import * as React from 'react'
import Slider, { Range } from 'rc-slider'

import { colors } from '../../theme'
import { SliderContainer, Label } from './Slider.style'
import SliderProps from './Slider.interface'

class CustomSlider extends React.Component<SliderProps> {
  static defaultProps = {
    labelFormatter: label => label,
    range: false,
    customValues: null,
    value: null,
    toolTipSuffix: '',
    min: 0,
    max: 100,
    color: colors.brightCerualean,
    step: 5,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.rawValue && nextProps.value != null) {
      return {
        value: nextProps.value,
        rawValue: nextProps.value,
      }
    }

    return null
  }

  state = {
    value: this.getInitialValue(),
  }

  getInitialValue() {
    const { value, range, min, max } = this.props

    if (value == null) {
      return range ? [min, max] : min
    }

    return value
  }

  handleChange = value => this.setState({ value })

  render() {
    const { onChange, range, max, customValues, toolTipSuffix,
      min, color, step, labelFormatter } = this.props
    const { value } = this.state

    const SliderComponent = range ? Range : Slider
    const realMax = customValues ? customValues.length - 1 : (max || 100) - ((max || 100) % step)
    const realMin = customValues ? min : min - (min % step)

    const isValueArray = Array.isArray(value)
    const label = isValueArray
      ? `${labelFormatter(value[0])} à ${labelFormatter(value[1])}${toolTipSuffix}`
      : `${(customValues ? customValues[(value as number)] : `${labelFormatter(value) || 0}${toolTipSuffix}`)}`

    return (
      <SliderContainer color={color}>
        <SliderComponent
          onAfterChange={onChange}
          onChange={this.handleChange}
          value={value}
          dots={!!customValues}
          max={realMax}
          min={realMin}
          step={customValues ? 1 : step}
        />
        <Label key={value} value={isValueArray ? value[0] : value} max={realMax}>
          {label ? label : ''}
        </Label>
      </SliderContainer>
    )
  }
}

export default CustomSlider

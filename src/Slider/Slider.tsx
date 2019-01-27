import * as React from 'react'
import BaseSlider, { Range } from 'rc-slider'

import colors from '../colors'
import withLabel from '../withLabel'

import { SliderContainer, Label } from './Slider.style'
import SliderProps from './Slider.interface'

class Slider extends React.Component<SliderProps> {
  static defaultProps = {
    labelFormatter: label => label,
    range: false,
    customValues: null,
    value: null,
    toolTipSuffix: '',
    min: 0,
    max: 100,
    color: colors.brightCerualean,
    step: 5
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
      color,
      step,
      labelFormatter,
      className
    } = this.props
    const { value } = this.state

    const SliderComponent = range ? Range : BaseSlider
    const realMax = customValues ? customValues.length - 1 : (max || 100) - ((max || 100) % step)
    const realMin = customValues ? min : min - (min % step)

    const isValueArray = Array.isArray(value)
    const label = isValueArray
      ? `${labelFormatter(value[0])} à ${labelFormatter(value[1])}${toolTipSuffix}`
      : `${(customValues ? customValues[(value as number)] : `${labelFormatter(value) || 0}${toolTipSuffix}`)}`

    return (
      <SliderContainer color={color} className={className}>
        <SliderComponent
          onAfterChange={this.handleChange}
          onChange={this.handleLocalChange}
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

export default withLabel({ padding: 12 })(Slider)

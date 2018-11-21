import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider, { Range } from 'rc-slider'

import { colors } from '../../theme'
import { SliderContainer, Label } from './style'

class CustomSlider extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    range: PropTypes.bool,
    customValues: PropTypes.arrayOf(PropTypes.string),
    toolTipSuffix: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    color: PropTypes.string,
    step: PropTypes.number,
  }

  static defaultProps = {
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
    const { onChange, range, max, customValues, toolTipSuffix, min, color, step } = this.props
    const { value } = this.state

    const SliderComponent = range ? Range : Slider
    const realMax = customValues ? customValues.length - 1 : (max || 100) - ((max || 100) % step)
    const realMin = customValues ? min : min - (min % step)

    const isValueArray = Array.isArray(value)

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
          {
            isValueArray
              ? `${value[0]} à ${value[1]}${toolTipSuffix}`
              : `${(customValues ? customValues[value] : `${value || 0}${toolTipSuffix}`)}`
          }
        </Label>
      </SliderContainer>
    )
  }
}

export default CustomSlider

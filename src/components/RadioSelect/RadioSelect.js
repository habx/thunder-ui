import React from 'react'
import PropTypes from 'prop-types'
import { map, includes, filter, isEmpty } from 'lodash'

import { colors } from '../../theme'
import { RadioSelectContainer, RadioSelectElement } from './style'


const RadioSelect = ({ options, onChange, value: currentValue, canBeEmpty, color, isMulti }) => {
  const getNewValue = item => {
    if (isMulti) {
      if (includes(currentValue, item)) {
        const newValue = filter(currentValue, value => value !== item)

        if (isEmpty(newValue)) {
          if (canBeEmpty) {
            return newValue
          }

          return currentValue
        }

        return newValue
      }

      return [...currentValue, item]
    }

    if (currentValue === item) {
      if (canBeEmpty) {
        return null
      }
    }

    return item
  }

  const isSelected = item => {
    if (isMulti) {
      return includes(currentValue, item)
    }

    return item === currentValue
  }

  return (
    <RadioSelectContainer color={color}>
      {map(options, ({ value, label }) => (
        <RadioSelectElement
          key={value}
          color={color}
          onClick={() => onChange(getNewValue(value))}
          data-checked={isSelected(value)}
        >
          {label}
        </RadioSelectElement>
      ))}
    </RadioSelectContainer>
  )
}

RadioSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  canBeEmpty: PropTypes.bool,
  isMulti: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  color: PropTypes.string,
}

RadioSelect.defaultProps = {
  canBeEmpty: true,
  isMulti: false,
  value: null,
  color: colors.brightCerualean,
}


export default RadioSelect

import React from 'react'
import PropTypes from 'prop-types'
import { map, includes, filter, isEmpty } from 'lodash'

import { colors } from '../../theme'
import { RadioSelectContainer, RadioSelectElement } from './style'


const RadioSelect = ({
  options,
  onChange,
  value: currentValue,
  canBeEmpty,
  color,
  isMulti,
  disabled,
}) => {
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
    <RadioSelectContainer color={color} data-disabled={disabled}>
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
  disabled: PropTypes.bool,
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  color: PropTypes.string,
}

RadioSelect.defaultProps = {
  canBeEmpty: true,
  isMulti: false,
  disabled: false,
  value: null,
  color: colors.brightCerualean,
}


export default RadioSelect

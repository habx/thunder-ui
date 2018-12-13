import * as React from 'react'
import { map, includes, filter, isEmpty } from 'lodash'

import { colors } from '../../theme'
import { RadioSelectContainer, RadioSelectElement } from './style'
import RadioSelectProps from './RadioSelect.interface'

const RadioSelect: React.FunctionComponent<RadioSelectProps> = ({
  options,
  onChange,
  value: currentValue,
  canBeEmpty,
  color,
  isMulti,
  disabled,
}) => {
  const getNewValue = item => {
    if (isMulti && Array.isArray(currentValue)) {
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

  const selected = map(options, ({ value }) => {
    if (isMulti && Array.isArray(currentValue)) {
      return includes(currentValue, value)
    }

    return value === currentValue
  })

  return (
    <RadioSelectContainer color={color} data-disabled={disabled}>
      {map(options, ({ value, label }, index) => (
        <RadioSelectElement
          isNextSelected={index < options.length - 1 && selected[index + 1]}
          isPreviousSelected={index > 0 && selected[index - 1]}
          key={value}
          color={color}
          onClick={() => onChange(getNewValue(value))}
          data-checked={selected[index]}
        >
          {label}
        </RadioSelectElement>
      ))}
    </RadioSelectContainer>
  )
}

RadioSelect.defaultProps = {
  canBeEmpty: true,
  isMulti: false,
  disabled: false,
  value: null,
  color: colors.brightCerualean,
}

export default RadioSelect

import * as React from 'react'
import { map, includes, filter, isEmpty } from 'lodash'

import withLabel from '../withLabel'
import { getMainColor } from '../_internal/colors'

import { RadioSelectContainer, RadioSelectElement } from './RadioSelect.style'
import RadioSelectProps from './RadioSelect.interface'

const RadioSelect: React.StatelessComponent<RadioSelectProps> = props => {
  const {
    options,
    onChange,
    value: currentValue,
    canBeEmpty,
    multi,
    disabled,
    ...rest
  } = props

  const getNewValue = item => {
    if (multi && Array.isArray(currentValue)) {
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
    if (multi && Array.isArray(currentValue)) {
      return includes(currentValue, value)
    }

    return value === currentValue
  })

  const color = getMainColor(props)

  return (
    <RadioSelectContainer color={color} data-disabled={disabled} {...rest}>
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
  multi: false,
  disabled: false,
  value: null
}

export default withLabel({ padding: 12 })(RadioSelect)

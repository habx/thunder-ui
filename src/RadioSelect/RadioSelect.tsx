import * as React from 'react'
import { map, includes, filter, isEmpty } from 'lodash'
import { withTheme } from 'styled-components'

import withLabel from '../withLabel'
import { getMainColor } from '../_internal/colors'

import { RadioSelectContainer, Option } from './RadioSelect.style'
import RadioSelectProps from './RadioSelect.interface'
import { formValue } from '../_internal/types'

export const BaseRadioSelect: React.StatelessComponent<RadioSelectProps> = props => {
  const {
    options,
    onChange,
    multi,
    value,
    canBeEmpty,
    disabled,
    ...rest
  } = props

  const currentValue = value || (multi ? [] : null)

  const getNewValueMulti = (item: formValue, value: formValue[]) => {
    if (includes(value, item)) {
      const newValue = filter(value, value => value !== item)

      if (isEmpty(newValue)) {
        if (canBeEmpty) {
          return newValue
        }

        return value
      }

      return newValue
    }

    return [...value, item]
  }

  const getNewValue = item => {
    if (multi) {
      return getNewValueMulti(item, currentValue as formValue[])
    }

    if (currentValue === item) {
      if (canBeEmpty) {
        return null
      }
    }

    return item
  }

  const selected = map(options, ({ value }) => {
    if (multi) {
      return includes(currentValue as formValue[], value)
    }

    return value === currentValue
  })

  const color = getMainColor(props)

  return (
    <RadioSelectContainer color={color} data-disabled={disabled} {...rest}>
      {options.map(({ value, label }, index) => (
        <Option
          isNextSelected={index < options.length - 1 && selected[index + 1]}
          isPreviousSelected={index > 0 && selected[index - 1]}
          key={value}
          color={color}
          onClick={() => onChange(getNewValue(value))}
          data-checked={selected[index]}
        >
          {label}
        </Option>
      ))}
    </RadioSelectContainer>
  )
}

BaseRadioSelect.defaultProps = {
  canBeEmpty: true,
  multi: false,
  disabled: false,
  options: []
}

const RadioSelect = withLabel({ padding: 12 })(withTheme(BaseRadioSelect))

export default RadioSelect

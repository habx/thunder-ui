import * as React from 'react'

import { formValue, styledTheme } from '../_internal/types'
import theme from '../theme'
import useTheme from '../useTheme'
import withLabel from '../withLabel'

import RadioSelectProps from './RadioSelect.interface'
import { RadioSelectContainer, Option } from './RadioSelect.style'

const getNewValueNotMulti = (
  item: formValue,
  value: formValue,
  { canBeEmpty }: { canBeEmpty: boolean }
) => {
  if (value === item && canBeEmpty) {
    return null
  }

  return item
}

const getNewValueMulti = (
  item: formValue,
  value: formValue[],
  { canBeEmpty }: { canBeEmpty: boolean }
) => {
  if (value.includes(item)) {
    const newValue = value.filter(el => el !== item)

    if (newValue.length === 0) {
      if (canBeEmpty) {
        return newValue
      }

      return value
    }

    return newValue
  }

  return [...value, item]
}

const getCurrentValue = (
  value: formValue | formValue[] | undefined | null,
  { multi }: { multi: boolean }
) => {
  if (!value && value == null) {
    // '==' to check undefined values, not just null
    return multi ? [] : null
  }

  return value
}

export const BaseRadioSelect = React.forwardRef<
  HTMLDivElement,
  RadioSelectProps
>((baseProps, ref) => {
  const thunderUi = useTheme()
  const fullTheme = { thunderUi } as styledTheme

  const props = { ...baseProps, theme: fullTheme }

  const {
    options,
    onChange = () => {},
    multi = false,
    value,
    canBeEmpty = true,
    disabled = false,
    ...rest
  } = props

  const currentValue = getCurrentValue(value, { multi })

  const onItemClick = (item: formValue) => {
    const newValue: formValue | formValue[] | null = multi
      ? getNewValueMulti(item, currentValue as formValue[], { canBeEmpty })
      : getNewValueNotMulti(item, currentValue as formValue, { canBeEmpty })

    return onChange(newValue)
  }

  const selected = options.map(option => {
    if (multi) {
      return (currentValue as formValue[]).includes(option.value)
    }

    return value === currentValue
  })

  const color = theme.get('primary', { dynamic: true })(props)

  return (
    <RadioSelectContainer
      color={color}
      data-disabled={disabled}
      {...rest}
      ref={ref}
    >
      {options.map((option, index) => (
        <Option
          data-testid="radio-select-option"
          isNextSelected={index < options.length - 1 && selected[index + 1]}
          isPreviousSelected={index > 0 && selected[index - 1]}
          key={option.value}
          color={color}
          onClick={() => onItemClick(option.value)}
          data-checked={selected[index]}
        >
          {option.label}
        </Option>
      ))}
    </RadioSelectContainer>
  )
})

export default withLabel<HTMLDivElement>({ padding: 12 })(BaseRadioSelect)

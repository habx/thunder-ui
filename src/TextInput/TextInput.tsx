import * as React from 'react'

import colors from '../../colors'
import withLabel from '../../withLabel'
import { getMainColor } from '../../_internal/colors'

import TextInputProps from './TextInput.interface'
import { InputContainer, Input, InputSpinner, RightElementContainer } from './TextInput.style'

const TextInput: React.StatelessComponent<TextInputProps> = props => {
  const {
    onChange,
    value,
    loading,
    rightHoverElement,
    rightElement,
    inputRef,
    disabled,
    placeholder,
    small,
    ...rest
  } = props

  const colorProps = {
    color: getMainColor(props, 'color', colors.paynesGrey),
    borderColor: getMainColor(props, 'borderColor', 'transparent'),
    activeBorderColor: getMainColor(props, 'activeBorderColor', colors.paynesGrey)
  }

  return (
    <InputContainer {...rest} {...colorProps}>
      <Input
        value={value}
        onChange={e => onChange(e.target.value)}
        ref={inputRef}
        loading={loading}
        disabled={disabled}
        placeholder={placeholder}
        small={small}
        {...colorProps}
      />
      {loading && <InputSpinner size={small ? 15 : 18} />}
      {
        rightHoverElement && (
          <RightElementContainer {...colorProps} className='hover-element-right'>
            {rightHoverElement}
          </RightElementContainer>
        )
      }
      {
        rightElement && (
          <RightElementContainer {...colorProps}>
            {rightElement}
          </RightElementContainer>
        )
      }
    </InputContainer>
  )
}

TextInput.defaultProps = {
  onChange: () => null
}

export default withLabel()(TextInput)

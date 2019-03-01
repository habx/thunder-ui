import * as React from 'react'
import { withTheme } from 'styled-components'

import withLabel from '../withLabel'
import { getMainColor } from '../_internal/colors'

import TextInputProps from './TextInput.interface'
import { InputContainer, Input, InputSpinner, RightElementContainer } from './TextInput.style'

const BaseTextInput: React.ComponentType<TextInputProps & React.ClassAttributes<any>> = React.forwardRef((props, ref) => {
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
    color: getMainColor(props, { themeKey: 'neutralDark' }),
    placeholderColor: getMainColor(props, { themeKey: 'neutral', customizable: false })
  }

  return (
    <InputContainer {...rest} {...colorProps} data-disabled={disabled}>
      <Input
        value={value}
        onChange={e => onChange(e.target.value)}
        ref={inputRef || ref}
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
})

BaseTextInput.defaultProps = {
  onChange: () => null
}

const TextInput: React.StatelessComponent<TextInputProps> = withTheme(BaseTextInput)

export default withLabel()(TextInput)

import * as React from 'react'
import { withTheme } from 'styled-components'

import withLabel from '../withLabel'
import theme from '../theme'

import TextInputProps, { TextInputInnerProps } from './TextInput.interface'
import { InputContainer, Input, InputSpinner, RightElementContainer } from './TextInput.style'

const BaseTextInput: React.ComponentType<TextInputInnerProps & React.ClassAttributes<any>> = React.forwardRef((props, ref) => {
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
    color: theme.get('neutralStrong', { dynamic: true })(props),
    placeholderColor: theme.get('neutral')(props)
  }

  return (
    <InputContainer {...rest} {...colorProps} data-disabled={disabled}>
      <Input
        value={value}
        onChange={e => onChange(e.target.value, e)}
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

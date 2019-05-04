import * as React from 'react'
import { withTheme } from 'styled-components'

import theme from '../theme'
import withLabel from '../withLabel'

import TextInputProps, { TextInputInnerProps } from './TextInput.interface'
import {
  InputContainer,
  Input,
  InputSpinner,
  RightElementContainer,
} from './TextInput.style'

const TextInput: React.ComponentType<
  TextInputInnerProps & React.ClassAttributes<any>
> = React.forwardRef((props, ref) => {
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

  const handleChange = React.useCallback(e => onChange(e.target.value, e), [
    onChange,
  ])

  const colorProps = {
    color: theme.get('neutralStronger', { dynamic: true })(props),
    placeholderColor: theme.get('neutral')(props),
  }

  return (
    <InputContainer {...rest} {...colorProps} data-disabled={disabled}>
      <Input
        value={value}
        onChange={handleChange}
        ref={inputRef || ref}
        loading={loading}
        disabled={disabled}
        placeholder={placeholder}
        small={small}
        {...colorProps}
      />
      {loading && <InputSpinner size={small ? 15 : 18} />}
      {rightHoverElement && (
        <RightElementContainer {...colorProps} className="hover-element-right">
          {rightHoverElement}
        </RightElementContainer>
      )}
      {rightElement && (
        <RightElementContainer {...colorProps}>
          {rightElement}
        </RightElementContainer>
      )}
    </InputContainer>
  )
})

TextInput.defaultProps = {
  onChange: () => null,
}

export default withLabel()(withTheme(TextInput) as React.StatelessComponent<
  TextInputProps
>)

import * as React from 'react'

import { styledTheme } from '../_internal/types'
import useTheme from '../useTheme'
import withLabel from '../withLabel'

import TextInputProps from './TextInput.interface'
import {
  InputContainer,
  Input,
  InputSpinner,
  RightElementContainer,
} from './TextInput.style'

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (baseProps, ref) => {
    const thunderUi = useTheme()
    const fullTheme = { thunderUi } as styledTheme

    const props = { ...baseProps, theme: fullTheme }

    const {
      onChange = () => null,
      value = '',
      loading,
      rightHoverElement,
      rightElement,
      inputRef,
      disabled,
      placeholder,
      small,
      className,
      style,
      error,
      ...rest
    } = props

    const handleChange = React.useCallback(e => onChange(e.target.value, e), [
      onChange,
    ])

    return (
      <InputContainer
        className={className}
        style={style}
        data-disabled={disabled}
        error={error}
      >
        <Input
          value={value}
          onChange={handleChange}
          ref={inputRef || ref}
          disabled={disabled}
          placeholder={placeholder}
          small={small}
          {...rest}
        />
        {loading && <InputSpinner size={small ? 15 : 18} />}
        {rightHoverElement && (
          <RightElementContainer className="hover-element-right">
            {rightHoverElement}
          </RightElementContainer>
        )}
        {rightElement && (
          <RightElementContainer>{rightElement}</RightElementContainer>
        )}
      </InputContainer>
    )
  }
)

export default withLabel<HTMLInputElement>()(TextInput)

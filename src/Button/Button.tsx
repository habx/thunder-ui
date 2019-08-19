import * as React from 'react'

import useTheme from '../useTheme'

import ButtonProps from './Button.interface'
import { ButtonContainer, IconContainer, ButtonSpinner } from './Button.style'

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      iconLeft,
      iconRight,
      children,
      loading,
      small,
      large,
      disabled,
      reverse,
      ...rest
    } = props

    const { neutral, neutralLightest } = useTheme()

    return (
      <ButtonContainer
        data-small={small}
        data-large={large}
        data-loading={loading}
        reverse={reverse}
        disabled={disabled || loading}
        {...rest}
        ref={ref}
      >
        {iconLeft && (
          <IconContainer data-testid="icon-left-container" position="left">
            {iconLeft}
          </IconContainer>
        )}
        <span
          data-testid="label-container"
          style={{ visibility: loading ? 'hidden' : 'visible' }}
        >
          {children}
        </span>
        {loading && (
          <ButtonSpinner
            color={reverse ? neutral : neutralLightest}
            size={small ? 16 : 24}
          />
        )}
        {iconRight && (
          <IconContainer data-testid="icon-right-container" position="right">
            {iconRight}
          </IconContainer>
        )}
      </ButtonContainer>
    )
  }
)

Button.defaultProps = {
  type: 'button',
}

export default Button

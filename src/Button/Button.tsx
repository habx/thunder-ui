import * as React from 'react'

import ButtonProps from './Button.interface'
import { ButtonContainer, IconContainer, ButtonSpinner } from './Button.style'

const Button: React.StatelessComponent<ButtonProps> = ({ iconLeft, iconRight, children, loading, small, large, disabled, ...otherProps }) => (
  <ButtonContainer
    small={small}
    large={large}
    loading={loading}
    disabled={disabled || loading}
    {...otherProps}
  >
    {
      iconLeft &&
      <IconContainer position='left' small={small} large={large}>{iconLeft}</IconContainer>
    }
    <span style={{ visibility: loading ? 'hidden' : 'visible' }}>{children}</span>
    {
      loading &&
      <ButtonSpinner color='white' size={small ? 16 : 24} />
    }
    {
      iconRight &&
      <IconContainer position='right' small={small}>{iconRight}</IconContainer>
    }
  </ButtonContainer>
)

export default Button

import * as React from 'react'

import ButtonProps from './Button.interface'
import { ButtonContainer, IconContainer, ButtonSpinner } from './Button.style'

const Button: React.StatelessComponent<ButtonProps> = ({ iconLeft, iconRight, children, loading, small, disabled, ...otherProps }) => (
  <ButtonContainer small={small} loading={loading} disabled={disabled || loading} {...otherProps}>
    {
      iconLeft &&
      <IconContainer position='left' small={small}>{iconLeft}</IconContainer>
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

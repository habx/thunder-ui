import * as React from 'react'

import ButtonProps from './Button.interface'
import { ButtonContainer, IconContainer, ButtonSpinner } from './Button.style'

const Button: React.StatelessComponent<ButtonProps> = ({ iconLeft, iconRight, children, isLoading, small, disabled, ...otherProps }) => (
  <ButtonContainer small={small} isLoading={isLoading} disabled={disabled || isLoading} {...otherProps}>
    {iconLeft && <IconContainer left>{iconLeft}</IconContainer>}
    <span style={{ visibility: isLoading ? 'hidden' : 'visible' }}>{children}</span>
    {isLoading && <ButtonSpinner color='white' size={small ? 16 : 24} />}
    {iconRight && <IconContainer right>{iconRight}</IconContainer>}
  </ButtonContainer>
)

export default Button

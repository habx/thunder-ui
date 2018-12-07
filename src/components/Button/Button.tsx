import * as React from 'react'

import ButtonProps from './Button.interface'
import { ButtonContainer, IconContainer } from './Button.style'

const Button: React.StatelessComponent<ButtonProps> = ({ iconLeft, iconRight, children, ...otherProps }) => (
  <ButtonContainer {...otherProps}>
    {iconLeft && <IconContainer left>{iconLeft}</IconContainer>}
    {children}
    {iconRight && <IconContainer right>{iconRight}</IconContainer>}
  </ButtonContainer>
)

export default Button

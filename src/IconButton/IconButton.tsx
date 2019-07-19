import * as React from 'react'
import styled from 'styled-components'

import theme from '../theme'

import IconButtonProps from './IconButton.interface'

const getDiameter = props => {
  if (props.small) {
    return 32
  }

  if (props.large) {
    return 64
  }

  return 48
}

const prepareProps = props => {
  const color = theme.get('primary', { dynamic: true })(props)

  return {
    color,
    hoverColor: theme.getActive(props.hoverColor, color),
    diameter: getDiameter(props),
  }
}

const IconButton: React.FunctionComponent<
  IconButtonProps
> = styled.button.attrs(prepareProps)`
  border: none;
  outline: none;
  transition: all 150ms ease-in-out;
  height: ${({ diameter }) => diameter}px;
  width: ${({ diameter }) => diameter}px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ color }) => color};
  box-shadow: ${theme.get('shadowLight')};

  cursor: pointer;
  user-select: none;

  &:hover {
    box-shadow: ${theme.get('shadowStrong')};
  }

  &:active {
    box-shadow: ${theme.get('shadowStrong')};
  }

  &:hover,
  &:active {
    background-color: ${({ hoverColor }) => hoverColor};
  }

  &:disabled {
    pointer-events: none;
    filter: grayscale();
  }
`

IconButton.defaultProps = {
  type: 'button',
}

export default IconButton

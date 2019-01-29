import * as React from 'react'
import styled from 'styled-components'

import { getHoverColor, getMainColor } from '../_internal/colors'
import colors from '../colors'

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
  const color = getMainColor(props, 'color', colors.trueBlue)

  return {
    color,
    hoverColor: getHoverColor(color, props),
    diameter: getDiameter(props)
  }
}

const IconButton: React.StatelessComponent<IconButtonProps> = styled.button.attrs(prepareProps)`
  border: none;
  outline: none;
  transition: all 150ms ease-in-out;
  height: ${({ diameter }) => diameter}px;
  width: ${({ diameter }) => diameter}px;
  border-radius: 50%;

  background-color: ${({ color }) => color};
  box-shadow: 0 4px 12px 0 rgba(3, 54, 61, 0.32);

  cursor: pointer;
  user-select: none;

  &:hover {
    box-shadow:  0 4px 18px 0 rgba(80, 79, 79, 0.5);
  }

  &:active {
    box-shadow: 0 4px 12px 0 rgba(80, 79, 79, 0.5);
  }

  &:hover,
  &:active {
    color: ${({ hoverColor }) => hoverColor};
  }

  &:disabled {
    pointer-events: none;
    filter: grayscale();
  }
`

export default IconButton

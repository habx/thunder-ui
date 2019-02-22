import * as React from 'react'
import styled from 'styled-components'

import { getHoverColor, getMainColor } from '../_internal/colors'

import IconButtonProps from './IconButton.interface'
import shadows from '../shadows'

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
  const color = getMainColor(props)

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
  box-shadow: ${shadows.light};

  cursor: pointer;
  user-select: none;

  &:hover {
    box-shadow: ${shadows.strong};
  }

  &:active {
    box-shadow: ${shadows.strong};
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

export default IconButton

import styled from 'styled-components'

import fontSizes from '../fontSizes'
import { getMainColor, getHoverColor } from '../_internal/colors'

import TextButtonProps from './TextButton.interface'

const prepareProps = props => {
  const color = getMainColor(props)

  return {
    color,
    hoverColor: getHoverColor(color, props)
  }
}

const TextButton: React.StatelessComponent<TextButtonProps> = styled.button.attrs(prepareProps)`
  border: none;
  outline: none;
  background-color: unset;

  font-size: ${fontSizes.small};
  font-weight: 600;
  line-height: 1.43;
  text-transform: uppercase;

  transition: color 150ms ease-in-out;

  color: ${({ color }) => color};

  cursor: pointer;
  user-select: none;

  &:hover,
  &:active {
    color: ${({ hoverColor }) => hoverColor};
  }

  &:disabled {
    pointer-events: none;
    filter: grayscale();
  }
`

export default TextButton

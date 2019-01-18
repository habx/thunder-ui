import styled from 'styled-components'
import color from 'color'

import colors from '../colors'
import fontSizes from '../fontSizes'

import TextButtonProps from './TextButton.interface'

const WHITE = color('#fff')

const findBaseColor = props => {
  if (props.color) {
    return props.color
  }

  if (props.info) {
    return colors.trueBlue
  }

  if (props.warning) {
    return colors.popstar
  }

  return colors.trueBlue
}

const prepareProps = props => {
  const baseColor = findBaseColor(props)

  return {
    color: baseColor,
    hoverColor: props.hoverColor || color(baseColor).mix(WHITE, 0.2).string()
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

  color: ${({ color: textColor }) => textColor};

  cursor: pointer;

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

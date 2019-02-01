import styled, { css } from 'styled-components'

import fontSizes from '../../fontSizes'
import { getMainColor, getHoverColor } from '../../_internal/colors'

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

  font-weight: 600;
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

  ${({ small }) => small && css`
    padding: 6px 16px;
    font-size: ${fontSizes.tiny};
  `};

  ${({ large }) => large && css`
    padding: 16px 24px;
    font-size: ${fontSizes.regular};
  `};

  ${({ small, large }) => !small && !large && css`
    padding: 12px 20px;
    font-size: ${fontSizes.small};
  `};
`

export default TextButton

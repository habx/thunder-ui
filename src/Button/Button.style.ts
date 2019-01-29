import styled, { css } from 'styled-components'
import color from 'color'
import Spinner from '../Spinner'

import fontSizes from '../fontSizes'
import borderRadius from '../borderRadius'
import shadows from '../shadows'
import { getMainColor } from '../_internal/colors'

const WHITE = color('#fff')
const BLACK = color('#000')

const findSecondaryColor = props => {
  if (props.textColor) {
    return props.textColor
  }

  return '#fff'
}

const prepareProps = props => {
  const backgroundColor = props.reverse ?
    findSecondaryColor(props) :
    getMainColor(props)

  const textColor = props.reverse ?
    getMainColor(props) :
    findSecondaryColor(props)

  const hoverMixColor = props.reverse ? BLACK : WHITE

  return {
    backgroundColor,
    textColor,
    hoverColor: props.hoverColor || color(backgroundColor).mix(hoverMixColor, 0.2).string()
  }
}

export const IconContainer = styled.span`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  justify-content: center;
  margin-right: ${({ position }) => (position === 'left' ? '8px' : 0)};
  margin-left: ${({ position }) => (position === 'right' ? '8px' : 0)};
`

export const ButtonContainer = styled.button.attrs(prepareProps)`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: ${borderRadius.narrow};
  border: none;
  box-shadow: ${shadows.light};
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  user-select: none;
  vertical-align: middle;
  text-align: left;
  text-decoration: none;
  line-height: 22px;
  color: ${({ textColor }) => textColor};

  background-color: ${({ backgroundColor }) => backgroundColor};

  transition: background-color 150ms ease-in-out;

  margin: 0 4px;

  &:hover,
  &:active {
    background-color: ${({ hoverColor }) => hoverColor};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    pointer-events: none;
    ${({ loading }) => !loading && css`
      filter:  grayscale();
    `}}
  }

  ${({ small }) => small && css`
    padding: 6px 16px;
    font-size: ${fontSizes.small};
    line-height: 1.25;
    border-radius: ${borderRadius.round};
  `};

  ${({ large }) => large && css`
    padding: 16px 24px;
    font-size: ${fontSizes.large};
    line-height: 1.11;
  `};

  ${({ small, large }) => !small && !large && css`
    padding: 12px 20px;
    font-size: ${fontSizes.regular};
    line-height: 1.17;
  `};

`

export const ButtonSpinner = styled(Spinner)`
  position: absolute;
  margin: auto;
  padding-left: 4px;
`

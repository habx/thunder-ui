import styled, { css } from 'styled-components'
import color from 'color'
import Spinner from '../../components/Spinner'

import { borderRadius, shadows, colors, fontSizes } from '../../theme'

const WHITE = color('#fff')
const BLACK = color('#000')

const findMainColor = props => {
  if (props.backgroundColor) {
    return props.backgroundColor
  }

  if (props.info) {
    return colors.trueBlue
  }

  if (props.warning) {
    return colors.popstar
  }

  return colors.trueBlue
}

const findSecondaryColor = props => {
  if (props.textColor) {
    return props.textColor
  }
  return '#fff'
}

const prepareProps = props => {
  const backgroundColor = props.reverse ? findSecondaryColor(props) : findMainColor(props)
  const textColor = props.reverse ? findMainColor(props) : findSecondaryColor(props)
  const hoverMixColor = props.reverse ? BLACK : WHITE
  return {
    backgroundColor,
    textColor,
    hoverColor: props.hoverColor || color(backgroundColor).mix(hoverMixColor, 0.2).string()
  }
}

export const IconContainer = styled.span`
  i {
    vertical-align: top;
    margin-right: ${({ left }) => (left ? '4px' : 0)};
    margin-left: ${({ right }) => (right ? '4px' : 0)};
  }
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
    ${({ isLoading }) => !isLoading && css`
      filter:  grayscale();
    `}}
  }

  ${({ small }) => small && css`
    padding: 6px 16px;
    font-size: ${fontSizes.small};
    line-height: 1.25;
    border-radius: ${borderRadius.round};
    i {
      font-size: 18px;
    }
  `};

  ${({ small }) => !small && css`
    padding: 16px 24px;
    font-size: ${fontSizes.large};
    line-height: 1.11;
  `};

`

export const ButtonSpinner = styled(Spinner)`
  position: absolute;
  margin: auto;
  padding-left: 4px;
`

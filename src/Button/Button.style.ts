import styled, { css } from 'styled-components'
import color from 'color'
import Spinner from '../Spinner'

import fontSizes from '../fontSizes'
import borderRadius from '../borderRadius'
import theme from '../theme'
import { FontIconContainer } from '../FontIcon/FontIcon.style'

const WHITE = color('#fff')
const BLACK = color('#000')

const prepareProps = props => {
  const neutralColor = theme.get('neutralLightest', { propName: 'textColor' })(props)
  const primaryColor = theme.get('primary', { dynamic: true })(props)

  const backgroundColor = props.reverse ? neutralColor : primaryColor
  const textColor = props.reverse ? primaryColor : neutralColor
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
  box-shadow: ${theme.get('shadowLight')};
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

  ${FontIconContainer} {
    font-size: 18px;
  }

`

export const ButtonSpinner = styled(Spinner)`
  position: absolute;
  margin: auto;
  padding-left: 4px;
`

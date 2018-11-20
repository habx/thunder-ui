import styled, { css } from 'styled-components'
import color from 'color'

import { fontSizes, borderRadius, colors } from '../../theme'

const WHITE = color('#fff')

const findBackgroundColor = props => {
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
  const backgroundColor = findBackgroundColor(props)

  return {
    backgroundColor,
    hoverColor: props.hoverColor || color(backgroundColor).mix(WHITE, 0.2).string(),
  }
}


const Button = styled.button.attrs(prepareProps)`
  display: flex;
  justify-content: center;
  align-items: center;
  
  border-radius: ${borderRadius.narrow};
  border: none;
   
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  user-select: none;
  vertical-align: middle;
  text-align: left;
  text-decoration: none;
  line-height: 22px;
  color: #fff;
  
  background-color: ${({ backgroundColor }) => backgroundColor};
  
  transition: background-color 150ms ease-in-out;

  &:hover,
  &:active {
    background-color: ${({ hoverColor }) => hoverColor};
  }
  
  &:disabled {
    pointer-events: none;
    filter: grayscale();
  }
  
  ${({ small }) => small && css`
    padding: 8px 16px;
    font-size: ${fontSizes.regular};
    line-height: 1.25;
  `};
  
  ${({ small }) => !small && css`
    padding: 16px 24px;
    font-size: ${fontSizes.large};
    line-height: 1.11;
  `};
`

export default Button

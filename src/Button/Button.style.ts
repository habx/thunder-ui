import styled from 'styled-components'

import { styledTheme } from '../_internal/types'
import borderRadius from '../borderRadius'
import { FontIconContainer } from '../FontIcon/FontIcon.style'
import fontSizes from '../fontSizes'
import Spinner from '../Spinner'
import theme from '../theme'

const prepareProps = (
  props: { reverse?: boolean; hoverColor: string } & styledTheme
) => {
  const neutralColor = theme.get('neutralLightest', { propName: 'textColor' })(
    props
  )
  const primaryColor = theme.get('primary', { dynamic: true })(props)

  const backgroundColor = props.reverse ? neutralColor : primaryColor
  const textColor = props.reverse ? primaryColor : neutralColor

  return {
    backgroundColor,
    textColor,
    hoverColor: theme.getActive(props.hoverColor, backgroundColor, {
      reverse: props.reverse,
    }),
  }
}

export const IconContainer = styled.span<{ position?: string }>`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  justify-content: center;
  margin-right: ${({ position }) => (position === 'left' ? '8px' : 0)};
  margin-left: ${({ position }) => (position === 'right' ? '8px' : 0)};
`

export const ButtonContainer = styled.button.attrs(prepareProps)<{
  reverse?: boolean
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

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
  color: ${({ textColor }) => textColor};

  background-color: ${({ backgroundColor }) => backgroundColor};

  transition: background-color 150ms ease-in-out;

  margin: 0 4px;
  padding: 12px 20px;
  font-size: ${fontSizes.regular};
  line-height: 1.17;

  &[data-small='true'] {
    padding: 6px 16px;
    font-size: ${fontSizes.small};
    line-height: 1.25;
    border-radius: ${borderRadius.round};
  }

  &[data-large='true'] {
    padding: 16px 24px;
    font-size: ${fontSizes.large};
    line-height: 1.11;
  }

  &:hover,
  &:active {
    background-color: ${({ hoverColor }) => hoverColor};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    pointer-events: none;

    &:not([data-loading='true']) {
      filter: grayscale();
    }
  }

  ${FontIconContainer} {
    font-size: 18px;
  }
`

export const ButtonSpinner = styled(Spinner)`
  position: absolute;
  margin: auto;
  padding-left: 4px;
`

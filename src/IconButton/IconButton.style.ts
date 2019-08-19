import styled from 'styled-components'

import theme from '../theme'

export const IconButtonContainer = styled.button<{
  color: string
  hoverColor: string
}>`
  border: none;
  outline: none;
  transition: all 150ms ease-in-out;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};
  box-shadow: ${theme.get('shadowLight')};
  height: 48px;
  width: 48px;

  cursor: pointer;
  user-select: none;

  &:hover {
    box-shadow: ${theme.get('shadowStrong')};
  }

  &:active {
    box-shadow: ${theme.get('shadowStrong')};
  }

  &:hover,
  &:active {
    background-color: ${({ hoverColor }) => hoverColor};
  }

  &:disabled {
    pointer-events: none;
    filter: grayscale();
  }

  &[data-small='true'] {
    height: 32px;
    width: 32px;
  }

  &[data-large='true'] {
    height: 64px;
    width: 64px;
  }
`

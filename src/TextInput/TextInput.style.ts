import styled from 'styled-components'

import { FontIconContainer } from '../FontIcon/FontIcon.style'
import fontSizes from '../fontSizes'
import Spinner from '../Spinner'

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  ${FontIconContainer} {
    font-size: 18px;
  }

  .hover-element-right {
    opacity: 0;
    transition: opacity 150ms ease-in-out;
  }

  &:hover {
    .hover-element-right {
      opacity: 1;
      transition: opacity 150ms ease-in-out;
    }
  }

  &::after {
    content: '';
    width: 100%;
    height: 1px;
    background-color: ${({ color }) => color};
    opacity: 0.3;
    transition: all 150ms ease-in-out;
  }

  &:focus-within {
    &::after {
      opacity: 1;
    }
  }
  &[data-disabled='true'] {
    &::after {
      opacity: 0;
    }
  }
`

export const InputSpinner = styled(Spinner)`
  position: absolute;
  right: 0;
  top: 4px;
`

export const RightElementContainer = styled.div`
  position: absolute;
  right: 0;
  top: 4px;
`

export const Input = styled.input`
  border: none;
  outline: none;
  display: flex;
  flex-direction: column;

  padding: 2px 0;
  width: 100%;
  font-size: ${({ small }) => (small ? fontSizes.small : fontSizes.regular)};
  color: ${({ color }) => color};
  line-height: 1.5;
  transition: border-bottom-color 150ms ease-in-out;

  background-color: transparent;

  &::placeholder {
    opacity: 0.5;
    color: ${({ placeholderColor }) => placeholderColor};
  }

  &:disabled {
    color: ${({ placeholderColor }) => placeholderColor};
  }
`

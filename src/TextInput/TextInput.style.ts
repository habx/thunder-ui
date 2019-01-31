import styled, { css } from 'styled-components'

import { FontIconContainer } from '../FontIcon/FontIcon.style'
import Spinner from '../Spinner'
import fontSizes from '../fontSizes'

export const InputContainer = styled.div`
  position: relative;

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

  padding: 2px 0;
  width: 100%;
  font-size: ${({ small }) => small ? fontSizes.small : fontSizes.regular};
  line-height: 1.5;
  transition: border-bottom-color 150ms ease-in-out;

  background-color: transparent;
  border-bottom: 1px solid ${({ borderColor }) => borderColor};

  &:hover {
    border-bottom-color: ${({ borderColor }) => borderColor};
  }

  &::placeholder {
    opacity: 0.5;
    color: ${({ color }) => color};
  }

  &:disabled {
    color: ${({ color }) => color};
    border-bottom-color: transparent;
  }

  &:not(:disabled):focus {
    border-bottom-color: ${({ activeBorderColor }) => activeBorderColor};
  }
`

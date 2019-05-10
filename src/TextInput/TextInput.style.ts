import styled from 'styled-components'

import { FontIconContainer } from '../FontIcon/FontIcon.style'
import fontSizes from '../fontSizes'
import Spinner from '../Spinner'
import theme from '../theme'

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
  border: 0;
  display: block;
  flex-direction: column;

  padding: 2px 0;
  width: 100%;
  font-size: ${({ small }) => (small ? fontSizes.small : fontSizes.regular)};
  color: ${({ color }) => color};
  line-height: 1.5;
`

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  & ${FontIconContainer} {
    font-size: 18px;
  }

  & ${Input} {
    background: transparent no-repeat;
    background-image: linear-gradient(
        to bottom,
        ${theme.get('primary', { dynamic: true })},
        ${theme.get('primary', { dynamic: true })}
      ),
      linear-gradient(
        to bottom,
        ${theme.get('neutralLight', { dynamic: true })},
        ${theme.get('neutralLight', { dynamic: true })}
      );
    background-size: 0 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    transition: background-size 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);

    &:focus {
      background-size: 100% 2px, 100% 1px;
      outline: none;
    }

    color: ${theme.get('neutralStrong', { dynamic: true })};

    &::placeholder,
    &:disabled {
      opacity: 0.5;
      color: ${theme.get('neutralStrong', { dynamic: true })};
    }
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

import styled from 'styled-components'

import borderRadius from '../borderRadius'
import InternalFontIcon from '../FontIcon'
import theme from '../theme'

export const FakeInputContainer = styled.span`
  display: inline-block;
  position: relative;
  user-select: none;
  cursor: pointer;
`

export const FakeInput = styled.label`
  width: 18px;
  height: 18px;
  box-sizing: border-box;
  user-select: none;
  cursor: pointer;
  outline: none;
  display: inline-block;
  margin-right: 12px;
  border-radius: ${borderRadius.narrow};
  padding: 1.5px;
  background: #fff;
  border: solid 1.5px ${theme.get('primaryStrong')};
  transition: all 200ms ease-in-out;
  &:hover {
    border-color: ${theme.get('neutral')};
  }
`
export const FontIcon = styled(InternalFontIcon)`
  position: absolute;
  font-size: 18px;
  transition: all 200ms ease-in-out;
`

export const Input = styled.input`
  align-items: center;
  margin-right: 12px;
  display: none;
  transition: all 200ms ease-in-out;
  &:not(:checked) ~ ${FakeInput}:focus {
    border: 1.5px solid ${theme.get('primary')};
  }
  & ~ ${FakeInput}:active, &:checked ~ ${FakeInput}:focus {
    border: 1.5px solid ${theme.get('primary')};
  }
  &:not(:checked) + ${FontIcon} {
    transform: scale(0);
  }
  &:checked + ${FontIcon} {
    transform: scale(1);
  }
  &:not([data-background='true']) {
    &:checked ~ ${FakeInput} {
      border-color: ${theme.get('primary')};
      background-color: ${theme.get('primary')};
      &:hover {
        border-color: ${theme.get('primary')};
        background-color: ${theme.get('primary')};
      }
      &:focus {
        border-color: ${theme.get('primary')};
      }
    }
    & ~ ${FontIcon} {
      color: #fff;
    }
  }
  &[data-background='true'] {
    &:checked ~ ${FontIcon} {
      color: ${theme.get('primary')};
    }
  }
  &[data-error='true'] {
    & ~ ${FakeInput} {
      border-color: ${theme.get('error')};
    }
    &:not([data-background='true']) {
      &:checked ~ ${FakeInput} {
        border-color: ${theme.get('error')};
        background-color: ${theme.get('error')};
      }
      & ~ ${FontIcon} {
        color: #fff;
      }
    }
    &[data-background='true'] {
      &:checked ~ ${FontIcon} {
        color: ${theme.get('error')};
      }
    }
  }
  &:disabled ~ ${FakeInput}, &:checked:disabled ~ ${FakeInput} {
    background-color: ${theme.get('neutral')};
    border-color: ${theme.get('neutral')};
  }
  &:disabled:checked ~ ${FontIcon} {
    color: #fff;
  }
`

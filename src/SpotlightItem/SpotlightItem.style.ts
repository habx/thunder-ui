import styled from 'styled-components'

import theme from '../theme'

export const ItemContainer = styled.li`
  position: relative;
  display: flex;
  padding: 16px 32px;
  transition-property: background-color, opacity;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  text-decoration: none;
  cursor: pointer;
  user-select: none;

  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    border: none;
    box-shadow: none;
    outline: none;
  }

  &:not([data-editing='true']) {
    &:hover {
      background-color: ${theme.get('primaryLightest')};
    }

    &:active,
    &:focus {
      background-color: ${theme.get('primaryLighter')};
    }

    &:active {
      opacity: 0.85;
    }
  }

  &[data-editing='true'] {
    background-color: ${theme.get('neutralLighter')};
    padding-bottom: 15px;
  }
`

export const ItemContent = styled.div`
  flex: 1 1 100%;
  white-space: nowrap;
  min-width: 0;
`

export const ItemTitle = styled.div`
  display: flex;
  align-items: baseline;

  &:hover {
    i {
      transition: all ease-in-out 200ms;
      opacity: 1;

      &:hover {
        opacity: 0.7;
      }
    }
  }
`

export const ItemTitleInput = styled.input.attrs(() => ({ type: 'text' }))`
  font-size: 23px;
  border: none;
  background: none;
  flex: 1 1 100%;
  display: none;
  color: ${theme.get('neutralStronger')};

  &:focus {
    outline: none;
  }

  &[data-editing='true'] {
    display: initial;
    margin-top: -1px;
  }
`

export const ItemActions = styled.div`
  margin-left: 8px;

  & > i {
    margin: 0 8px;
    vertical-align: baseline;
    transition: all ease-in-out 200ms;
    opacity: 0;
    color: ${theme.get('neutral')};
  }

  &[data-editing='true'] {
    display: none;
  }
`

export const ItemIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  flex: 0 0 auto;

  border-radius: 50%;
  margin-right: 20px;
  height: 40px;
  width: 40px;

  background-color: ${theme.get('primary')};
  color: ${theme.get('neutralLightest')};
`

export const Title = styled.div`
  color: ${theme.get('neutral')};
  font-size: 23px;
  overflow: hidden;
  text-overflow: ellipsis;

  &[data-editing='true'] {
    display: none;
  }
`

export const Subtitle = styled.div`
  color: ${theme.get('neutral')};
  height: 15px;
  font-size: 11px;
  overflow: hidden;
  text-overflow: ellipsis;
`

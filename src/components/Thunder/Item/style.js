import styled from 'styled-components'

import { get } from '../theme'

export const ItemContainer = styled.div`
  position: relative;
  display: flex;
  padding: 16px 32px;
  transition: background-color ease-in-out 200ms;
  text-decoration: none;
  
  &:hover, 
  &:focus {
    background-color: ${get('item.focus')};
    cursor: pointer;
    text-decoration: none;
    border: none;
    box-shadow: none;
    outline: none;
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
  
  &:focus {
    outline: none;
  }
  
  &[data-editing="true"] {
    display: initial;
    margin-top: -2px;
  }
`

export const ItemActions = styled.div`
  margin-left: 8px;
  
  & > i {
    margin: 0 8px;
    vertical-align: baseline;
    transition: all ease-in-out 200ms;
    opacity: 0;
    font-size: 18px;
    color: ${get('item.actionIcon')};
  }
  
  &[data-editing="true"] {
    display: none;
  }
`

export const ItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  flex: 0 0 auto;
  
  border-radius: 50%;
  margin-right: 20px;
  height: 40px;
  width: 40px;

  background-color: ${get('item.iconBackground')};
  color: ${get('item.icon')};
`

export const Title = styled.div`
  color: ${get('item.title')};
  font-size: 23px;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &[data-editing="true"] {
    display: none;
  }
`

export const Subtitle = styled.div`
  color: ${get('item.subtitle')};
  font-family: ${get('item.subtitleFont')};
  height: 15px;
  font-size: 11px;
  overflow: hidden;
  text-overflow: ellipsis;
`

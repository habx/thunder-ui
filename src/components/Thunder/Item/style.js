import styled from 'styled-components'

import { colors } from '../../../theme'

export const ItemContainer = styled.div`
  position: relative;
  display: flex;
  padding: 16px 32px;
  transition: background-color ease-in-out 200ms;
  text-decoration: none;
  
  &:hover, 
  &:focus {
    background-color: #fbf8f7;
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
  height: 32px;
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
  font-family: EuclidCircularB;
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
    color: #5a6e85;
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

  background-color: ${colors.brightCerualean};
  color: #f8f7f8;
`

export const Title = styled.div`
  color: #061a3c;
  font-family: EuclidCircularB;
  font-size: 23px;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &[data-editing="true"] {
    display: none;
  }
`

export const Subtitle = styled.div`
  color: #061a3c;
  font-family: Inter UI;
  height: 15px;
  font-size: 11px;
  overflow: hidden;
  text-overflow: ellipsis;
`

import styled, { css } from 'styled-components'

export const RadioSelectContainer = styled.div`
  font-family: EuclidCircularB;
  display: flex;
  border: solid 1px ${({ color }) => color};
  border-radius: 3px;
  margin: 2px 0;
  
  &[data-disabled="true"] {
    pointer-events: none;
    filter: grayscale();
  }
`

export const RadioSelectElement = styled.div`
  overflow: hidden;
  text-align: center;
  user-select: none;
  white-space: nowrap;
  cursor: pointer;
  box-sizing: border-box;
  
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 4px;
  min-height: 32px;
  font-size: 14px;
  
  color: ${({ color }) => color};
  border-right: solid 1px ${({ color }) => color};
  
  transition: all ease-in-out 200ms;
  
  &:last-child {
    border: none;
  }
  
  &[data-checked="true"] {
    color: #ffffff;
    background-color: ${({ color }) => color};
    margin: -2px 0;
    padding-top: 6px;
    min-height: 36px;
    box-shadow: 6px 4px 12px 0 rgba(3, 54, 61, 0.16);
    
    ${({ isNextSelected }) => !isNextSelected && css`
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      
    `};
    
    ${({ isPreviousSelected }) => !isPreviousSelected && css`
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    `};
  }
`

import styled from 'styled-components'

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
  width: 100%;
  
  mark {
    padding: 0;
  }
`

export const ItemTitle = styled.div`
  width: 100%;
  display: flex;
  height: 32px;
  
  > span {
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    width: calc(100% - 100px);
  }
  
  input {
    width: 100%;
    font-family: EuclidCircularB;
    font-size: 23px;
    border: none;
    background: none;
    
    &:focus {
      outline: none;
    }
  }
  
  i {
    margin: 0 8px;
    vertical-align: baseline;
    transition: all ease-in-out 200ms;
    opacity: 0;
    font-size: 18px;
    color: #5a6e85;
  }
  
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

export const ItemIcon = styled.div`
  > i {
    margin-top: 4px;
    background-color: #1dcad3;
    border-radius: 100%;
    padding: 8px;
    color: #f8f7f8;
    margin-right: 20px;
  }
`

export const Title = styled.div`
  color: #061a3c;
  font-family: EuclidCircularB;
  font-size: 23px;
`

export const Subtitle = styled.div`
  color: #061a3c;
  font-family: Inter UI;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 15px;
  display: block;  
  font-size: 11px;
`

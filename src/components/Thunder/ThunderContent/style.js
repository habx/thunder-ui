import styled from 'styled-components'

export const ThunderSections = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
`

export const ThunderSearch = styled.div`
  display: flex;
  align-items: baseline;
  flex: 0 0 auto;
  
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: solid 1px #f8f7f8;
  padding: 16px 32px;
  
  input {
    font-family: EuclidCircularB;
    box-shadow: none;
    border: none;
    font-size: 24px;
    flex: 1 1 100%;
    
    &:focus {
      outline: none;
    }
  }
`

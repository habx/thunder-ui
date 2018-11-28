import styled from 'styled-components'

import { get } from '../theme'

export const ThunderSections = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
`

export const ThunderSearch = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: solid 1px ${get('border')};
  padding: 16px 32px;
  
  input {
    box-shadow: none;
    border: none;
    font-size: 24px;
    flex: 1 1 100%;
    background-color: ${get('background')};
    color: ${get('text')};
    
    &:focus {
      outline: none;
    }
  }
`

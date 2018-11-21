import styled from 'styled-components'

export const SectionTitleContainer = styled.div`
  padding: 16px 32px;
  user-select: none;
  
  > i {
    border-radius: 100%;
    background-color: #5a6e85;
    color: #f8f7f8;
    padding: 4px;
    font-size: 18px;
    margin-left: 10px;
    vertical-align: bottom;
    transition: all ease-in 100ms;
    
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
`

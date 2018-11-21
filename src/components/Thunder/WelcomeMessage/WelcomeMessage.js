import styled from 'styled-components'

const WelcomeMessage = styled.div`
  background-color: #0071ce;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 3px 6px 0 rgba(80, 79, 79, 0.5);
  
  > span {
    padding: 8px;
    color: #f8f7f8;
    display: block;
    text-align: justify;
    margin-top: 4px;
  }
  
  i {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #f8f7f8;
    
    &:hover {
      opacity: 0.7;
      cursor: pointer;
    }
  }
`

export default WelcomeMessage

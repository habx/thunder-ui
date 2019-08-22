import styled from 'styled-components'

import theme from '../theme'

const SpotlightWelcomeMessage = styled.div`
  background-color: ${theme.get('primary')};
  color: ${theme.get('neutralLighter')};
  padding: 16px;
  margin: 16px;
  border-radius: 3px;
  position: relative;
  box-shadow: 0 3px 6px 0 rgba(80, 79, 79, 0.5);

  > span {
    padding: 8px;
    display: block;
    text-align: justify;
    margin-top: 4px;
  }

  i {
    position: absolute;
    top: 10px;
    right: 10px;

    &:hover {
      opacity: 0.7;
      cursor: pointer;
    }
  }
`

export default SpotlightWelcomeMessage

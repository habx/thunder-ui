import styled from 'styled-components'

import theme from '../theme'

export const SpotlightSectionTitle = styled.div`
  padding: 16px 32px;
  user-select: none;
  color: ${theme.get('neutral')};

  > i {
    border-radius: 50%;
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

export default SpotlightSectionTitle

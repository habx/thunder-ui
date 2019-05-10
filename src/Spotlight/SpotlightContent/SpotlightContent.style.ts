import styled from 'styled-components'

import theme from '../../theme'

export const SpotlightSections = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
`

export const SpotlightSearch = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: solid 1px ${theme.get('neutralLight')};
  padding: 16px 32px;

  input {
    box-shadow: none;
    border: none;
    font-size: 22px;
    flex: 1 1 100%;
    background-color: transparent;
    color: ${theme.get('neutral')};

    &:focus {
      outline: none;
    }
  }
`

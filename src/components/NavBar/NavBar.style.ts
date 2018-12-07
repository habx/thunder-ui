import styled from 'styled-components'

import { colors } from '../../theme'

export const NavBarContainer = styled.nav`
  flex: 0 0 auto;
  height: 100vh;
  width: 64px;

  background-color: ${({ backgroundcolor }) => backgroundcolor};
  color: white;

  a {
    color: inherit;

    &:hover {
      color: inherit;
      text-decoration: none;
    }
  }
`

export const NavBarTitle = styled.h4`
  font-family: Habx;
  padding: 32px 0;
  text-align: center;
`

export const NavBarItemsContainer = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

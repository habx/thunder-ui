import styled from 'styled-components'

export const NavBarTopBarSquare = styled.div`
  width: 48px;
  text-align: center;
`

export const NavBarTopBarTitle = styled.div`

`

export const NavBarTopBar = styled.div`
  display:none;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 600px) {
    display: flex;
    height: 40px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: white;
    width: auto;
  }
`

export const NavBarClose = styled.div`
  text-align: right;
  margin-bottom: 32px;
  display: none;

  @media (max-width: 600px) {
    display: block;
  }
`

export const NavBarPaddingTop = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: block;
    height: 40px;
    width: 100%;
  }
`

export const NavBarContainer = styled.div`
  flex: 0 0 auto;
  height: 100vh;
`

export const NavBarSideContainer = styled.nav`
  flex: 0 0 auto;
  height: 100vh;
  width: 64px;

  background-color: ${({ backgroundcolor }) => backgroundcolor};
  color: white;

  @media (max-width: 600px) {
    transform: ${({ mobileIsOpen }) => mobileIsOpen ? 'none' : 'translateX(-100%)'};
    transition: transform 300ms ease;
    box-sizing: border-box;
    width: 285px;
    padding: 16px;
  }

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

  @media (max-width: 600px) {
    display: none;
  }
`

export const NavBarItemsContainer = styled.div`
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    align-items: flex-start;
    margin-left: 16px;
    padding-top: 16px;
  }
`

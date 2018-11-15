import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const NavBarContainer = styled.nav`
    background-color: ${({ backgroundcolor }) => backgroundcolor};
    color: white;
    height: 100vh;
    width: 65px;
    a {
      color: inherit;
      &:hover {
        color: inherit;
        text-decoration: none;
      }
    }
`

const NavBarTitle = styled.h4`
  font-family: Habx;
  padding: 32px 0;
  text-align: center;
`

const NavBarItemsContainer = styled.div`
  margin-top: 32px;
`


const NavBar = ({ title, children, backgroundColor }) => (
  <NavBarContainer backgroundcolor={backgroundColor}>
    <NavBarTitle>{title}</NavBarTitle>
    <NavBarItemsContainer>
      {children}
    </NavBarItemsContainer>
  </NavBarContainer>
)

NavBar.propTypes = {
  backgroundColor: PropTypes.string,
  title: PropTypes.node.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
}
NavBar.defaultProps = {
  backgroundColor: 'transparent',
}

export default NavBar

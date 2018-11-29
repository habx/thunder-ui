import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Context } from './context'

const TabsContainer = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
  }
`

const Tabs = ({ color, hoverColor, activeColor, children, ...other }) => (
  <Context.Provider value={{ hoverColor, activeColor, color }}>
    <TabsContainer {...other}>{children}</TabsContainer>
  </Context.Provider>
)

Tabs.propTypes = {
  hoverColor: PropTypes.string,
  activeColor: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

Tabs.defaultProps = {
  hoverColor: null,
  activeColor: null,
  color: null,
}

export default Tabs

import * as React from 'react'
import PropTypes from 'prop-types'

import { SectionTitleContainer } from './style'


const SectionTitle = ({ children }) => (
  <SectionTitleContainer>
    { children }
  </SectionTitleContainer>
)

SectionTitle.propTypes = {
  children: PropTypes.node,
}

SectionTitle.defaultProps = {
  children: null,
}

export default SectionTitle

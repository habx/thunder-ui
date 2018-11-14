import styled from 'styled-components'
import PropTypes from 'prop-types'

import { generateColorFromSeed } from '../../internal/colors'

const Tag = styled.div`
  background: ${({ colorSeed }) => generateColorFromSeed(colorSeed)};

  padding: 2px 8px;
  display: inline;
  border-radius: 2px;

  color: white;
  font-weight: 600;
  font-size: 14px;
`

Tag.propTypes = {
  colorSeed: PropTypes.string.isRequired
}

export default Tag

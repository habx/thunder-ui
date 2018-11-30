import styled from 'styled-components'
import PropTypes from 'prop-types'

import colorUtil from 'color'

import { generateColorFromSeed } from '../../internal/colors'
import { colors } from '../../theme'

const Tag = styled.div`
  background-color: ${({ colorSeed, color }) => color || generateColorFromSeed(colorSeed)};

  padding: 4px 16px;
  display: inline;
  border-radius: 12px;
  
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};

  color: ${({ colorSeed }) => (colorSeed ? 'white' : colorUtil(colors.paynesGrey).fade(0.28).toString())};
  font-size: 14px;
`

Tag.propTypes = {
  bold: PropTypes.bool,
  colorSeed: PropTypes.string,
  color: PropTypes.string,
}

export default Tag

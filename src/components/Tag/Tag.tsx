import * as React from 'react'
import styled from 'styled-components'
import colorUtil from 'color'

import { generateColorFromSeed } from '../../internal/colors'
import { colors } from '../../theme'

export interface TagProps {
  bold?: boolean
  colorSeed?: string
  color?: string
}

const Tag: React.FC<TagProps> = styled.div`
  background-color: ${({ colorSeed, color }) => color || generateColorFromSeed(colorSeed)};

  padding: 2px 16px;
  display: inline;
  border-radius: 12px;
  
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};

  color: ${({ colorSeed }) => (colorSeed ? 'white' : colorUtil(colors.paynesGrey).fade(0.28).toString())};
  font-size: 13px;
  height: 22px;
  white-space: nowrap;
`

export default Tag

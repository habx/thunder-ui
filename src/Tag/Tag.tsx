import colorUtil from 'color'
import styled from 'styled-components'

import { generateColorFromSeed } from '../_internal/colors'
import colors from '../colors'

import TagProps from './Tag.interface'

const Tag = styled.div<TagProps>`
  background-color: ${({ colorSeed, color }) =>
    color || generateColorFromSeed(colorSeed)};

  padding: 2px 16px;
  border-radius: 12px;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};

  color: ${({ colorSeed }) =>
    colorSeed
      ? 'white'
      : colorUtil(colors.paynesGrey)
          .fade(0.28)
          .toString()};
  font-size: 13px;
  height: 22px;
  white-space: nowrap;
`

export default Tag

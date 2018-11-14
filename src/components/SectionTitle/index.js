import styled, { css } from 'styled-components'

import { colors } from '../../theme'

const SectionTitle = styled.h3`
  display: flex;
  flex-direction: column;
  
  font-size: 14px;
  line-height: 18px;
  text-transform: uppercase;
  
  color: ${colors.maastrichtBlue};
    
  ${({ active }) => active && css`
    &::after {
      content: '';
      height: 3px;
      width: 100%;
      background-color: ${colors.maastrichtBlue};
    }
  `}
`

export default SectionTitle

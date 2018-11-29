import styled, { css } from 'styled-components'

import { colors } from '../../theme'

const prepareProps = props => ({
  color: props.color || colors.maastrichtBlue,
})

const SectionTitle = styled.h3.attrs(prepareProps)`
  display: flex;
  flex-direction: column;
  
  font-size: 14px;
  line-height: 18px;
  text-transform: uppercase;
  
  color: ${({ color }) => color};
    
  ${({ active }) => active && css`
    &::after {
      content: '';
      height: 3px;
      width: 100%;
      flex: 0 0 auto;
      background-color: ${({ color }) => color};
    }
  `}
`

export default SectionTitle

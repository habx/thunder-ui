import styled, { css } from 'styled-components'

import { colors } from '../../theme'

const prepareProps = props => ({
  color: props.color || colors.maastrichtBlue
})

const Title = styled.h1.attrs(prepareProps)`
  font-size: 54px;
  font-weight: bold;
  color: ${({ color }) => color};
  
  ${({ underline }) => underline && css`
    display: flex;
    flex-direction: column;
  
    &::after {
      content: '';
      height: 16px;
      width: 128px;
      background-color: ${({ color }) => color};
    }
  `}  
`

export default Title

import styled from 'styled-components'

import { colors } from '../../theme'

const prepareProps = props => ({
  color: props.color || colors.maastrichtBlue
})

const Subtitle = styled.h2.attrs(prepareProps)`
  font-size: 23px;
  line-height: 29px;
  color: ${({ color }) => color};
`

export default Subtitle

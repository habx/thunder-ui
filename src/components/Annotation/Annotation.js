import styled from 'styled-components'

import { fontSizes, colors } from '../../theme'

const prepareProps = props => ({
  color: props.color || colors.paynesGrey
})

const Annotation = styled.span.attrs(prepareProps)`
  font-size: ${fontSizes.tiny};
  color: ${({ color }) => color }
`

export default Annotation

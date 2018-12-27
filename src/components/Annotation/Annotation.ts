import * as React from 'react'
import styled from 'styled-components'

import { fontSizes, colors } from '../../theme'
import AnnotationProps from './Annotation.interface'

const prepareProps = props => ({
  color: props.color || colors.paynesGrey
})

const Annotation: React.StatelessComponent<AnnotationProps> = styled.span.attrs(prepareProps)`
  font-size: ${fontSizes.tiny};
  color: ${({ color }) => color}
`

export default Annotation

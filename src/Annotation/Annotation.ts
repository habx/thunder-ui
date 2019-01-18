import * as React from 'react'
import styled from 'styled-components'

import colors from '../colors'
import fontSizes from '../fontSizes'

import AnnotationProps from './Annotation.interface'

const prepareProps = props => ({
  color: props.color || colors.paynesGrey
})

const Annotation: React.StatelessComponent<AnnotationProps> = styled.span.attrs(prepareProps)`
  font-size: ${fontSizes.tiny};
  color: ${({ color }) => color}
`

export default Annotation

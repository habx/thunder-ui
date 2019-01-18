import * as React from 'react'

import withLabel from '../withLabel'

import { TextAreaContainer, StyledTextArea } from './TextArea.style'
import TextAreaProps from './TextArea.interface'

const TextArea: React.StatelessComponent<TextAreaProps> = props => (
  <TextAreaContainer>
    <StyledTextArea {...props} />
  </TextAreaContainer>
)

export default withLabel({ padding: 12 })(TextArea)

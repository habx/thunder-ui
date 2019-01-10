import * as React from 'react'

import { TextAreaContainer, StyledTextArea } from './TextArea.style'
import TextAreaProps from './TextArea.interface'

const TextArea: React.StatelessComponent<TextAreaProps> = props => (
  <TextAreaContainer>
    <StyledTextArea {...props} />
  </TextAreaContainer>
)

export default TextArea

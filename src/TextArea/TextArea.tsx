import * as React from 'react'

import withLabel from '../withLabel'

import TextAreaProps from './TextArea.interface'
import { TextAreaContainer, StyledTextArea } from './TextArea.style'

const TextArea: React.StatelessComponent<TextAreaProps> = ({
  onChange,
  ...props
}) => {
  const handleChange = React.useCallback(e => onChange(e.target.value, e), [
    onChange,
  ])

  return (
    <TextAreaContainer>
      <StyledTextArea {...props} onChange={handleChange} />
    </TextAreaContainer>
  )
}

export default withLabel({ padding: 12 })(TextArea)

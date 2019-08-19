import * as React from 'react'

import withLabel from '../withLabel'

import TextAreaProps from './TextArea.interface'
import { StyledTextArea } from './TextArea.style'

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const { onChange = () => {}, ...rest } = props

    const handleChange = React.useCallback(e => onChange(e.target.value, e), [
      onChange,
    ])

    return <StyledTextArea {...rest} onChange={handleChange} ref={ref} />
  }
)

export default withLabel<HTMLTextAreaElement>({ padding: 12 })(TextArea)

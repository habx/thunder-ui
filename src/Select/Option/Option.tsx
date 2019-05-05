import * as React from 'react'

import Toggle from '../Toggle'

import OptionProps from './Option.interface'
import { OptionContainer } from './Option.style'

class Option extends React.Component<OptionProps> {
  private readonly ref: React.RefObject<any>

  constructor(props) {
    super(props)

    this.ref = React.createRef()
  }

  componentDidMount() {
    this.handleFocus()
  }

  componentDidUpdate() {
    this.handleFocus()
  }

  handleFocus() {
    if (this.props.focused && this.ref.current) {
      this.ref.current.focus()
    }
  }

  render() {
    const { multi, label, selected, disabled, ...props } = this.props
    return (
      <OptionContainer
        {...props}
        data-testid="option-container"
        data-selected={selected}
        ref={this.ref}
        tabIndex="0"
        disabled={disabled}
      >
        {multi && <Toggle state={selected ? 'full' : 'empty'} />}
        {label}
      </OptionContainer>
    )
  }
}

export default Option

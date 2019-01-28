import * as React from 'react'

import FontIcon from '../../FontIcon/FontIcon'

import { OptionContainer } from './Option.style'
import OptionProps from './Option.interface'

class Option extends React.Component<OptionProps> {
  private readonly ref: React.RefObject<any>

  constructor (props) {
    super(props)

    this.ref = React.createRef()
  }

  componentDidMount () {
    this.handleFocus()
  }

  componentDidUpdate () {
    this.handleFocus()
  }

  handleFocus () {
    if (this.props.focused && this.ref.current) {
      this.ref.current.focus()
    }
  }

  render () {
    const { isMulti, label, selected, ...props } = this.props
    return (
      <OptionContainer
        {...props}
        data-selected={selected}
        ref={this.ref}
        tabIndex='0'
      >
        {isMulti && <FontIcon icon={selected ? 'check_box' : 'check_box_outline_blank'} />}

        { label }
      </OptionContainer>
    )
  }
}

export default Option
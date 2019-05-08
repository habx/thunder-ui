import merge from 'lodash.merge'
import * as React from 'react'

import { isFunction, isString, isBoolean } from '../_internal/data'

import SpotlightProps from './Spotlight.interface'
import { SpotlightModal } from './Spotlight.style'
import SpotlightContent from './SpotlightContent'

const DOUBLE_KEY_PRESS_DURATION = 200

class Spotlight extends React.Component<SpotlightProps> {
  private readonly modalRef: React.RefObject<any>
  private readonly inputRef: React.RefObject<any>
  private lastOpenKeyPress: number = 0

  static defaultProps = {
    onOpen: () => null,
    className: '',
    style: null,
    theme: null,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.open !== prevState.propsOpen) {
      return {
        open: nextProps.open,
        propsOpen: nextProps.open,
      }
    }

    return null
  }

  constructor(props) {
    super(props)

    this.modalRef = React.createRef()
    this.inputRef = React.createRef()
  }

  state = {
    open: false,
    propsOpen: null,
    query: '',
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  getQuery() {
    const { query } = this.props

    if (isString(query)) {
      return query
    }

    return this.state.query
  }

  handleQueryChange = (newQuery: string) => {
    const { query, onQueryChange } = this.props

    if (isString(query)) {
      if (isFunction(onQueryChange)) {
        onQueryChange(newQuery)
      }
    } else {
      this.setState({ query: newQuery })
    }
  }

  handleKeyDown = ({ key }) => {
    const { open } = this.state

    if (key === 'Shift') {
      const currentTime = Date.now()
      if (currentTime - this.lastOpenKeyPress < DOUBLE_KEY_PRESS_DURATION) {
        this.handleSpotlightOpen()
      }
      this.lastOpenKeyPress = currentTime
    }

    if (key === 'Escape' && open) {
      this.setState({ open: false })
    }
  }

  handleClose = () =>
    this.setState(() => ({
      open: false,
      query: '',
    }))

  handleSpotlightOpen() {
    this.setState({ open: true })
    this.inputRef.current.focus()
    this.props.onOpen()
  }

  isOpen() {
    const { open: propsOpen } = this.props

    if (isBoolean(propsOpen)) {
      return propsOpen
    }

    return this.state.open
  }

  render() {
    const { className, style, ...rest } = this.props

    return (
      <SpotlightModal
        className={className}
        style={style}
        open={this.isOpen()}
        onClose={this.handleClose}
        animated={false}
      >
        {({ state }) =>
          state !== 'closed' && (
            <SpotlightContent
              {...rest}
              onClose={this.handleClose}
              query={this.getQuery()}
              onQueryChange={this.handleQueryChange}
              inputRef={this.inputRef}
            />
          )
        }
      </SpotlightModal>
    )
  }
}

export default Spotlight

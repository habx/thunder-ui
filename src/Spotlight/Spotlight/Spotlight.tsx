import * as React from 'react'
import { isBoolean, isString, isFunction, merge } from 'lodash'
import { ThemeProvider } from 'styled-components'

import SpotlightContent from '../SpotlightContent'
import { DEFAULT_THEME } from '../theme'

import { SpotlightModalContainer, SpotlightModal } from './Spotlight.style'
import { SpotlightInnerProps } from './Spotlight.interface'

const DOUBLE_KEY_PRESS_DURATION = 200

const stopEvent = e => e.stopPropagation()

export default class Spotlight extends React.Component<SpotlightInnerProps> {
  private readonly modalRef: React.RefObject<any>
  private readonly inputRef: React.RefObject<any>
  private lastOpenKeyPress: number = 0

  static defaultProps = {
    onOpen: () => null,
    className: '',
    style: null,
    theme: null
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.open !== prevState.propsOpen) {
      return {
        open: nextProps.open,
        propsOpen: nextProps.open
      }
    }

    return null
  }

  constructor (props) {
    super(props)

    this.modalRef = React.createRef()
    this.inputRef = React.createRef()
  }

  state = {
    open: false,
    propsOpen: null,
    query: ''
  }

  componentDidMount () {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  getQuery () {
    const { query } = this.props
    if (isString(query)) {
      return query
    }

    return this.state.query
  }

  handleQueryChange = newQuery => {
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

  handleClick = () => {
    if (this.state.open) {
      this.handleClose()
    }
  }

  handleClose = () => this.setState(() => ({
    open: false,
    query: ''
  }))

  handleSpotlightOpen () {
    this.setState({ open: true })
    this.inputRef.current.focus()
    this.props.onOpen()
  }

  isOpen () {
    const { open: propsOpen } = this.props

    if (isBoolean(propsOpen)) {
      return propsOpen
    }

    return this.state.open
  }

  generateTheme () {
    const { theme, customTheme } = this.props

    return merge({}, theme, { _spotlight: DEFAULT_THEME }, { _spotlight: customTheme })
  }

  render () {
    const { className, style, ...rest } = this.props

    if (!this.isOpen()) {
      return null
    }

    return (
      <ThemeProvider theme={this.generateTheme()}>
        <SpotlightModalContainer onClick={this.handleClick}>
          <SpotlightModal ref={this.modalRef} onClick={stopEvent} className={className} style={style}>
            <SpotlightContent
              {...rest}
              onClose={this.handleClose}
              query={this.getQuery()}
              onQueryChange={this.handleQueryChange}
              inputRef={this.inputRef}
            />
          </SpotlightModal>
        </SpotlightModalContainer>
      </ThemeProvider>
    )
  }
}

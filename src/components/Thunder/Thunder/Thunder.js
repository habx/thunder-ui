import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { isBoolean, isString, isFunction, merge } from 'lodash'
import { ThemeProvider } from 'styled-components'

import ThunderContent from '../ThunderContent'
import { DEFAULT_THEME } from '../theme'

import { ThunderModalContainer, ThunderModal } from './style'

const DOUBLE_KEY_PRESS_DURATION = 200

const stopEvent = e => e.stopPropagation()

export default class Thunder extends Component {
  static propTypes = {
    onOpen: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.shape({}),
    theme: PropTypes.shape({}),
  }

  static defaultProps = {
    onOpen: () => {},
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

  constructor() {
    super()

    this.modalRef = createRef()
    this.inputRef = createRef()
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
        this.handleThunderOpen()
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
    query: '',
  }))

  handleThunderOpen() {
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

  generateTheme() {
    const { theme, customTheme } = this.props

    return merge({}, theme, { _thunder: DEFAULT_THEME }, { _thunder: customTheme })
  }

  lastOpenKeyPress = 0

  render() {
    const {
      className,
      style,
      ...rest
    } = this.props


    if (!this.isOpen()) {
      return null
    }

    return (
      <ThemeProvider theme={this.generateTheme()}>
        <ThunderModalContainer onClick={this.handleClick}>
          <ThunderModal ref={this.modalRef} onClick={stopEvent} className={className} style={style}>
            <ThunderContent
              {...rest}
              onClose={this.handleClose}
              query={this.getQuery()}
              onQueryChange={this.handleQueryChange}
              inputRef={this.inputRef}
            />
          </ThunderModal>
        </ThunderModalContainer>
      </ThemeProvider>
    )
  }
}

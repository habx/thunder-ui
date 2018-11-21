import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { isBoolean, isString, isFunction } from 'lodash'

import ThunderContent from '../ThunderContent'

import { ThunderModalContainer, ThunderModal } from './style'

const DOUBLE_KEY_PRESS_DURATION = 200

export default class Thunder extends Component {
  static propTypes = {
    onOpen: PropTypes.func,
  }

  static defaultProps = {
    onOpen: () => {},
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
  }


  state = {
    open: false,
    propsOpen: null,
    query: '',
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('click', this.handleClick)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('click', this.handleClick)
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

  handleClick = event => {
    if (this.modalRef && !this.modalRef.current.contains(event.target) && this.state.open) {
      this.handleToggle()
    }
  }

  handleToggle = () => this.setState(prevState => ({
    open: !prevState.open,
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

  lastOpenKeyPress = 0

  render() {
    if (!this.isOpen()) {
      return null
    }

    return (
      <ThunderModalContainer>
        <ThunderModal ref={this.modalRef}>
          <ThunderContent
            {...this.props}
            onToggle={this.handleToggle}
            query={this.getQuery()}
            onQueryChange={this.handleQueryChange}
          />
        </ThunderModal>
      </ThunderModalContainer>
    )
  }
}

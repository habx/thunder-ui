import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'

import Highlight from '../Highlight'

import { ItemContainer, ItemContent, ItemTitle, ItemIcon, Title, Subtitle } from './style'

class Item extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    icon: PropTypes.node,
    iconStyle: PropTypes.objectOf(PropTypes.any),
    href: PropTypes.string,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    focusOnRender: PropTypes.bool,
    onClick: PropTypes.func,
    thunder: PropTypes.shape({
      query: PropTypes.string,
      selectedItemKey: PropTypes.number,
      registerItem: PropTypes.func.isRequired,
      unRegisterItem: PropTypes.func.isRequired,
    }).isRequired,
    section: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    onClick: () => {},
    subtitle: '',
    onDelete: null,
    onEdit: null,
    focusOnRender: false,
    iconStyle: null,
    icon: null,
    href: null,
  }

  constructor(props) {
    super(props)

    this.inputRef = createRef()
    this.link = createRef()
    this.key = Math.random()
  }

  state = {
    edit: this.props.focusOnRender,
    value: this.props.title,
  }

  componentDidMount() {
    const {
      focusOnRender,
    } = this.props

    if (focusOnRender) {
      this.focusInput()
    }

    this.register()
  }

  componentDidUpdate(prevProps) {
    const {
      index,
      thunder: {
        selectedItemKey,
      },
    } = this.props

    if (prevProps.index !== index) {
      this.register()
    }

    if (selectedItemKey === this.key) {
      this.link.current.focus()
    }
  }

  componentWillUnmount() {
    const {
      thunder: {
        unRegisterItem,
      },
      section: {
        name,
      },
    } = this.props

    unRegisterItem(name, this.key)
  }

  getItemComponent() {
    const { href, as } = this.props

    if (as) {
      return as
    }

    if (href) {
      return 'a'
    }

    return 'div'
  }

  register() {
    const {
      index,
      title,
      thunder: {
        registerItem,
      },
      section: {
        name,
      },
    } = this.props

    registerItem(name, {
      title,
      index,
      key: this.key,
      onSubmit: this.handleSubmit,
    })
  }

  handleSubmit = event => {
    const { href, onClick } = this.props

    if (onClick) {
      onClick(event)
    }

    if (href) {
      window.location.replace(href)
    }
  }

  handleClick = action => e => {
    e.preventDefault()
    if (action) {
      action()
    }
  }

  handleEdit = e => {
    e.preventDefault()
    this.setState({ edit: true }, this.focusInput)
  }

  handleChange = e => {
    this.setState({ value: e.target.value })
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleStopEditing()
    }
  }

  handleStopEditing = () => {
    this.setState({ edit: false })
    this.props.onEdit(this.state.value)
  }

  focusInput = () => {
    this.inputRef.current.focus()
    this.inputRef.current.select()
  }

  render() {
    const {
      title,
      subtitle,
      icon,
      onDelete,
      onEdit,
      iconStyle,
      thunder: {
        query,
      },
      ...rest
    } = this.props

    const { edit, value } = this.state

    return (
      <ItemContainer {...rest} as={this.getItemComponent()} ref={this.link} tabIndex={0}>
        {
          icon && (
            <ItemIcon style={iconStyle}>
              {icon}
            </ItemIcon>
          )
        }
        <ItemContent>
          <ItemTitle>
            {edit ? (
              <input
                ref={this.inputRef}
                type='text'
                onKeyPress={this.handleKeyPress}
                value={value}
                onChange={this.handleChange}
                onClick={this.handleClick()}
                onBlur={this.handleStopEditing}
              />
            ) : (
              <Title>
                <Highlight query={query}>{title}</Highlight>
              </Title>
            )}
            {onEdit && !edit && <i className='material-icons' onClick={this.handleEdit}>edit</i>}
            {onDelete && !edit && <i className='material-icons' onClick={this.handleClick(onDelete)}>delete</i>}
          </ItemTitle>
          {
            subtitle &&
            <Subtitle>
              <Highlight query={query}>{subtitle}</Highlight>
            </Subtitle>
          }
        </ItemContent>
      </ItemContainer>
    )
  }
}

export default Item

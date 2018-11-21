import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'

import Highlight from '../Highlight'

import { ItemContainer, ItemContent, ItemTitle, ItemIcon, Title, Subtitle } from './style'

class Item extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    icon: PropTypes.string,
    href: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    focusOnRender: PropTypes.bool,
    iconStyle: PropTypes.objectOf(PropTypes.any),
    onClick: PropTypes.func,
    index: PropTypes.number.isRequired,
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
      index,
      title,
      href,
      thunder: {
        registerItem,
      },
      section: {
        name,
      },
    } = this.props

    if (focusOnRender) {
      this.focusInput()
    }

    registerItem(name, { index, title, href, key: this.key })
  }

  componentDidUpdate(prevProps) {
    const {
      index,
      title,
      href,
      thunder: {
        registerItem,
        selectedItemKey,
      },
      section: {
        name,
      },
    } = this.props

    if (prevProps.index !== index) {
      registerItem(name, { title, href, key: this.key, index })
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
      href,
      onDelete,
      onEdit,
      iconStyle,
      onClick,
      thunder: {
        query,
      },
    } = this.props

    const { edit, value } = this.state

    return (
      <ItemContainer href={href} ref={this.link} onClick={onClick}>
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

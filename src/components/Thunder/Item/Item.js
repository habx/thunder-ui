import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'

import FontIcon from '../../FontIcon'
import Highlight from '../Highlight'

import { ItemContainer, ItemContent, ItemTitle, ItemActions, ItemIcon, ItemTitleInput, Title, Subtitle } from './style'

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
    refPropName: PropTypes.string,
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
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }

  static defaultProps = {
    onClick: () => {},
    subtitle: '',
    onDelete: null,
    onEdit: null,
    focusOnRender: false,
    refPropName: 'ref',
    iconStyle: null,
    icon: null,
    href: null,
    as: 'div',
  }

  constructor(props) {
    super(props)

    this.container = { current: null }
    this.itemContainer = createRef()
    this.inputRef = createRef()

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
      this.itemContainer.current.focus()
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

  getContainerProps() {
    const { refPropName } = this.props

    const ref = node => {
      this.container.current = node
    }

    return { [refPropName]: ref }
  }

  getContainerComponent() {
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
    const { onClick, thunder } = this.props

    if (onClick) {
      onClick(event, { thunder })
    }

    this.container.current.click()
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
    if (e.key === 'Enter' && document.activeElement === this.itemContainer.current) {
      this.handleSubmit(e)
    }
  }

  handleInputKeyPress = e => {
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
      focusOnRender,
      refPropName,
      onClick,
      as,
      thunder: {
        query,
      },
      ...rest
    } = this.props

    const { edit, value } = this.state

    const Container = this.getContainerComponent()

    return (
      <Container {...this.getContainerProps()} {...rest}>
        <ItemContainer
          ref={this.itemContainer}
          tabIndex={0}
          onClick={this.handleSubmit}
          onKeyPress={this.handleKeyPress}
        >
          {
            icon && (
              <ItemIcon style={iconStyle}>
                {icon}
              </ItemIcon>
            )
          }
          <ItemContent>
            <ItemTitle>
              <ItemTitleInput
                ref={this.inputRef}
                value={value}
                onKeyPress={this.handleInputKeyPress}
                onChange={this.handleChange}
                onClick={this.handleClick()}
                onBlur={this.handleStopEditing}
                data-editing={edit}
              />
              <Title data-editing={edit}>
                <Highlight query={query}>{title}</Highlight>
              </Title>
              <ItemActions data-editing={edit}>
                {onEdit && <FontIcon icon='pencil' onClick={this.handleEdit} />}
                {onDelete && <FontIcon icon='trash' onClick={this.handleClick(onDelete)} />}
              </ItemActions>
            </ItemTitle>
            {
              subtitle &&
              <Subtitle>
                <Highlight query={query}>{subtitle}</Highlight>
              </Subtitle>
            }
          </ItemContent>
        </ItemContainer>
      </Container>
    )
  }
}

export default Item

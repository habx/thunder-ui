import React, { PureComponent, createRef } from 'react'
import PropTypes from 'prop-types'
import { omit } from 'lodash'

import FontIcon from '../../FontIcon'
import Highlight from '../Highlight'

import { ItemContainer, ItemContent, ItemTitle, ItemActions, ItemIcon, ItemTitleInput, Title, Subtitle } from './style'


const INTERNAL_PROPS = [
  'title',
  'subtitle',
  'icon',
  'iconStyle',
  'onDelete',
  'onEdit',
  'onClick',
  'focusOnRender',
  'refPropName',
  'registerActions',
  'thunder',
  'as',
]

class Item extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    icon: PropTypes.node,
    iconStyle: PropTypes.objectOf(PropTypes.any),
    href: PropTypes.string,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onClick: PropTypes.func,
    registerActions: PropTypes.func.isRequired,
    focusOnRender: PropTypes.bool,
    refPropName: PropTypes.string,
    query: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
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
  }

  state = {
    edit: this.props.focusOnRender,
    value: this.props.title,
  }

  componentDidMount() {
    const {
      focusOnRender,
      registerActions,
    } = this.props

    if (focusOnRender) {
      this.focusInput()
    }

    registerActions('submit', this.handleSubmit)
  }

  componentDidUpdate() {
    const { selected } = this.props

    if (selected) {
      this.itemContainer.current.focus()
    }
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

  handleSubmit = event => {
    const { onClick } = this.props

    if (onClick) {
      onClick(event)
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
      query,
    } = this.props

    const { edit, value } = this.state

    const Container = this.getContainerComponent()

    return (
      <Container {...this.getContainerProps()} {...omit(this.props, INTERNAL_PROPS)}>
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
              <ItemActions data-editing={edit} onClick={e => e.stopPropagation()}>
                {onEdit && <FontIcon icon='edit' onClick={this.handleEdit} />}
                {onDelete && <FontIcon icon='delete' onClick={this.handleClick(onDelete)} />}
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

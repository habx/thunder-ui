import * as React from 'react'

import { omit } from '../_internal/data'
import FontIcon from '../FontIcon'

import Highlight from './Highlight'
import { ItemInnerProps } from './SpotlightItem.interface'
import {
  ItemContainer,
  ItemContent,
  ItemTitle,
  ItemActions,
  ItemIconContainer,
  ItemTitleInput,
  Title,
  Subtitle,
} from './SpotlightItem.style'

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
  'spotlight',
  'as',
]

class SpotlightItem extends React.PureComponent<ItemInnerProps> {
  private readonly containerRef: { current: HTMLDivElement }
  private readonly inputRef: React.RefObject<any>
  private readonly itemContainerRef: React.RefObject<any>

  static defaultProps = {
    focusOnRender: false,
    refPropName: 'ref',
    as: 'div',
  }

  constructor(props) {
    super(props)

    this.containerRef = { current: null }
    this.itemContainerRef = React.createRef()
    this.inputRef = React.createRef()
  }

  state = {
    edit: this.props.focusOnRender,
    value: this.props.title,
  }

  componentDidMount() {
    const { focusOnRender, registerActions } = this.props

    if (focusOnRender) {
      this.focusInput()
    }

    registerActions('submit', this.handleSubmit)
  }

  componentDidUpdate() {
    const { selected } = this.props

    if (selected) {
      this.itemContainerRef.current.focus()
    }
  }

  getContainerProps() {
    const { refPropName } = this.props

    const ref = node => {
      this.containerRef.current = node
    }

    return { [refPropName]: ref }
  }

  getContainerComponent(): React.ComponentType<any> | string {
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

    if (this.containerRef.current) {
      this.containerRef.current.click()
    }

    if (onClick) {
      onClick(event)
    }
  }

  handleClick = (action?: () => void) => e => {
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
    if (
      e.key === 'Enter' &&
      document.activeElement === this.itemContainerRef.current
    ) {
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
    const { title, subtitle, icon, onDelete, onEdit, query } = this.props

    const { edit, value } = this.state

    const Container = this.getContainerComponent()

    return (
      <Container
        {...this.getContainerProps()}
        {...omit(this.props, INTERNAL_PROPS)}
      >
        <ItemContainer
          ref={this.itemContainerRef}
          tabIndex={0}
          onClick={this.handleSubmit}
          onKeyPress={this.handleKeyPress}
        >
          {icon && <ItemIconContainer>{icon}</ItemIconContainer>}
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
              <ItemActions
                data-editing={edit}
                onClick={e => e.stopPropagation()}
              >
                {onEdit && <FontIcon icon="edit" onClick={this.handleEdit} />}
                {onDelete && (
                  <FontIcon
                    icon="delete"
                    onClick={this.handleClick(onDelete)}
                  />
                )}
              </ItemActions>
            </ItemTitle>
            {subtitle && (
              <Subtitle>
                <Highlight query={query}>{subtitle}</Highlight>
              </Subtitle>
            )}
          </ItemContent>
        </ItemContainer>
      </Container>
    )
  }
}

export default SpotlightItem

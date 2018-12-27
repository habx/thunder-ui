import * as React from 'react'
import { map, pick, memoize } from 'lodash'

import Button from '../Button'

import { ArrayContext } from './context'
import Item from './Item'

import ArrayInputProps, { ArrayInputState } from './ArrayInput.interface'
import { ArrayInputContainer, ArrayInputAction } from './ArrayInput.style'

class ArrayInput extends React.Component<ArrayInputProps, ArrayInputState> {
  static defaultProps = {
    addButtonLabel: 'Ajouter un élément',
    itemDescription: null,
    canBeReordered: false,
    onReorder: null
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (prevState.items !== nextProps.items) {
      if (prevState.items && nextProps.items.length > prevState.items.length) {
        return {
          items: nextProps.items,
          editing: nextProps.items.length - 1
        }
      }
      return { items: nextProps.items }
    }

    return null
  }

  state = {
    editing: null,
    items: null
  }

  handleEditStart = memoize(index => () => this.setState(() => ({ editing: index })))

  handleEditStop = memoize(() => () => this.setState(() => ({ editing: null })))

  handleDelete = memoize(index => () => {
    this.setState(() => ({ editing: null }), () => this.props.onDelete(index))
  })

  handleReorder = (oldPosition, newPosition) => {
    this.setState(() => ({ editing: null }), () => this.props.onReorder(oldPosition, newPosition))
  }

  buildContext () {
    return {
      ...pick(this.props, ['itemTitle', 'itemDescription', 'itemComponent', 'canBeReordered']),
      ...pick(this.state, ['editing']),
      amount: this.props.items.length,
      onOpen: this.handleEditStart,
      onClose: this.handleEditStop,
      onDelete: this.handleDelete,
      onReorder: this.handleReorder
    }
  }

  render () {
    const { items, onAppend, addButtonLabel } = this.props

    return (
      <ArrayContext.Provider value={this.buildContext()}>
        <ArrayInputContainer>
          {map(items, (item, index) => (
            <Item item={item} index={index} key={index} />
          ))}
          <ArrayInputAction>
            <Button onClick={onAppend} reverse>
              { addButtonLabel }
            </Button>
          </ArrayInputAction>
        </ArrayInputContainer>
      </ArrayContext.Provider>
    )
  }
}

export default ArrayInput

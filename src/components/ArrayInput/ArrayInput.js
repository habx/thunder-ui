import React, { Component } from 'react'
import { map, pick, memoize } from 'lodash'

import Button from '../Button'

import { ArrayContext } from './context'
import Item from './Item'

import { ArrayInputContainer, ArrayInputAction } from './style'

class ArrayInput extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.items !== nextProps.items) {
      if (prevState.items && nextProps.items.length > prevState.items.length) {
        return {
          items: nextProps.items,
          editing: nextProps.items.length - 1,
        }
      }
      return { items: nextProps.items }
    }

    return null
  }

  state = {
    editing: null,
    items: null,
  }

  handleEditStart = memoize(index => () => this.setState(() => ({ editing: index })))

  handleEditStop = memoize(() => () => this.setState(() => ({ editing: null })))

  handleDelete = memoize(index => () => {
    this.setState(() => ({ editing: null }), this.props.onDelete(index))
  })

  handleReorder = (oldPosition, newPosition) => {
    this.setState(() => ({ editing: null }), this.props.onReorder(oldPosition, newPosition))
  }

  buildContext() {
    return {
      ...pick(this.props, ['itemTitle', 'itemDescription', 'itemComponent', 'canBeReordered']),
      ...pick(this.state, ['editing']),
      amount: this.props.items.length,
      onOpen: this.handleEditStart,
      onClose: this.handleEditStop,
      onDelete: this.handleDelete,
      onReorder: this.handleReorder,
    }
  }

  render() {
    const { items, onAppend } = this.props

    return (
      <ArrayContext.Provider value={this.buildContext()}>
        <ArrayInputContainer>
          {map(items, (item, index) => (
            <Item item={item} index={index} />
          ))}
          <ArrayInputAction>
            <Button onClick={onAppend} reverse>
              Ajouter un élément
            </Button>
          </ArrayInputAction>
        </ArrayInputContainer>
      </ArrayContext.Provider>
    )
  }
}

export default ArrayInput

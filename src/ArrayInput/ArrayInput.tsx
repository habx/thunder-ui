import * as React from 'react'

import withLabel from '../withLabel'
import TextButton from '../TextButton'
import { getMainColor } from '../_internal/colors'
import { pick } from '../_internal/data'

import { ArrayContext } from './context'
import Item from './Item'

import ArrayInputProps, { ArrayInputState } from './ArrayInput.interface'
import { ArrayInputContainer, ArrayInputAction } from './ArrayInput.style'

class ArrayInput extends React.Component<ArrayInputProps, ArrayInputState> {
  static defaultProps = {
    addButtonLabel: 'Ajouter un élément',
    canBeReordered: false,
    items: []
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

  handleEditStart = index => this.setState(() => ({ editing: index }))

  handleEditStop = () => this.setState(() => ({ editing: null }))

  handleDelete = index => this.setState(
    () => ({ editing: null }),
    () => this.props.onDelete(index)
  )

  handleReorder = (oldPosition, newPosition) => {
    this.setState(() => ({ editing: null }), () => this.props.onReorder(oldPosition, newPosition))
  }

  buildContext () {
    return {
      ...pick(this.props, ['itemTitleComponent', 'itemDescriptionComponent', 'itemComponent', 'canBeReordered', 'disabled']),
      ...pick(this.state, ['editing']),
      amount: this.props.items.length,
      onOpen: this.handleEditStart,
      onClose: this.handleEditStop,
      onDelete: this.handleDelete,
      onReorder: this.handleReorder,
      iconColor: getMainColor(this.props, { themeKey: 'neutralStronger', propName: 'iconColor' })
    }
  }

  render () {
    const { items, onAppend, addButtonLabel, disabled } = this.props

    return (
      <ArrayContext.Provider value={this.buildContext()}>
        <ArrayInputContainer disabled={disabled}>
          {
            items.map((item, index) => (
              <Item item={item} index={index} key={index} />
            ))
          }
          <ArrayInputAction>
            <TextButton onClick={onAppend}>
              { addButtonLabel }
            </TextButton>
          </ArrayInputAction>
        </ArrayInputContainer>
      </ArrayContext.Provider>
    )
  }
}

export default withLabel({ padding: 16 })(ArrayInput)

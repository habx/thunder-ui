import * as React from 'react'
import { get, orderBy, omit, head, reduce } from 'lodash'

import { ThunderContext } from '../context'
import ThunderIcon from './icon'
import { ThunderSearch, ThunderSections } from './ThunderContent.style'

export default class ThunderContent extends React.Component<any> {
  static defaultProps = {
    data: {},
    placeholder: 'Aller à...',
  }

  state = {
    selectedItem: -1,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  getAllItemKeys = () => reduce(this.items, (context, sectionItems) => [
    ...context,
    ...orderBy(sectionItems, ['index'], ['asc']),
  ], [])

  handleKeyDown = event => {
    const { key } = event
    const { selectedItem } = this.state
    const { inputRef } = this.props

    if (key === 'ArrowUp' && selectedItem >= 0) {
      this.setState({ selectedItem: selectedItem - 1 })
      event.preventDefault()

      if (selectedItem === 0) {
        setTimeout(() => inputRef.current.select(), 0)
      }
    }

    if (key === 'ArrowDown' && selectedItem < this.getAllItemKeys().length) {
      this.setState({ selectedItem: selectedItem + 1 })
      event.preventDefault()
    }
  }

  handleClose = () => {
    this.setState({ selectedItem: -1 })
    this.props.onClose()
  }

  handleSearch = e => {
    this.setState({ selectedItem: -1 })
    this.props.onQueryChange(e.target.value)
  }

  handleFocus = () => this.setState({ selectedItem: -1 })

  handleSearchKeyPress = event => {
    const { key } = event

    if (key === 'Enter') {
      const firstItem = head(this.getAllItemKeys())
      if (firstItem) {
        firstItem.onSubmit(event)
      }
    }
  }

  registerItem = (section, item) => {
    this.items = {
      ...this.items,
      [section]: {
        ...get(this.items, section, {}),
        [item.key]: item,
      },
    }
  }

  unRegisterItem = (section, key) => {
    this.items = {
      ...this.items,
      [section]: omit(this.items[section], [key]),
    }
  }

  items = {}

  render() {
    const { children, query, data, placeholder, inputRef } = this.props
    const { selectedItem } = this.state
    const selectedItemKey = get(this.getAllItemKeys(), [selectedItem, 'key'])

    return (
      <ThunderContext.Provider
        value={{
          query,
          selectedItemKey,
          data,
          registerItem: this.registerItem,
          unRegisterItem: this.unRegisterItem,
          close: this.handleClose,
        }}
      >
        <ThunderSearch>
          <ThunderIcon />
          <input
            onKeyPress={this.handleSearchKeyPress}
            ref={inputRef}
            onFocus={this.handleFocus}
            value={query}
            onChange={this.handleSearch}
            placeholder={placeholder}
            type='text'
          />
        </ThunderSearch>
        <ThunderSections>
          {children}
        </ThunderSections>
      </ThunderContext.Provider>
    )
  }
}

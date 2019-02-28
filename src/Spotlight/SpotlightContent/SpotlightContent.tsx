import * as React from 'react'
import get from 'lodash/get'
import orderBy from 'lodash/orderBy'

import { omit } from '../../_internal/data'
import { SpotlightContext } from '../Spotlight.context'

import SpotlightIcon from './icon'

import SpotlightContentProps, { SpotlightContentState, ItemRegistrationData } from './SpotlightContent.interface'
import { SpotlightSearch, SpotlightSections } from './SpotlightContent.style'

class SpotlightContent extends React.Component<SpotlightContentProps, SpotlightContentState> {
  static defaultProps = {
    data: {},
    placeholder: 'Aller à...'
  }

  state = {
    selectedItem: -1
  }

  componentDidMount () {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentDidUpdate (prevProps, prevState) {
    const { inputRef } = this.props
    const { selectedItem } = this.state

    if (selectedItem === -1 && prevState.selectedItem !== -1) {
      inputRef.current.select()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  getAllItemKeys = (): ItemRegistrationData[] => {
    const items: ItemRegistrationData[][] = Object.values(this.items)

    return items.reduce(
      (acc: ItemRegistrationData[], sectionItems: ItemRegistrationData[]) => [
        ...acc,
        ...orderBy(sectionItems, ['index'], ['asc'])
      ],
      []
    )
  }

  handleKeyDown = event => {
    const { key } = event

    if (['ArrowUp', 'ArrowDown'].includes(key)) {
      event.preventDefault()

      this.setState(prevState => {
        const { selectedItem } = prevState

        if (key === 'ArrowUp') {
          return {
            selectedItem: selectedItem >= 0
              ? selectedItem - 1
              : this.getAllItemKeys().length - 1
          }
        }

        if (key === 'ArrowDown') {
          return {
            selectedItem: selectedItem < this.getAllItemKeys().length - 1
              ? selectedItem + 1
              : -1
          }
        }

        return null
      })
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
      const items = this.getAllItemKeys()
      if (items.length > 0) {
        items[0].onSubmit(event)
      }
    }
  }

  registerItem = (section, item: ItemRegistrationData) => {
    this.items = {
      ...this.items,
      [section]: {
        ...get(this.items, section, {}),
        [item.key]: item
      }
    }
  }

  unRegisterItem = (section, key) => {
    this.items = {
      ...this.items,
      [section]: omit(this.items[section], [key])
    }
  }

  items = {}

  render () {
    const { children, query, data, placeholder, inputRef } = this.props
    const { selectedItem } = this.state
    const selectedItemKey = get(this.getAllItemKeys(), [selectedItem, 'key'])

    return (
      <SpotlightContext.Provider
        value={{
          query,
          selectedItemKey,
          data,
          registerItem: this.registerItem,
          unRegisterItem: this.unRegisterItem,
          close: this.handleClose
        }}
      >
        <SpotlightSearch>
          <SpotlightIcon />
          <input
            onKeyPress={this.handleSearchKeyPress}
            ref={inputRef}
            onFocus={this.handleFocus}
            value={query}
            onChange={this.handleSearch}
            placeholder={placeholder}
          />
        </SpotlightSearch>
        <SpotlightSections>
          {children}
        </SpotlightSections>
      </SpotlightContext.Provider>
    )
  }
}

export default SpotlightContent

import * as React from 'react'
import { get, orderBy, omit, head, reduce } from 'lodash'

import { SpotlightContext } from '../Spotlight.context'
import SpotlightIcon from './icon'

import SpotlightContentProps, { SpotlightContentState } from './SpotlightContent.interface'
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

  getAllItemKeys = () => reduce(this.items, (context, sectionItems) => [
    ...context,
    ...orderBy(sectionItems, ['index'], ['asc'])
  ], [])

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

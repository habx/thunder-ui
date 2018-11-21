import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { get, orderBy, omit } from 'lodash'

import { ThunderContext } from '../utils/context'
import thunderIcon from '../thunder.svg'
import { ThunderSearch, ThunderSections } from './style'

export default class Thunder extends Component {
  static propTypes = {
    onToggle: PropTypes.func.isRequired,
    onQueryChange: PropTypes.func.isRequired,
    data: PropTypes.objectOf(PropTypes.array),
  }

  static defaultProps = {
    data: {},
  }

  constructor() {
    super()

    this.inputRef = createRef()
  }

  state = {
    selectedItem: null,
    items: {},
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  getAllItemKeys = () => Object.values(this.state.items).reduce((context, sectionItems) => [
    ...context,
    ...orderBy(sectionItems, ['index'], ['asc']),
  ], [])

  handleKeyDown = ({ key }) => {
    const { selectedItem } = this.state

    if (key === 'ArrowUp' && selectedItem > 0) {
      this.setState({ selectedItem: selectedItem - 1 })
    }

    if (key === 'ArrowUp' && this.state.selectedItem === 0) {
      this.setState({ selectedItem: null })
      setTimeout(() => this.inputRef.current.select(), 0)
    }

    if (key === 'ArrowDown' && selectedItem < this.getAllItemKeys().length) {
      this.setState({ selectedItem: selectedItem + 1 })
    }
  }

  registerItem = (section, item) => this.setState(state => ({
    items: {
      ...state.items,
      [section]: {
        ...get(state.items, section),
        [item.key]: item,
      },
    },
  }))

  unRegisterItem = (section, key) => {
    this.setState(prevState => ({
      items: {
        ...prevState.items,
        [section]: omit(prevState.items[section], [key]),
      },
    }))
  }

  handleToggle = () => {
    this.setState({ selectedItem: null })
    this.props.onToggle()
  }

  handleSearch = e => {
    this.setState({ selectedItem: null })
    this.props.onQueryChange(e.target.value)
  }

  handleFocus = () => this.setState({ selectedItem: null })

  handleSearchKeyPress = ({ key }) => {
    if (key === 'Enter') {
      const firstItemUrl = get(this.getAllItemKeys(), '[0].href')
      if (firstItemUrl) {
        window.location.replace(firstItemUrl)
      }
    }
  }

  render() {
    const { children, query, data } = this.props

    const { selectedItem } = this.state

    const selectedItemKey = get(this.getAllItemKeys(), [selectedItem - 1, 'key'])

    return (
      <ThunderContext.Provider
        value={{
          query,
          selectedItemKey,
          data,
          registerItem: this.registerItem,
          unRegisterItem: this.unRegisterItem,
          toggleThunder: this.handleToggle,
        }}
      >
        <ThunderSearch>
          <img src={thunderIcon} alt='icon' />
          <input
            onKeyPress={this.handleSearchKeyPress}
            ref={this.inputRef}
            onFocus={this.handleFocus}
            value={query}
            onChange={this.handleSearch}
            placeholder='Aller à...'
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

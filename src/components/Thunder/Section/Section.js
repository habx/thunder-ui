import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { get, map, take, filter as lodashFilter } from 'lodash'

import { SectionContext } from '../context'
import SectionTitle from '../SectionTitle'

import { SectionContainer } from './style'

class Section extends Component {
  getMatchingItems = () => {
    const { thunder, filter, name } = this.props
    const sectionData = get(thunder.data, name)

    if (filter) {
      return lodashFilter(
        sectionData,
        (...args) => filter(thunder.query, ...args)
      )
    }

    return sectionData
  }

  renderContent() {
    const { render, thunder, renderItem, name, maxItems } = this.props

    if (render) {
      return render(thunder)
    }

    if (renderItem && thunder.data && name) {
      const items = this.getMatchingItems()

      const limitItems = maxItems ? take(items, maxItems) : items

      return map(limitItems, renderItem)
    }

    return null
  }

  render() {
    const { title, name } = this.props

    return (
      <SectionContext.Provider value={{ name }}>
        <SectionContainer>
          { title && <SectionTitle>{ title }</SectionTitle>}
          { this.renderContent() }
        </SectionContainer>
      </SectionContext.Provider>
    )
  }
}

Section.propTypes = {
  name: PropTypes.string.isRequired,
  thunder: PropTypes.shape({}).isRequired,
  render: PropTypes.func,
}

Section.defaultProps = {
  render: null,
}

export default Section

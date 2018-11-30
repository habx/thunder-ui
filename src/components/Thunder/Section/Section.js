import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { get, map, take, memoize, filter as lodashFilter } from 'lodash'

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

  buildContext = memoize(name => ({ name }))

  renderContent() {
    const { render, thunder, renderItem, name, maxItems } = this.props

    if (render) {
      return render(thunder)
    }

    if (renderItem && thunder.data && name) {
      const items = this.getMatchingItems()

      const limitItems = maxItems > -1 ? take(items, maxItems) : items

      return map(limitItems, renderItem)
    }

    return null
  }

  render() {
    const { title, name } = this.props

    return (
      <SectionContext.Provider value={this.buildContext(name)}>
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
  maxItems: PropTypes.number,
}

Section.defaultProps = {
  render: null,
  maxItems: -1,
}

export default Section

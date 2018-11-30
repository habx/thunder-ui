import React, { Component } from 'react'
import { omit, pick, mapValues } from 'lodash'

import { withThunderContext, withSectionContext } from '../context'

const ACTIONS = ['onClick', 'onFocus', 'onBlur']

const withItemBehavior = WrappedComponent => class Wrapper extends Component {
  constructor() {
    super()

    this.id = Math.random()
  }

  componentDidMount() {
    this.register()
  }

  componentDidUpdate(prevProps) {
    const { index, selected } = this.props

    if (prevProps.index !== index) {
      this.register()
    }

    if (selected) {
      this.itemContainer.current.focus()
    }
  }

  componentWillUnmount() {
    const {
      thunder: {
        unRegisterItem,
      },
      section: {
        name,
      },
    } = this.props

    unRegisterItem(name, this.id)
  }

  wrapActions = () => mapValues(
    pick(this.props, ACTIONS),
    action => e => {
      const { thunder, section } = this.props
      return action(e, { thunder, section })
    }
  )

  register() {
    const {
      index,
      thunder: {
        registerItem,
      },
      section: {
        name,
      },
    } = this.props

    registerItem(name, {
      index,
      key: this.id,
      onSubmit: (...args) => this.actions.submit(...args),
    })
  }

  registerActions = (actionName, action) => {
    this.actions[actionName] = action
  }

  actions = {}

  render() {
    const { thunder: { selectedItemKey, query } } = this.props
    const selected = this.id === selectedItemKey

    return (
      <WrappedComponent
        {...omit(this.props, ['thunder', 'section', 'index'])}
        query={query}
        selected={selected}
        registerActions={this.registerActions}
        {...this.wrapActions()}
      />
    )
  }
}

export default Wrapped => withSectionContext(withThunderContext(withItemBehavior(Wrapped)))

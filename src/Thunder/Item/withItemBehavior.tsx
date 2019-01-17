import * as React from 'react'
import { omit, pick, mapValues, memoize } from 'lodash'

import { withThunderContext, withSectionContext } from '../context'

const ACTIONS = ['onClick', 'onFocus', 'onBlur']

const withItemBehavior = WrappedComponent => class Wrapper extends React.Component<any> {
  private readonly id: number

  constructor (props) {
    super(props)

    this.id = Math.random()
  }

  componentDidMount () {
    this.register()
  }

  componentDidUpdate (prevProps) {
    const { index } = this.props

    if (prevProps.index !== index) {
      this.register()
    }
  }

  componentWillUnmount () {
    const {
      thunder: {
        unRegisterItem
      },
      section: {
        name
      }
    } = this.props

    unRegisterItem(name, this.id)
  }

  handleEvent = memoize(actionName => e => {
    const { thunder, section } = this.props
    return this.props[actionName](e, { thunder, section })
  })

  wrapActions = () => mapValues(
    pick(this.props, ACTIONS),
    (_, actionName) => this.handleEvent(actionName)
  )

  register () {
    const {
      index,
      thunder: {
        registerItem
      },
      section: {
        name
      }
    } = this.props

    registerItem(name, {
      index,
      key: this.id,
      onSubmit: (...args) => this.actions.submit(...args)
    })
  }

  registerActions = (actionName, action) => {
    this.actions[actionName] = action
  }

  actions = {
    submit: (...args) => null
  }

  render () {
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

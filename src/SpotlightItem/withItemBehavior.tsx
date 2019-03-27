import * as React from 'react'
import memoize from 'lodash.memoize'

import { pick, omit, mapValues } from '../_internal/data'
import { withSpotlightContext } from '../Spotlight/Spotlight.context'
import { withSpotlightSectionContext } from '../SpotlightSection/SpotlightSection.context'

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
      spotlight: {
        unRegisterItem
      },
      section: {
        name
      }
    } = this.props

    unRegisterItem(name, this.id)
  }

  handleEvent = memoize(actionName => e => {
    const { spotlight, section } = this.props
    return this.props[actionName](e, { spotlight, section })
  })

  wrapActions = () => mapValues(
    pick(this.props, ACTIONS),
    (_, actionName) => this.handleEvent(actionName)
  )

  register () {
    const {
      index,
      spotlight: {
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
    const { spotlight: { selectedItemKey, query } } = this.props
    const selected = this.id === selectedItemKey

    return (
      <WrappedComponent
        {...omit(this.props, ['spotlight', 'section', 'index'])}
        query={query}
        selected={selected}
        registerActions={this.registerActions}
        {...this.wrapActions()}
      />
    )
  }
}

export default Wrapped => withSpotlightSectionContext(withSpotlightContext(withItemBehavior(Wrapped)))

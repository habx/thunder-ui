import * as React from 'react'

import { mapValues } from '../_internal/data'
import SpotlightContext from '../Spotlight/Spotlight.context'
import SpotlightSectionContext from '../SpotlightSection/SpotlightSection.context'

const useWrappedActions = ({
  spotlight,
  section,
  onClick,
  onFocus,
  onBlur,
}) => {
  const spotlightRef = React.useRef(null)
  const sectionRef = React.useRef(null)

  React.useEffect(() => {
    spotlightRef.current = spotlight
    sectionRef.current = section
  })

  return React.useMemo(() => {
    const actions = [onClick, onFocus, onBlur]
    mapValues(actions, (_, actionName) => e =>
      actions[actionName](e, {
        spotlight: spotlightRef.current,
        section: sectionRef.current,
      })
    )
  }, [onBlur, onClick, onFocus])
}

const withItemBehavior = WrappedComponent => {
  const Component: React.StatelessComponent<any> = ({
    index,
    onClick,
    onFocus,
    onBlur,
    ...props
  }) => {
    const id = React.useRef(Math.random())
    const actions = React.useRef({
      submit: (...args) => null,
    })
    const spotlight = React.useContext(SpotlightContext)
    const section = React.useContext(SpotlightSectionContext)

    const registerActions = React.useCallback((actionName, action) => {
      actions.current[actionName] = action
    }, [])

    React.useEffect(() => {
      spotlight.registerItem(section.name, {
        index,
        key: id.current,
        onSubmit: (...args) => actions.current.submit(...args),
      })

      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        spotlight.unRegisterItem(section.name, id.current)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, section.name, spotlight.registerItem, spotlight.unRegisterItem])

    const wrappedActions = useWrappedActions({
      spotlight,
      section,
      onClick,
      onFocus,
      onBlur,
    })

    const selected = id.current === spotlight.selectedItemKey

    return (
      <WrappedComponent
        {...props}
        query={spotlight.query}
        selected={selected}
        registerActions={registerActions}
        {...wrappedActions}
      />
    )
  }

  return Component
}

export default withItemBehavior

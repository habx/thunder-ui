import * as React from 'react'

import { mapValues } from '../_internal/data'
import SpotlightContext from '../Spotlight/Spotlight.context'
import SpotlightSectionContext from '../SpotlightSection/SpotlightSection.context'

export interface ItemInjectedProps {
  query: string
  selected: boolean
  registerActions: (
    actionName: string,
    actionCallback: (e: React.FormEvent<HTMLInputElement>) => void
  ) => void
}

export interface ItemActions {
  onSubmit?: (e: React.UIEvent<HTMLInputElement>) => void
  onBlur?: (e: React.UIEvent<HTMLInputElement>) => void
  onFocus?: (e: React.UIEvent<HTMLInputElement>) => void
  onClick?: (e: React.UIEvent<HTMLInputElement>) => void
}

export interface ItemReceivedProps extends ItemActions {
  index: number
}

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
    const actions = { onClick, onFocus, onBlur }

    return mapValues(actions, (action, actionName) => {
      if (!action) {
        return null
      }

      return e =>
        action(e, {
          spotlight: spotlightRef.current,
          section: sectionRef.current,
        })
    })
  }, [onBlur, onClick, onFocus])
}

const withItemBehavior = <Props extends ItemInjectedProps>(
  WrappedComponent: React.ComponentType<Props>
) => {
  const Component: React.StatelessComponent<
    Pick<Props, Exclude<keyof Props, keyof ItemInjectedProps>> &
      ItemReceivedProps
  > = props => {
    const {
      index,
      onClick,
      onFocus,
      onBlur,
      ...rest
    } = props as ItemReceivedProps

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
        {...rest as Props}
        {...wrappedActions as ItemActions}
        selected={selected}
        registerActions={registerActions}
        query={spotlight.query}
      />
    )
  }

  return Component
}

export default withItemBehavior

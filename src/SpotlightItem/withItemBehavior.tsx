import * as React from 'react'

import { mapValues } from '../_internal/data'
import SpotlightContext from '../Spotlight/Spotlight.context'
import { SpotlightContextProps } from '../Spotlight/Spotlight.interface'
import SpotlightSectionContext from '../SpotlightSection/SpotlightSection.context'
import { SpotlightSectionContextProps } from '../SpotlightSection/SpotlightSection.interface'

import {
  ItemActions,
  ItemReceivedProps,
  ItemInjectedProps,
  WithItemBehaviorProps,
  actionSpotlightState,
} from './SpotlightItem.interface'

const useWrappedActions = ({
  spotlight,
  section,
  onClick = () => {},
  onFocus = () => {},
  onBlur = () => {},
}: {
  spotlight: SpotlightContextProps
  section: SpotlightSectionContextProps
  onClick?: (
    e: React.UIEvent<HTMLInputElement>,
    state: actionSpotlightState
  ) => void
  onFocus?: (
    e: React.UIEvent<HTMLInputElement>,
    state: actionSpotlightState
  ) => void
  onBlur?: (
    e: React.UIEvent<HTMLInputElement>,
    state: actionSpotlightState
  ) => void
}) => {
  const spotlightRef = React.useRef<SpotlightContextProps>()
  const sectionRef = React.useRef<SpotlightSectionContextProps>()

  React.useEffect(() => {
    spotlightRef.current = spotlight
    sectionRef.current = section
  })

  return React.useMemo(() => {
    const actions = { onClick, onFocus, onBlur }

    return mapValues(actions, action => {
      return (e: React.UIEvent<HTMLElement>) =>
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
  const Component: React.FunctionComponent<
    WithItemBehaviorProps<Props>
  > = props => {
    const {
      index,
      onClick = () => {},
      onFocus = () => {},
      onBlur = () => {},
      ...rest
    } = props as ItemReceivedProps

    const id = React.useRef(Math.random())
    const actions = React.useRef<{
      [action: string]: (
        e: React.UIEvent<HTMLInputElement>,
        state: actionSpotlightState
      ) => void
    }>({
      submit: () => {},
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
        onSubmit: (
          e: React.UIEvent<HTMLInputElement>,
          state: actionSpotlightState = {} as actionSpotlightState
        ) => actions.current.submit(e, state),
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
        {...(rest as Props)}
        {...(wrappedActions as ItemActions)}
        selected={selected}
        registerActions={registerActions}
        query={spotlight.query}
      />
    )
  }

  return Component
}

export default withItemBehavior

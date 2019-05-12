import * as React from 'react'

import { isFunction, isBoolean } from '../_internal/data'

import SpotlightProps from './Spotlight.interface'
import { SpotlightModal } from './Spotlight.style'
import SpotlightContent from './SpotlightContent'

const DOUBLE_KEY_PRESS_DURATION = 200

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_QUERY': {
      return { ...state, query: action.value }
    }

    case 'OPEN': {
      return { ...state, isOpened: true }
    }

    case 'CLOSE': {
      return { ...state, isOpened: false, query: '' }
    }

    default: {
      throw new Error(`Thunder Spotlight : Unknown action ${action.type}`)
    }
  }
}

const INITIAL_STATE = {
  query: '',
  isOpened: false,
}

const Spotlight: React.FunctionComponent<SpotlightProps> = ({
  onQueryChange,
  onClose,
  onOpen,
  query: propQuery,
  open: propOpen,
  placeholder,
  data,
  children,
  ...rest
}) => {
  const isQueryControlled = isFunction(onQueryChange)
  const isOpenControlled = isFunction(onClose) || isBoolean(propOpen)

  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE)

  const handleQueryChange = React.useCallback(
    (newQuery: string) => {
      if (isQueryControlled) {
        onQueryChange(newQuery)
      } else {
        dispatch({ type: 'UPDATE_QUERY', value: newQuery })
      }
    },
    [isQueryControlled, onQueryChange]
  )

  const lastOpenKeyPress = React.useRef(0)
  const inputRef = React.useRef(null)

  React.useEffect(() => {
    const handleKeyDown = ({ key }) => {
      if (key === 'Shift') {
        const currentTime = Date.now()
        if (
          currentTime - lastOpenKeyPress.current <
          DOUBLE_KEY_PRESS_DURATION
        ) {
          dispatch({ type: 'OPEN' })
          inputRef.current.focus()

          if (isFunction(onOpen)) {
            onOpen()
          }
        }
        lastOpenKeyPress.current = currentTime
      }

      if (key === 'Escape') {
        dispatch({ type: 'CLOSE' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onOpen])

  const handleClose = React.useCallback(() => {
    if (isOpenControlled) {
      if (isFunction(onClose)) {
        onClose()
      }
    } else {
      dispatch({ type: 'CLOSE' })
    }
  }, [isOpenControlled, onClose])

  const query = isQueryControlled ? propQuery : state.query
  const isOpened = isOpenControlled ? propOpen : state.isOpened

  return (
    <SpotlightModal
      open={isOpened}
      onClose={handleClose}
      animated={false}
      {...rest}
    >
      {({ state }) =>
        state !== 'closed' && (
          <SpotlightContent
            inputRef={inputRef}
            onClose={handleClose}
            onQueryChange={handleQueryChange}
            query={query}
            data={data}
            placeholder={placeholder}
          >
            {children}
          </SpotlightContent>
        )
      }
    </SpotlightModal>
  )
}

export default Spotlight
